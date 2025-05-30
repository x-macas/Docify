import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';

const AllAppointments = () => {
  const { getAllAppointments, aToken, appointments } = useContext(AdminContext);
  const { calculateAge, currency } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">All Appointments</h1>
      
      <div className="overflow-x-auto">
        {/* Table Header */}
        <div className="grid grid-cols-7 gap-4 bg-gray-100 p-3 rounded-t-lg font-medium">
          <p className="text-center">#</p>
          <p className="text-center">Patient</p>
          <p className="text-center">Age</p>
          <p className="text-center">Doctor</p>
          <p className="text-center">Date & Time</p>
          <p className="text-center">Fees</p>
          <p className="text-center">Action</p>
        </div>

        {/* Table Rows */}
        {appointments.map((item, index) => {
          // Safely access nested properties
          const userData = item.userData || {};
          const docData = item.docData || {};
          
          return (
            <div 
              key={item._id || index} 
              className="grid grid-cols-7 gap-4 items-center p-3 border-b hover:bg-gray-50"
            >
              <p className="text-center">{index + 1}</p>
              
              {/* Patient */}
              <div className="flex items-center gap-2">
                {userData.image && (
                  <img 
                    src={userData.image} 
                    alt="Patient" 
                    className="w-8 h-8 rounded-full object-cover"
                  />
                )}
                <p>{userData.name || 'N/A'}</p>
              </div>
              
              {/* Age */}
              <p className="text-center">
                {userData.dob ? calculateAge(userData.dob) : 'N/A'}
              </p>
              
              {/* Doctor */}
              <div className="flex items-center gap-2">
                {docData.image && (
                  <img 
                    src={docData.image} 
                    alt="Doctor" 
                    className="w-8 h-8 rounded-full object-cover"
                  />
                )}
                <p>{docData.name || 'N/A'}</p>
              </div>
              
              {/* Date & Time */}
              <p className="text-center">
                {item.slotDate || 'N/A'}, {item.slotTime || 'N/A'}
              </p>
              
              {/* Fees */}
              <p className="text-center">
                {item.amount ? `${currency}${item.amount}` : 'N/A'}
              </p>
              
              {/* Action */}
              <div className="flex justify-center">
                {item.cancelled ? (
                  <span className="text-red-500">Cancelled</span>
                ) : (
                  <button className="hover:opacity-80">
                    <img 
                      src={assets.cancel_icon} 
                      alt="Cancel" 
                      className="w-8 h-8"
                    />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllAppointments;