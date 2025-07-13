//import React from 'react'
import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

//import { UserDataContext } from '../Context/UserContext';

 const Signup = () => {
   const [ email, setEmail ] = useState('')
   const [ password, setPassword ] = useState('')
   const [name, setname] = useState('')
   const [role, setRole] = useState('investor') // Default role
   const [successMsg, setSuccessMsg] = useState('');
   const navigate = useNavigate();
// //const { UCON, setUCON } = useContext(UserDataContext);

// // useEffect(() => {
// //   console.log('UCON updated:', UCON); // Log UCON after it's updated
// // }, [UCON]); // This effect runs whenever UCON changes

     const submitHandler = async (e) => {
console.log(e);
      e.preventDefault();
    
        const user={
         name :name,
         email : email,
         password : password,
         role: role // Default role, can be changed later
        }
        

    try {
        
  const response = await axios.post(`${import.meta.env.VITE_API_URL}/users/signup`, user, {
    withCredentials: true // This tells the browser to store cookies
  });

  if (response.status === 200) {
    setSuccessMsg(response.data.message || 'Signup successful! Please check your email to verify your account.');
    setTimeout(() => setSuccessMsg(''), 5000);
    // Delay navigation to /verify-email by 1 minute (60000 ms)
    //console.log('Signup successful, redirecting to verify email...');
    //navigate('/verify-email');
  }
} catch (error) {
  console.error("Signup error:", error.response?.data || error.message)
}


    setEmail('')
    setname('')
    setPassword('')
    setRole('investor') 

    }

  return (
    <div className='flex justify-center items-center h-screen relative'>
      {successMsg && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 px-8 py-4 rounded-lg shadow-2xl z-50 bg-gradient-to-r from-green-600 via-green-500 to-lime-500 text-white font-semibold text-center text-sm sm:text-base animate-pulse ring-2 ring-green-300 backdrop-blur-md">
          ✅ {successMsg}
        </div>
      )}
      <form onSubmit={(e) => submitHandler(e)} className='border-2 p-10 border-gray-500 h-auto w-[80%] flex flex-col justify-center items-center gap-4 rounded-lg shadow-lg md:w-[30%]'>
        <p className='text-2xl font-semibold '>Signup</p>
        <input className='rounded-md p-2 border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500' value={name} onChange={(e) => setname(e.target.value)} type="text" placeholder='Enter your Name'   />
        <input className='rounded-md p-2 border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500' value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder='Enter your email'  />
        <input className='rounded-md p-2 border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500' value={password} onChange={(e) => setPassword(e.target.value)} type="password"  placeholder='Enter your password' />
        <div className='flex items-center gap-2 text-gray-700'>
          <input type="radio" name="role" id="investor" value="investor" checked={role === 'investor'} onChange={(e) => setRole(e.target.value)} />
          <label htmlFor="investor">Investor</label>
          <input type="radio" name="role" id="entrepreneur" value="entrepreneur" checked={role === 'entrepreneur'} onChange={(e) => setRole(e.target.value)} />
          <label htmlFor="entrepreneur">Entrepreneur</label>
        </div>
        <button type="submit" className='bg-blue-500 text-white px-4 py-2 rounded-md'>Sign Up</button>
        <p className='text-sm'>Already have an account? <a href="/login" className='text-blue-600'>Login</a></p>
      </form>
    </div>
  )
}

export default Signup