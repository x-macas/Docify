import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

const DoctorAppointment = () => {
  const { calculateAge, currency } = useContext(AppContext);
  const {
    dToken,
    appointments,
    getAppointments,
    completeAppointment,
    cancelAppointment,
  } = useContext(DoctorContext);

  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-center">All Appointments</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-blue-600 text-white text-left">
              <th className="py-3 px-4">#</th>
              <th className="py-3 px-4">Patient</th>
              <th className="py-3 px-4">Age</th>
              <th className="py-3 px-4">Payment</th>
              <th className="py-3 px-4">Date & Time</th>
              <th className="py-3 px-4">Fees</th>
              <th className="py-3 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length > 0 ? (
              appointments.map((item, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{index + 1}</td>

                  {/* Patient Info */}
                  <td className="py-3 px-4 flex items-center gap-2">
                    <img
                      src={item.userData.image}
                      alt="patient"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <span>{item.userData.name}</span>
                  </td>

                  {/* Age */}
                  <td className="py-3 px-4">
                    {calculateAge(item.userData.dob)}
                  </td>

                  {/* Payment Method */}
                  <td className="py-3 px-4">
                    {item.payment ? "Online" : "Cash"}
                  </td>

                  {/* Date & Time */}
                  <td className="py-3 px-4">
                    {item.slotDate}, {item.slotTime}
                  </td>

                  {/* Fees */}
                  <td className="py-3 px-4">
                    {currency}
                    {item.amount}
                  </td>
                  {item.cancelled ? (
                    <td className="py-3 px-4 text-red-500 font-semibold">
                      Cancelled
                    </td>
                  ) : item.isCompleted ? (
                    <td className="py-3 px-4 text-green-600 font-semibold">
                      Completed
                    </td>
                  ) : (
                    <td className="py-3 px-4 flex items-center gap-3">
                      <img
                        onClick={() => cancelAppointment(item._id)}
                        src={assets.cancel_icon}
                        alt="Cancel"
                        className="w-6 h-6 cursor-pointer hover:scale-110 transition"
                      />
                      <img
                        onClick={() => completeAppointment(item._id)}
                        src={assets.tick_icon}
                        alt="Approve"
                        className="w-6 h-6 cursor-pointer hover:scale-110 transition"
                      />
                    </td>
                  )}

                  {/* Actions */}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="py-6 text-center text-gray-500">
                  No appointments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DoctorAppointment;
