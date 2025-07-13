import React from 'react'
import { useNavigate } from 'react-router-dom'

const NavBar = ({
  props = "Login",
  isProfilePage = false,
  isDashboard = false,
  profileRoute = "/profile"
}) => {
  const navigate = useNavigate();
  // Scroll to bottom handler
  const scrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  return (
    <div className='flex justify-between items-center'>
      <div className='md:flex md:items-center md:space-x-4'>
        <div className='text-xl font-bold'>Business Nexus®</div>
        <ul className='hidden md:flex md:space-x-4 text-gray-400'>
          <li className='cursor-pointer' onClick={scrollToBottom}>About</li>
          <li className='cursor-pointer' onClick={scrollToBottom}>Contact</li>
          {props !== "Login" && (
            <li onClick={() => navigate('/people')} className='cursor-pointer'>Messages</li>
          )}
        </ul>
      </div>
      <div className='flex items-center space-x-3'>
        <div
          className='bg-black text-white p-2 rounded-md font-bold cursor-pointer'
          onClick={() => {
            if (isProfilePage) {
              navigate(-1);
            } else if (isDashboard && profileRoute) {
              navigate(profileRoute);
            } else {
              navigate('/login');
            }
          }}
        >
          {props}
        </div>
        {props !== "Login" && (
          <div onClick={() => navigate('/people')} className='text-blue-500 md:hidden text-3xl'><i className="fa-solid fa-message"></i></div>
        )}
      </div>
    </div>
  )
}

export default NavBar