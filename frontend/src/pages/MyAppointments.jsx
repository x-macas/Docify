import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { toast } from "react-toastify";

const MyAppointments = () => {
  const { backendUrl, token } = useContext(AppContext);

  const [appointments, setAppointments] = useState([]);

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { token } });

      if (data.success) {
        setAppointments(data.appointments.reverse());
        console.log(data.appointments);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <p className="text-2xl font-semibold mb-6">My Appointments</p>
      <div className="grid gap-6">
       {appointments.map((item, index) => {
  return (
    <div key={index} className="p-4 border rounded shadow-md flex items-center gap-6">
      {/* Doctor's Image */}
      {item.docData && (
        <img 
          src={item.docData.image} 
          alt={item.docData.name || "Doctor"} 
          className="w-24 h-24 object-cover rounded" 
        />
      )}
      
      <div className="flex-grow">
        <p className="text-lg font-medium">
          {item.docData?.name || "Unknown Doctor"}
        </p>
        <p className="text-gray-600">
          {item.docData?.speciality || "Speciality not available"}
        </p>
        
        {/* Address */}
        {item.docData?.address ? (
          <div className="mt-2">
            <p className="text-sm">{item.docData.address.line1}</p>
            {item.docData.address.line2 && (
              <p className="text-sm">{item.docData.address.line2}</p>
            )}
          </div>
        ) : (
          <p className="text-sm mt-2">Address not available</p>
        )}
        
        {/* Appointment details */}
        <p className="text-sm mt-2 text-blue-600">
          <span className="font-semibold">When:</span> {item.slotDate} | {item.slotTime}
        </p>
        <p className="text-sm mt-1">
          <span className="font-semibold">Fee:</span> ₹{item.amount}
        </p>
      </div>
      
      {/* Action buttons */}
      <div className="flex flex-col gap-2">
        {!item.payment && (
          <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
            Pay ₹{item.amount}
          </button>
        )}
        <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
          {item.cancelled ? "Cancelled" : "Cancel"}
        </button>
      </div>
    </div>
  );
})}
      </div>
    </div>
  );
};


export default MyAppointments;
