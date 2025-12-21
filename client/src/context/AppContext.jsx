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
    const [loading, setLoading] = useState(false)
    

    // fetch seller status
    const fetchSeller = async ()=>{
        try {
            const {data} = await axios.get('/api/seller/is-auth',{ withCredentials: true })
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
            const {data} = await axios.get('/api/product/list',) 
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
        setCartItems(prev => ({
            ...prev,
            [itemId]: (prev[itemId] || 0) + 1
        }));
        toast.success("Added To Cart");
    }

    // update cart item quantity

    const updateCartItem = (itemId, quantity) =>{
        if (quantity <= 0) return;

        setCartItems(prev => ({
            ...prev,
        [itemId]: quantity
        }));
        toast.success("Cart Updated");

    }

    // remove product form the cart

    const removeFromCart = (itemId) =>{
        setCartItems(prev => {
            const copy = { ...prev };

            if (!copy[itemId]) return prev;

            if (copy[itemId] === 1) {
                delete copy[itemId];
            } else {
                copy[itemId] -= 1;
            }

            return copy;
  });

  toast.success("Removed From Cart");
    }

    // cart item count
    const getCartCount = ()=> {
        return Object.values(cartItems)
            .reduce((total, qty) => total + qty, 0);
    };


    // get cart total ammount
    const getCartAmmount = () => {
    let totalAmount = 0;

    for (const itemId in cartItems) {
        const product = products.find(p => p._id === itemId);

        if (!product) continue;

        totalAmount += product.offerPrice * cartItems[itemId];
    }

    return Number(totalAmount.toFixed(2));
};


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