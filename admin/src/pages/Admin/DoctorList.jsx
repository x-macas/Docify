import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';

const DoctorList = () => {
  const { doctors, aToken, getAllDoctors, changeAvailability} = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken, getAllDoctors]);

  return (
    <div className='m-5 max-h-[90vh] overflow-y-scroll'>
      <h1 className='text-lg font-medium'>All Doctors</h1>
      <div className='w-full flex flex-wrap gap-4 pt-5 gap-y-6'>
        {doctors.map((item, index) => ( 
          <div 
            key={index} 
            className='border border-indigo-200 rounded-xl max-w-56 overflow-hidden
                       transition-colors duration-200 ease-in-out
                       hover:bg-blue-50 hover:border-blue-300 cursor-pointer'
          >
            <img 
              className='w-full h-40 object-cover' 
              src={item.image} 
              alt={item.name} 
            />
            <div className='p-3'>
              <p className='font-medium'>{item.name}</p>
              <p className='text-sm text-gray-600'>{item.speciality}</p>
              <div className='flex items-center mt-2'>
                <input onChange={()=>{
                  changeAvailability(item._id)
                }}
                  type="checkbox" 
                  checked={item.available} 
                  readOnly
                  className='mr-2'
                />
                <p className='text-sm'>{item.available ? 'Available' : 'Not Available'}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorList;