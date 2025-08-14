// import React, { useEffect } from 'react'
// import { useAppContext } from '../context/AppContext'
// import { useLocation } from 'react-router-dom'

import { useAppContext } from "../context/AppContext";

// const Loading = () => {

//     const {navigate}  = useAppContext()
//     let { search }  = useLocation()
//     const query = new URLSearchParams(search)
//     //const nextUrl = query.get('next')
//     const nextUrl = query.get('next') || 'my-orders'

//     useEffect(()=>{
//         if(nextUrl){
//             setTimeout(()=>{
//                 navigate(`/${nextUrl}`)
//             },1000)
//         }
//     },[nextUrl])

//   return (
//     <div className='flex justify-center items-center h-screen'>
//         <div className='animate-spin rounded-full h-24 w-24 border-4 border-gray-300
//         border-t-primary'></div>
//     </div>
//   )
// }

// export default Loading


// Loading.jsx


const Loading = () => {
    const { loading, setLoading} = useAppContext();
    if (!loading) return null;

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[9999] transition-opacity duration-300">
      <div className="flex flex-col items-center space-y-4">
        {/* Spinner */}
        <div className="w-14 h-14 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
        
        {/* Text */}
        <p className="text-white text-lg font-medium animate-pulse">
          Please wait...
        </p>
      </div>
    </div>
    );
}
export default Loading;