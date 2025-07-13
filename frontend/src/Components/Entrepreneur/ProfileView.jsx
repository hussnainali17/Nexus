import React from 'react'
import NavBar from '../NavBar';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';


const ProfileView = () => {

    
    const location = useLocation();
  const { entrepreneur } = location.state || {};

 return (
    <div className='w-[95%] m-auto p-4 md:w-[90%] md:p-5'>
        <NavBar props='Back' isProfilePage={true}/>
    
    <div className="w-full flex flex-col gap-8">
       
      <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-2 tracking-tight">Business Details</h2>
      <div className="flex flex-col md:flex-row gap-8 items-center">
        <div className="w-full md:w-1/2 flex justify-center">
          <img className="w-full md:w-100 h-64 object-cover rounded-xl shadow-lg border-4 border-blue-200" src={entrepreneur.businessImage} alt="Business" />
        </div>
        <div className="w-full p-5 md:w-1/2 flex flex-col gap-3 text-center md:text-left">
          <p className="font-bold text-3xl text-blue-900">{entrepreneur.startupName}</p>
          <p className="text-lg text-gray-700">By <span className="font-semibold text-blue-700">{entrepreneur.user.name}</span></p>
          <p><span className="font-bold text-lg text-green-700">Bio:</span> <span className="text-gray-600">{entrepreneur.bio}</span></p>
          <p><span className="font-bold text-lg text-green-700">Startup Description:</span> <span className="text-gray-600">{entrepreneur.startupDescription}</span></p>
          <p><span className="font-bold text-lg text-green-700">Funding Needed:</span> <span className="text-gray-800">${entrepreneur.fundingNeed}</span></p>
        </div>
      </div>
      <div className="w-full h-px bg-gray-300 my-2"></div>
      <h2 className="text-3xl font-bold text-center text-gray-800 my-4 py-2">Entrepreneur Details</h2>
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="flex justify-center w-full md:w-1/3">
          <img className="h-28 w-28 rounded-full object-cover shadow-lg border-4 border-green-200" src={entrepreneur.entrepreneurImage} alt="Entrepreneur" />
        </div>
        <div className="flex flex-col gap-2 w-full md:w-2/3 text-center md:text-left">
          <p className="font-bold text-2xl text-blue-900">{name}</p>
          <p className="text-gray-600 text-lg">Email: <span className="text-blue-700">{entrepreneur.user.email}</span></p>
          <p className="text-gray-600 text-lg">Bio: <span className="text-green-700">{entrepreneur.bio}</span></p>
        </div>
      </div>
      
    </div>

    </div>
  )
}

export default ProfileView