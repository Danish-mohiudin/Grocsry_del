import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";

const AppContext = createContext();

export const AppContextProvider = ({children}) =>{

    const currency = import.meta.VITE_CURRENCY;

    const navigate = useNavigate();
    const [user, setUser] = useState(null)
    const [isSeller, setIsSeller] = useState(false)
    const [showUserLogin, setShowUserLogin] = useState(false)
    const [products, setProducts] = useState([])
    const [cartItems, setCartItems] = useState({})
    const [searchQuery, setSearchQuery] = useState({})

    // fetch all products
    const fetchProducts = async () =>{
        setProducts(dummyProducts)
    }

    // add product to cart
    const addToCart = (itemId) =>{
        let cartData = structuredClone(cartItems) // create a deep copy of the object 

        if(cartData[itemId]){
            cartData[itemId] += 1;
        } else {
            cartData[itemId] = 1;
        }
        setCartItems(cartData);
        toast.success("Added To Cart")
    }

    // update cart itme quantity

    const updateCartItem = (itemId, quantity) =>{
        let cartData = structuredClone(cartItems);
        cartData[itemId] = quantity
        setCartItems(cartData)
        toast.success("Cart Updated")

    }

    // remove product form the cart

    const removeFromCart = (itemId) =>{
        let cartData = structuredClone(cartItems);
        if(cartData[itemId]){
            cartData[itemId] -= 1;
            if(cartData[itemId] === 0){
                delete cartData[itemId];
            }
        }
        toast.success("Removed Form The Cart")
        setCartItems(cartData)
    }


    useEffect(()=>{
        fetchProducts()
    },[])
    


    const value = {navigate, user,setUser,setIsSeller, isSeller, showUserLogin, 
        setShowUserLogin, products, currency, addToCart, updateCartItem, removeFromCart,
        cartItems, setCartItems ,searchQuery, setSearchQuery
    }

    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}

export const useAppContext = () => useContext(AppContext)