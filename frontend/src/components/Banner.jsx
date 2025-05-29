import React from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const Banner = () => {
    
  const navigate=useNavigate()
  return (
    

    <div className="flex flex-col md:flex-row items-center justify-between p-6 md:p-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-sm">
      {/* Left Section */}
      <div className="md:w-1/2 mb-6 md:mb-0">
        <div className="space-y-4">
          <p className="text-2xl md:text-3xl font-bold text-gray-800">
            Book Appointment
          </p>
          <p className="text-lg md:text-xl text-gray-600">
            With 100+ trusted Doctors
          </p>
          <button onClick={()=>{navigate('/login');scrollTo(0,0)}} className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors shadow-md">
            Create Account
          </button>
        </div>
      </div>

      {/* Right Section */}
      <div className="md:w-1/2 flex justify-center">
        <img 
          src={assets.appointment_img} 
          alt="Doctor appointment illustration" 
          className="max-w-full h-auto md:max-w-md"
        />
      </div>
    </div>
  );
};

export default Banner;