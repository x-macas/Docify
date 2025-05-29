import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
  return (
    <div className='flex flex-col items-center gap-4 py-16 text-gray-800' id='speciality'>
      <h1 className='text-3xl font-medium'>Find by Speciality</h1>
      <p className='sm:w-1/3 text-center text-sm'>Simply browse through our list of trusted doctors and schedule your appointment</p>
      <div className='flex sm:justify-center gap-4 pt-5 w-full overflow-scroll px-4'>
        {specialityData.map((item, index) => (
          <Link onClick={()=>{scrollTo(0,0)}}
            className='flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:-translate-y-2 transition-all duration-300 ease-in-out' 
            key={index} 
            to={`/doctors/${item.speciality}`}
          >
            <div className='w-16 h-16 sm:w-24 sm:h-24 mb-2 rounded-full overflow-hidden flex items-center justify-center bg-gray-100'>
              <img className='w-full h-full object-cover' src={item.image} alt={item.speciality} />
            </div>
            <p className='text-center'>{item.speciality}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default SpecialityMenu