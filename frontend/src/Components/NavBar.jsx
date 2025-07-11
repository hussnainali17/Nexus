import React from 'react'
import { useNavigate } from 'react-router-dom'

const NavBar = ({
  props = "Login",
  isProfilePage = false,
  isDashboard = false,
  profileRoute = "/profile"
}) => {
  const navigate = useNavigate();
  return (
    <div className='flex justify-between items-center'>
        <div className='md:flex md:items-center md:space-x-4'>
        <div className='text-xl font-bold'>Business Nexus®</div>
        <ul className='hidden md:flex md:space-x-4 text-gray-400'>
            <li>About</li>
            <li>Contact</li>
            <li>Git Hub</li>
        </ul>
        </div>
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
    </div>
  )
}

export default NavBar