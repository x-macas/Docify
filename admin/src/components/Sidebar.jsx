import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const Sidebar = () => {
    const { aToken } = useContext(AdminContext)
    //console.log('aToken value:', aToken)
    return (
        <div className="w-64 min-h-screen bg-white shadow-md">
            {aToken && (
                <ul className="p-4 space-y-2">
                    <li>
                        <NavLink 
                            to={'/admin-dashboard'}
                            className={({ isActive }) => 
                                `flex items-center p-3 rounded-lg transition-colors ${isActive ? 'bg-blue-100 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`
                            }
                        >
                            <img src={assets.home_icon} alt="" className="w-5 h-5 mr-3" />
                            <p className="font-medium">Dashboard</p>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to={'/all-appointments'}
                            className={({ isActive }) => 
                                `flex items-center p-3 rounded-lg transition-colors ${isActive ? 'bg-blue-100 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`
                            }
                        >
                            <img src={assets.appointment_icon} alt="" className="w-5 h-5 mr-3" />
                            <p className="font-medium">Appointments</p>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to={'/add-doctor'}
                            className={({ isActive }) => 
                                `flex items-center p-3 rounded-lg transition-colors ${isActive ? 'bg-blue-100 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`
                            }
                        >
                            <img src={assets.add_icon} alt="" className="w-5 h-5 mr-3" />
                            <p className="font-medium">Add Doctor</p>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to={'/doctor-list'}
                            className={({ isActive }) => 
                                `flex items-center p-3 rounded-lg transition-colors ${isActive ? 'bg-blue-100 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`
                            }
                        >
                            <img src={assets.people_icon} alt="" className="w-5 h-5 mr-3" />
                            <p className="font-medium">Doctors List</p>
                        </NavLink>
                    </li>
                </ul>
            )}
        </div>
    )
}

export default Sidebar