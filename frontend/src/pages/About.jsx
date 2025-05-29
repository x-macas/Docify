import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Existing About Us section */}
      <div className="text-center mb-10">
        <p className="text-4xl font-bold text-gray-800">
          ABOUT <span className="text-blue-600">US</span>
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row items-center gap-8 mb-20">
        <img 
          src={assets.about_image} 
          alt="" 
          className="w-full md:w-1/2 rounded-lg shadow-xl"
        />
        
        <div className="w-full md:w-1/2 space-y-4">
           
          <p className="text-gray-600 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Vivamus luctus urna sed urna ultricies ac tempor dui sagittis.
          </p>
          <b className="block text-xl text-blue-600 mt-6 mb-2">Our Vision</b>
           
          <p className="text-gray-600 leading-relaxed">
            In condimentum facilisis porta. Sed nec diam eu diam mattis viverra.
          </p>
        </div>
      </div>

      {/* New Why Choose Us section */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">WHY CHOOSE US</h1>
        <div className="w-20 h-1 bg-blue-600 mx-auto mb-8"></div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* EPISODICH Card */}
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold text-blue-600 mb-3">EPISODICH</h2>
          <p className="text-gray-600">
            Streamlined Appointment Scheduling<br />
            That Fits Into Your Busy Lifestyle.
          </p>
        </div>

        {/* CONTINUING Card */}
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold text-blue-600 mb-3">CONTINUING</h2>
          <p className="text-gray-600">
            Access To A Network Of Trusted Healthcare Professionals in Your Area.
          </p>
        </div>

        {/* PERSONALIZATION Card */}
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold text-blue-600 mb-3">PERSONALIZATION</h2>
          <p className="text-gray-600">
            Tailored Recommendations And Reminders<br />
            To Help You Stay On Top Of Your Health.
          </p>
        </div>
      </div>
    </div>
  )
}

export default About