import React, { useEffect } from 'react'
import Navbar from './components/Navbar.jsx'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home.jsx'
import {Toaster} from 'react-hot-toast'
import Footer from './components/Footer.jsx'
import { useAppContext } from './context/AppContext.jsx'
import Login from './components/Login.jsx'
import AllProducts from './pages/AllProducts.jsx'
import ProductCategory from './pages/ProductCategory.jsx'
import ProductDetails from './pages/ProductDetails.jsx'
import Cart from './pages/Cart.jsx'
import AddAddress from './pages/AddAddress.jsx'
import MyOrders from './pages/MyOrders.jsx'
import SellerLogin from './components/seller/SellerLogin.jsx'
import SellerLayout from './pages/seller/SellerLayout.jsx'
import AddProduct from './pages/seller/AddProduct.jsx'
import ProductList from './pages/seller/ProductList.jsx'
import Orders from './pages/seller/Orders.jsx'
import { Contact } from './components/Contact.jsx'
import Loading from './components/Loading.jsx'

function App() {
  const isSellerPath = useLocation().pathname.includes("seller")
  const { showUserLogin, isSeller,loading, setLoading, axios } = useAppContext();
  //console.log(useLocation());

  // using the axios loading interseptor

  // useEffect(() => {
  //   let requestCount = 0;

  //   const showLoader = () => setLoading(true);
  //   const hideLoader = () => setLoading(false);

  //   const requestInterceptor = axios.interceptors.request.use(
  //     (config) => {
  //       requestCount++;
  //       showLoader();
  //       return config;
  //     },
  //     (error) => {
  //       requestCount = Math.max(requestCount - 1, 0);
  //       if (requestCount === 0) hideLoader();
  //       return Promise.reject(error);
  //     }
  //   );

  //   const responseInterceptor = axios.interceptors.response.use(
  //     (response) => {
  //       requestCount = Math.max(requestCount - 1, 0);
  //       if (requestCount === 0) hideLoader();
  //       return response;
  //     },
  //     (error) => {
  //       requestCount = Math.max(requestCount - 1, 0);
  //       if (requestCount === 0) hideLoader();
  //       return Promise.reject(error);
  //     }
  //   );

  //   // Cleanup interceptors on unmount
  //   return () => {
  //     axios.interceptors.request.eject(requestInterceptor);
  //     axios.interceptors.response.eject(responseInterceptor);
  //   };
  // }, [setLoading]);


  useEffect(() => {
    let requestCount = 0;
    let loaderTimer = null;
    let loaderShownAt = null;

    const showLoader = () => {
      loaderShownAt = Date.now();
      setLoading(true);
    };

    const hideLoader = () => {
      const elapsed = Date.now() - loaderShownAt;
      const minDisplayTime = 500; // ms

      if (elapsed < minDisplayTime) {
        // Delay hiding if loader was too quick
        loaderTimer = setTimeout(() => {
          setLoading(false);
        }, minDisplayTime - elapsed);
      } else {
        setLoading(false);
      }
    };

    const requestInterceptor = axios.interceptors.request.use(
      (config) => {
        if (requestCount === 0) showLoader();
        requestCount++;
        return config;
      },
      (error) => {
        requestCount = Math.max(requestCount - 1, 0);
        if (requestCount === 0) hideLoader();
        return Promise.reject(error);
      }
    );

    const responseInterceptor = axios.interceptors.response.use(
      (response) => {
        requestCount = Math.max(requestCount - 1, 0);
        if (requestCount === 0) hideLoader();
        return response;
      },
      (error) => {
        requestCount = Math.max(requestCount - 1, 0);
        if (requestCount === 0) hideLoader();
        return Promise.reject(error);
      }
    );

    return () => {
      clearTimeout(loaderTimer);
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, [setLoading]);



  return (
    
    <div className='text-default min-h-screen text-gray-700 bg-white'>
      {isSellerPath ? null : <Navbar/>}
      {showUserLogin ? <Login/> : null}
      {loading ? <Loading/> : null}

      <Toaster />
      <div className= {`${isSellerPath ? "" : "px-6 md:px-16 lg:px-24 xl:px32"}`}>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/contact' element={<Contact />}/>
          <Route path='/products' element={<AllProducts />}/>
          <Route path='/products/:category' element={<ProductCategory />}/>
          <Route path='/products/:category/:id' element={<ProductDetails />}/>
          <Route path='/cart' element={<Cart />}/>
          <Route path='/add-address' element={<AddAddress />}/>
          <Route path='/my-orders' element={<MyOrders />}/>
          <Route path='/loading' element={<Loading />}/>

          <Route path='/seller' element={isSeller ? <SellerLayout/> : <SellerLogin/>}> 
            <Route  index element={isSeller ? <AddProduct/> : null}/>
            <Route  path='product-list' element={<ProductList />}/>
            <Route  path='orders' element={<Orders />}/>
          </Route>
        </Routes>
      </div>

      { !isSellerPath &&<Footer />}
    </div>
  )
}

export default App