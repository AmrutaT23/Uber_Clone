import React from 'react'
import { Link } from 'react-router-dom';

const Riding = () => {
  return (
    <div className='h-screen'>
        <Link  to='/home' className='fixed  right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full'>
            <i className=" text-lg font-medium ri-home-3-line"></i>
        </Link>
      <div className='h-1/2'>
        <img
            className="h-full w-full object-cover z-0"
            src='https://www.medianama.com/wp-content/uploads/2018/06/Screenshot_20180619-112715.png.png'
            alt="Background"
          />
      </div>
      <div className='h-1/2 p-4'>
      <div className='flex items-center justify-between'>
        <img className='h-12' src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg" alt="" />
        <div className='text-right'>
          <h2 className='text-lg font-medium capitalize'>Hrishikesh</h2>
          <h4 className='text-xl font-semibold -mt-1 -mb-1'>MP04 AB 1234</h4>
          <p className='text-sm text-gray-600'>Maruti Suzuki Alto</p>
          {/* <h1 className='text-lg font-semibold'>  {props.ride?.otp} </h1> */}
        </div>
      </div>
      
      <div className="flex gap-2 justify-between flex-col items-center">
        <div className="w-full mt-5">
          
          <div className="flex items-center gap-5 p-3 border-gray-300 border-b-2">
            <i className="text-lg ri-map-pin-fill"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">
                Wadgoan Road,Yavatmal
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 ">
            <i className="text-lg ri-currency-fill"></i>
            <div>
              <h3 className="text-lg font-medium">193.20</h3>
              <p className="text-sm -mt-1 text-gray-600">Cash Cash</p>
            </div>
          </div>
        </div>
        
      </div>
        <button className='w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg'>Make a Payment</button>

      </div>
    </div>
  )
}

export default Riding
