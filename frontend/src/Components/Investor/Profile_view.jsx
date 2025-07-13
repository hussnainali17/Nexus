import React from 'react'
import { useLocation } from 'react-router-dom';
import NavBar from '../NavBar';

const Profile_view = () => {
    const location = useLocation();
    const { avatar, user, bio, investmentInterests, portfolioCompanies } = location.state || {};
    const {name, email} = user || {};

    return (
        <div className='w-[95%] m-auto p-4 md:w-[90%] md:p-5'>
     <NavBar props='Back' isProfilePage={true}/>
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

      </div>
      </div>
    
  );
};

export default Profile_view