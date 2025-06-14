import React from 'react'

const LocationSearchPanel = (props) => {
  console.log(props)
  // sampl array for locations
  const locations = [
    "21201-A/4, GH Patil Path, Shivajinagar, Pune, Maharashtra 411004",
    "Galaxy Garden, N Main Rd, Koregaon Park, Pune, Maharashtra 411001",
    "Ashok Path, Shanti Sheela Society, Apex Colony, Erandwane, Pune, Maharashtra 411004",
  ]
  return (
    <div>
      {
        locations.map(function(elem,idx){
          return <div key={idx} onClick={()=>{
            props.setVehiclaPanel(true)
            props.setPanelOpen(false)
          }} className='flex gap-4 border-2 p-3 border-gray-200 active:border-black rounded-xl  items-center my-2 justify-start'>
        <h2 className='bg-[#eee] h-8 w-12 flex items-center justify-center rounded-full'><i className="ri-map-pin-2-fill "></i></h2>
        <h4 className='font-medium'>{elem}</h4>
      </div>
        })
      }
      
     
      
    </div>
  )
}

export default LocationSearchPanel
