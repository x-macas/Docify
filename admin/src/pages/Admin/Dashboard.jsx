import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { assets } from '../../assets/assets';

const Dashboard = () => {
  const { aToken, getDashData, dashData } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken, getDashData]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Doctors Card */}
        <div className="bg-white rounded-lg shadow p-6 flex items-center">
          <div className="bg-blue-100 p-4 rounded-full mr-4">
            <img src={assets.doctor_icon} alt="Doctors" className="w-8 h-8" />
          </div>
          <div>
            <p className="text-3xl font-bold text-gray-800">{dashData?.doctors || 0}</p>
            <p className="text-gray-600">Doctors</p>
          </div>
        </div>

        {/* Appointments Card */}
        <div className="bg-white rounded-lg shadow p-6 flex items-center">
          <div className="bg-green-100 p-4 rounded-full mr-4">
            <img src={assets.appointment_icon} alt="Appointments" className="w-8 h-8" />
          </div>
          <div>
            <p className="text-3xl font-bold text-gray-800">{dashData?.appointments || 0}</p>
            <p className="text-gray-600">Appointments</p>
          </div>
        </div>

        {/* Patients Card */}
        <div className="bg-white rounded-lg shadow p-6 flex items-center">
          <div className="bg-purple-100 p-4 rounded-full mr-4">
            <img src={assets.patients_icon} alt="Patients" className="w-8 h-8" />
          </div>
          <div>
            <p className="text-3xl font-bold text-gray-800">{dashData?.patients || 0}</p>
            <p className="text-gray-600">Patients</p>
          </div>
        </div>
      </div>

      {/* Latest Appointments Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Appointments</h2>
        
        {dashData?.latestappointments?.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {dashData.latestappointments.map((appointment) => (
                  <tr key={appointment._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img 
                            className="h-10 w-10 rounded-full" 
                            src={appointment.userData?.image || assets.default_user} 
                            alt="Patient" 
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {appointment.userData?.name || 'N/A'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{appointment.docData?.name || 'N/A'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{appointment.slotDate || 'N/A'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{appointment.slotTime || 'N/A'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        appointment.cancelled 
                          ? 'bg-red-100 text-red-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {appointment.cancelled ? 'Cancelled' : 'Active'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No recent appointments found
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;