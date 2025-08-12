import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";
//import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";
import axios from "axios";

axios.defaults.withCredentials = true; // it will send cookies also with the api requests
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

const AppContext = createContext();

export const AppContextProvider = ({children}) =>{

    const currency = import.meta.env.VITE_CURRENCY;

    const navigate = useNavigate();
    const [user, setUser] = useState(null)
    const [open, setOpen] = useState(false)
    const [isSeller, setIsSeller] = useState(false)
    const [showUserLogin, setShowUserLogin] = useState(false)
    const [products, setProducts] = useState([])
    const [cartItems, setCartItems] = useState({})
    const [searchQuery, setSearchQuery] = useState({})
    

    // fetch seller status
    const fetchSeller = async ()=>{
        try {
            const {data} = await axios.get('/api/seller/is-auth')
            if(data.success){
                setIsSeller(true)
            } else {
                setIsSeller(false)
            }
        } catch (error) {
            setIsSeller(false)
        }
    }

    // fetch user auth status, user data and cart items 
    const fetchUser = async()=>{
        try {
            const {data} = await axios.get('/api/user/is-auth')
            if(data.success){
                setUser(data.user)
                setCartItems(data.user.cartItems)
            }
        } catch (error) {
            setUser(null)
            
        }
    }

    // fetch all products
    const fetchProducts = async () =>{
        try {
            const {data} = await axios.get('/api/product/list') 
            if(data.success){
                setProducts(data.products)
            }else
                toast.error(data.message)
        } catch (error) {
             toast.error(error.message)
        }
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

    // update cart item quantity

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

    // cart item count
    const getCartCount = ()=>{
        let totalCount = 0;
        for(const item in cartItems){
            totalCount += cartItems[item];
        }
        return totalCount;
    }

    // get cart total ammount
    const getCartAmmount = () =>{
        let totoalAmmount = 0;
        for(const items in cartItems){
            let itemInfo = products.find((product)=> product._id === items);
            if(cartItems[items] > 0){
                totoalAmmount += itemInfo.offerPrice * cartItems[items]
            }
        }
        return Math.floor(totoalAmmount * 100) / 100;
    }


    useEffect(()=>{
        fetchSeller()
        fetchProducts()
        fetchUser()
    },[])



    useEffect(() => {
    // Don't run unless user is available
    if (!user) {
        console.log(" Skipping updateCart — user is null");
        return;
    }

    if (cartItems.length === 0) {
        console.log(" Skipping updateCart — cart is empty");
        return;
    }

    const updateCart = async () => {
        try {
            const { data } = await axios.post('/api/cart/update', {
                cartItems,
                userId: user._id
            });

            if (!data.success) {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    updateCart();
}, [cartItems, user]);
    


    const value = {navigate, user,setUser,setIsSeller, isSeller, showUserLogin, 
        setShowUserLogin, products, currency, addToCart, updateCartItem, removeFromCart,
        cartItems, setCartItems ,searchQuery, setSearchQuery , getCartCount, getCartAmmount, 
        open, setOpen, axios, fetchProducts, loading, setLoading
    }

    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}

//export const useAppContext = () => useContext(AppContext);

function useAppContext() {
  return useContext(AppContext);
}
export { useAppContext };