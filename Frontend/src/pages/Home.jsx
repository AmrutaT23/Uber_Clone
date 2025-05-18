import React from 'react'
import {Link} from 'react-router-dom'
const Home = () => {
  return (
    <div>
      <div className='bg-cover bg-[url("E:\MERN\Uber_Clone\Frontend\src\assets\11.png")] h-screen pt-8  flex  justify-between flex-col w-full bg-red-400'>
        <img className='w-16 ml-8' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
        <div className='bg-white pb-7 py-4 px-4 '>
            <h2 className='text-3xl font-bold'>Get Started With Uber</h2>
            <Link to='/login' className='flex item-center justify-center  bg-black text-white py-3 rounded mt-5'>Continue</Link>
        </div>
      </div>
    </div>
  )
}

export default Home
