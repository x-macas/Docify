import React, { useContext, useState, useRef, useEffect } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { token, setToken, userData } = useContext(AppContext);
  const [showMenu, setShowMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const profileRef = useRef(null);

  const logout = () => {
    setToken(false);
    localStorage.removeItem('token');
    setShowDropdown(false);
    navigate('/');
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
          profileRef.current && !profileRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-gray-300 px-6 shadow-sm bg-white sticky top-0 z-50">
      <img onClick={() => { navigate('/') }} className="w-44 cursor-pointer" src={assets.logo} alt="Logo" />

      <ul className="hidden md:flex items-center gap-6 font-medium text-gray-700">
        <li className="py-1 hover:text-primary transition">
          <NavLink to="/" className={({ isActive }) => isActive ? "text-primary font-semibold" : ""}>HOME</NavLink>
        </li>
        <li className="py-1 hover:text-primary transition">
          <NavLink to="/doctors" className={({ isActive }) => isActive ? "text-primary font-semibold" : ""}>ALL DOCTORS</NavLink>
        </li>
        <li className="py-1 hover:text-primary transition">
          <NavLink to="/about" className={({ isActive }) => isActive ? "text-primary font-semibold" : ""}>ABOUT</NavLink>
        </li>
        <li className="py-1 hover:text-primary transition">
          <NavLink to="/contact" className={({ isActive }) => isActive ? "text-primary font-semibold" : ""}>CONTACT</NavLink>
        </li>
      </ul>

      <div className="flex items-center gap-4 relative">
        {token && userData? (
          <div className="relative">
            <div 
              ref={profileRef}
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setShowDropdown(!showDropdown)}
              onMouseEnter={() => setShowDropdown(true)}
            >
              <img className='w-8 h-8 rounded-full object-cover' src={userData.image} alt="Profile" />
              <img className='w-2.5' src={assets.dropdown_icon} alt="Dropdown" />
            </div>

            {showDropdown && (
              <div 
                ref={dropdownRef}
                className='absolute top-12 right-0 text-base font-medium text-gray-500 z-10'
                onMouseEnter={() => setShowDropdown(true)}
                onMouseLeave={() => setShowDropdown(false)}
              >
                <div className='min-w-48 bg-white shadow-lg rounded-lg flex flex-col gap-3 p-4'>
                  <p 
                    onClick={() => { 
                      navigate('my-profile'); 
                      setShowDropdown(false);
                    }} 
                    className='hover:text-black cursor-pointer transition'
                  >
                    My Profile
                  </p>
                  <p 
                    onClick={() => { 
                      navigate('/my-appointments'); 
                      setShowDropdown(false);
                    }} 
                    className='hover:text-black cursor-pointer transition'
                  >
                    My Appointments
                  </p>
                  <p 
                    onClick={logout} 
                    className='hover:text-red-500 cursor-pointer transition'
                  >
                    Logout
                  </p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => { navigate("/login"); }}
            className="bg-primary text-white px-6 py-2 rounded-full font-light hidden md:block hover:bg-primary-dark transition"
          >
            Create account
          </button>
        )}
        <img 
          onClick={() => { setShowMenu(true) }} 
          className="w-6 md:hidden cursor-pointer" 
          src={assets.menu_icon} 
          alt="Menu" 
        />

        {/* Mobile menu */}
        {showMenu && (
          <div className="fixed inset-0 bg-black bg-opacity-40 z-40 flex justify-end">
            <div className="w-64 bg-white h-full shadow-lg p-6 flex flex-col gap-6 relative">
              <div className="flex justify-between items-center mb-4">
                <img className="w-36" src={assets.logo} alt="Logo" />
                <img 
                  onClick={() => { setShowMenu(false) }} 
                  className="w-5 cursor-pointer" 
                  src={assets.cross_icon} 
                  alt="Close" 
                />
              </div>
              <ul className="flex flex-col gap-4 text-gray-700 font-medium">
                <NavLink onClick={() => { setShowMenu(false) }} to="/" className="hover:text-primary">HOME</NavLink>
                <NavLink onClick={() => { setShowMenu(false) }} to="/doctors" className="hover:text-primary">ALL DOCTORS</NavLink>
                <NavLink onClick={() => { setShowMenu(false) }} to="/about" className="hover:text-primary">ABOUT</NavLink>
                <NavLink onClick={() => { setShowMenu(false) }} to="/contact" className="hover:text-primary">CONTACT</NavLink>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;