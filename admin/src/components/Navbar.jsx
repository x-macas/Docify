import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import {useNavigate} from 'react-router-dom'

const Navbar = () => {
    const { aToken,setAToken } = useContext(AdminContext)
    const navigate=useNavigate()
    const logout=()=>{
        navigate('/')
        aToken && setAToken('')
        aToken && localStorage.removeItem('aToken')
    }
    


    return (
        <div className="flex justify-between items-center p-6 bg-white border-b border-gray-200">
            {/* Left side - Brand name */}
            <h1 className="text-2xl font-bold text-blue-600">Prescripto</h1>
            
            {/* Center - Dashboard View */}
            <div className="text-lg font-medium text-gray-700">
                Dashboard View
            </div>
            
            {/* Right side - Logout button and role indicator */}
            <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500">
                    {aToken ? 'Admin' : 'Doctor'}
                </span>
                <button onClick={logout} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Logout
                </button>
            </div>
        </div>
    )
}

export default Navbar