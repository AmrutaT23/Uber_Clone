import React, { useState,useRef}from 'react'
import {useGSAP} from '@gsap/react';
import gsap from 'gsap';
import { Link } from 'react-router-dom';
import CaptainDetails from '../components/CaptainDetails';
import RidePopUp from '../components/RidePopUp';
import ConfirmRidePopUp from '../components/ConfirmRidePopUp';


const captainHome = () => {

const [ridePopupPanel, setRidePopupPanel] =useState(true);
const [confirmRidePopPanel, setConfirmRidePopPanel] =useState(false);

const ridePopupPanelRef = useRef(null);
const confirmRidePopPanelRef = useRef(null);


  useGSAP(function () {
      if(ridePopupPanel) {
        gsap.to(ridePopupPanelRef.current, {
        transform:'translateY(0)',
      })
    }else{
      gsap.to(ridePopupPanelRef.current, {
        transform:'translateY(100%)',
      })
    }
    }, [ ridePopupPanel ])

    useGSAP(function () {
      if(confirmRidePopPanel) {
        gsap.to(confirmRidePopPanelRef.current, {
        transform:'translateY(0)',
      })
    }else{
      gsap.to(confirmRidePopPanelRef.current, {
        transform:'translateY(100%)',
      })
    }
    }, [ confirmRidePopPanel ])

    

  return (
    <div className='h-screen'>
        <div className='fixed p-6 top-0 flex items-center justify-between w-screen'>
          <img className='w-16' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
          <Link  to='/home' className=' h-10 w-10 bg-white flex items-center justify-center rounded-full'>
            <i className="text-lg font-medium ri-logout-box-r-line"></i>
          </Link>
        </div>
      <div className='h-3/5'>
        <img
            className="h-full w-full object-cover "
            src='https://i.pinimg.com/736x/03/1b/27/031b2773d84c836635756d6f6d6e238b.jpg'
            alt="Background"
          />
      </div>
      <div className='h-2/5 p-6'>
        <CaptainDetails/>
      </div>
      <div ref={ridePopupPanelRef}  className="fixed w-full z-10  bottom-0  translate-y-full  bg-white px-3 py-10 pt-12">
         <RidePopUp setRidePopupPanel={setRidePopupPanel} setConfirmRidePopPanel={setConfirmRidePopPanel}/>
      </div>
      <div ref={confirmRidePopPanelRef}  className="fixed w-full h-screen z-10  bottom-0  translate-y-full  bg-white px-3 py-10 pt-12">
         <ConfirmRidePopUp setConfirmRidePopPanel={setConfirmRidePopPanel} setRidePopupPanel={setRidePopupPanel}/>
      </div>
    </div>
  )
}

export default captainHome
