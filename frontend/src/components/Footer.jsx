import React from 'react';
import { assets } from '../assets/assets'; // Make sure this import path is correct

const Footer = () => {
  return (
    <div className="bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Section - Logo and Description */}
          <div className="space-y-4">
            <img 
              src={assets.logo} 
              alt="Prescripto Logo" 
              className="h-10 w-auto"
            />
            <p className="text-gray-600 text-sm">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
              Lorem Ipsum has been the industry's standard dummy text.
            </p>
          </div>

          {/* Center Section - Company Links */}
          <div className="space-y-4">
            <p className="font-semibold text-gray-900">COMPANY</p>
            <ul className="space-y-2 text-sm">
              <li className="text-gray-600 hover:text-gray-900 cursor-pointer">Home</li>
              <li className="text-gray-600 hover:text-gray-900 cursor-pointer">About us</li>
              <li className="text-gray-600 hover:text-gray-900 cursor-pointer">Contact Us</li>
              <li className="text-gray-600 hover:text-gray-900 cursor-pointer">Privacy policy</li>
            </ul>
          </div>

          {/* Right Section - Contact Info */}
          <div className="space-y-4">
            <p className="font-semibold text-gray-900">GET IN TOUCH</p>
            <ul className="space-y-2 text-sm">
              <li className="text-gray-600">+91-7240645988</li>
              <li className="text-gray-600">vksharma11235@gmail.com</li>
            </ul>
          </div>
        </div>

        {/* Copyright Section */}
        <hr className="my-6 border-gray-200" />
        <p className="text-center text-gray-500 text-sm">
          Copyright 2025 © Prescripto - All rights reserved
        </p>
      </div>
    </div>
  )
}

export default Footer;
