import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Contact Header */}
      <div className="text-center mb-12">
        <p className="text-4xl font-bold text-gray-800">
          CONTACT <span className="text-blue-600">US</span>
        </p>
        <div className="w-20 h-1 bg-blue-600 mx-auto mt-4"></div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-center">
        {/* Contact Image - Now on the left */}
        <div className="w-full lg:w-1/2 order-1 lg:order-none">
          <img 
            src={assets.contact_image} 
            alt="Contact us" 
            className="w-full rounded-lg shadow-xl"
          />
        </div>

        {/* Contact Information - Now on the right */}
        <div className="w-full lg:w-1/2 space-y-6 order-2 lg:order-none">
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-gray-800">Get in Touch</h3>
            <p className="text-gray-600">
              Have questions or need assistance? Our team is here to help you with all your healthcare needs.
            </p>
            <p className="text-gray-600">
              Email: support@prescripto.com<br />
              Phone: (123) 456-7890
            </p>
            <p className="text-gray-600">
              Address: 123 Healthcare Lane, Medical City, MC 12345
            </p>
          </div>

          {/* Careers Section */}
          <div className="pt-6 border-t border-gray-200">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">CAREERS AT PRESCRIPTO</h3>
            <p className="text-gray-600 mb-6">
              Join our team of dedicated healthcare professionals and make a difference in people's lives every day.
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors">
              EXPLORE JOBS
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact