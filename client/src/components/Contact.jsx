import React from 'react'
import {NavLink} from 'react-router-dom'

export const Contact = () => {
  return (
    <div className='text-2xl h-screen flex flex-col items-center justify-center '>
        <h1>The Contact Page</h1>
        <div className='bg-red-800 p-4'>Note: The contact Page is yet to be compleated........................</div>
        <NavLink to={'/'}>Go to HOME</NavLink>
    </div>
  )
}
