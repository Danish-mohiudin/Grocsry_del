import React from 'react'
import {NavLink} from 'react-router-dom'

export const Contact = () => {
  return (
    <div className='text-2xl h-screen flex flex-col items-center justify-center '>
        <div>The Contact Page</div>
        <NavLink to={'/'}>Home</NavLink>
    </div>
  )
}
