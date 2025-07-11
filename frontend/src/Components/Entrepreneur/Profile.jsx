import React from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';



const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
 

  useEffect(() => {
    const fetchUserProfile = async () => {
        const user=localStorage.getItem('user');
        
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/profile/${user}`);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  if (!user) return <div>Loading...</div>;

  // Provide fallback values for missing fields
  const profile = user.profile || {};
  const startupName = profile.startupName || '';
  const bio = profile.bio || '';
  const startupDescription = profile.startupDescription || '';
  const fundingNeed = profile.fundingNeed || '';
  const name = user.name || '';
  const email = user.email || '';
  const businessImage = profile.businessImage || '/public/images/charles-forerunner-3fPXt37X6UQ-unsplash.jpg';
  const entrepreneurImage = profile.entrepreneurImage || '/public/images/bernd-dittrich-pYlBAu3de0w-unsplash.jpg';

  const logoutHandle = async () => {
    try {
      await axios.get(`${import.meta.env.VITE_API_URL}/users/logout`);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="w-full flex flex-col gap-8">
       
      <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-2 tracking-tight">Business Details</h2>
      <div className="flex flex-col md:flex-row gap-8 items-center">
        <div className="w-full md:w-1/2 flex justify-center">
          <img className="w-full md:w-100 h-64 object-cover rounded-xl shadow-lg border-4 border-blue-200" src={businessImage} alt="Business" />
        </div>
        <div className="w-full p-5 md:w-1/2 flex flex-col gap-3 text-center md:text-left">
          <p className="font-bold text-3xl text-blue-900">{startupName}</p>
          <p className="text-lg text-gray-700">By <span className="font-semibold text-blue-700">{name}</span></p>
          <p><span className="font-bold text-lg text-green-700">Bio:</span> <span className="text-gray-600">{bio}</span></p>
          <p><span className="font-bold text-lg text-green-700">Startup Description:</span> <span className="text-gray-600">{startupDescription}</span></p>
          <p><span className="font-bold text-lg text-green-700">Funding Needed:</span> <span className="text-gray-800">${fundingNeed}</span></p>
        </div>
      </div>
      <div className="w-full h-px bg-gray-300 my-2"></div>
      <h2 className="text-3xl font-bold text-center text-gray-800 my-4 py-2">Entrepreneur Details</h2>
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="flex justify-center w-full md:w-1/3">
          <img className="h-28 w-28 rounded-full object-cover shadow-lg border-4 border-green-200" src={entrepreneurImage} alt="Entrepreneur" />
        </div>
        <div className="flex flex-col gap-2 w-full md:w-2/3 text-center md:text-left">
          <p className="font-bold text-2xl text-blue-900">{name}</p>
          <p className="text-gray-600 text-lg">Email: <span className="text-blue-700">{email}</span></p>
          <p className="text-gray-600 text-lg">Bio: <span className="text-green-700">{bio}</span></p>
        </div>
      </div>
      <button onClick={() => { navigate('/entrepreneur/update_profile'); }} className="bg-gradient-to-r from-blue-500 to-green-500 text-white py-3 px-8 rounded-lg font-semibold text-lg shadow hover:from-blue-600 hover:to-green-600 transition-all mt-8 self-center">Update Profile</button>
      <button onClick={() => { localStorage.removeItem('user'); navigate('/login'); logoutHandle(); }} className="bg-red-500 text-white py-3 px-8 rounded-lg font-semibold text-lg shadow hover:bg-red-600 transition-all mt-4 self-center">Logout</button>
    </div>
  )
}

export default Profile