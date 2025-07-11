import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState , useEffect } from 'react';





const Profile = () => {
    const navigate = useNavigate();
      const [investor, setInvestor] = useState(null);
     
    
      useEffect(() => {
        const fetchUserProfile = async () => {
            const user=localStorage.getItem('user');
            
          try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/profile/${user}`);
            
            setInvestor(response.data);
          } catch (error) {
            console.error("Error fetching user profile:", error);
          }
        };
    
        fetchUserProfile();
      }, []);

      if (!investor) return <div>Loading...</div>;

      // Defensive: fallback to empty string if any field is missing
      const name = investor.name || "";
      const email = investor.email || "";
      const bio = investor.profile?.bio || "";
      const avatar = investor.profile?.avatar || '/public/images/bernd-dittrich-pYlBAu3de0w-unsplash.jpg';
      const investmentInterests = investor.profile?.investmentInterests || [];
      const portfolioCompanies = investor.profile?.portfolioCompanies || [];

        const logoutHandle = async () => {
    try {
      await axios.get(`${import.meta.env.VITE_API_URL}/users/logout`);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

      

  return (
    
      <div className="w-full max-w-2xl bg-white p-8 flex flex-col gap-6">
        
        <div className="flex flex-col md:flex-row items-center gap-6">
          <img
            src={avatar}
            alt="Investor Avatar"
            className="w-32 h-32 rounded-full object-cover shadow mb-2 md:mb-0"
          />
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-2">
            <h2 className="text-3xl font-bold">{name}</h2>
            <p className="text-blue-700 text-base break-all">{email}</p>
            <p className="text-gray-600 text-lg">{bio}</p>
          </div>
        </div>
        <div className="w-full h-px bg-gray-300 my-2"></div>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <h3 className="font-bold text-xl mb-2 text-center md:text-left">Investment Interests</h3>
            <ul className="flex flex-wrap gap-2 justify-center md:justify-start">
              {investmentInterests.length > 0 ? investmentInterests.map((interest, idx) => (
                <li key={idx} className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  {interest}
                </li>
              )) : <li className="text-gray-400">No interests</li>}
            </ul>
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-xl mb-2 text-center md:text-left">Portfolio Companies</h3>
            <ul className="flex flex-wrap gap-2 justify-center md:justify-start">
              {portfolioCompanies.length > 0 ? portfolioCompanies.map((company, idx) => (
                <li key={idx} className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {company}
                </li>
              )) : <li className="text-gray-400">No companies</li>}
            </ul>
          </div>
        </div>
        <button onClick={()=>{navigate('/investor/update_profile')}} className='bg-black text-white py-2 px-4 rounded '>Update Profile</button>
        <button onClick={() => { localStorage.removeItem('user'); navigate('/login'); logoutHandle(); }} className="bg-red-500 text-white py-2 px-4 rounded">Logout</button>
      </div>
    
  );
};

export default Profile;