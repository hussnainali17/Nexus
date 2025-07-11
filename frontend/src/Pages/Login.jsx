import React, { useState, useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
//import { UserDataContext } from '../Context/UserContext';

const Login = () => {
const [ email, setEmail ] = useState('')
const [ password, setPassword ] = useState('')
 const navigate = useNavigate();
// const { UCON, setUCON } = useContext(UserDataContext);

// useEffect(() => {
//   // console.log('UCON updated:', UCON); // Log UCON after it's updated
// }, [UCON]); // This effect runs whenever UCON changes

 const submitHandler = async (e) => {
        e.preventDefault();
        const user={
         email : email,
         password : password
        } 

//         console.log(user);
    
try {
//   const response = await axios.post(`${import.meta.env.VITE_API_URL}/users/login`, user, {
//     withCredentials: true // ✅ This tells browser to store cookie
//   });
const response = await axios.post(`${import.meta.env.VITE_API_URL}/users/login`, user);

  if (response.status === 200) {
    const data = response.data;
    console.log("Login successful:", data);
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', data.user._id);
    // Optionally:
    // localStorage.setItem("role", data.user.role);
     if (data.user.role === 'investor') {
       //localStorage.setItem("role", 'admin');
       navigate('/dashboard');
     } else {
       navigate('/dashboard_Ent');
     }
  } 

} catch (error) {
  console.error("Login error:", error.response?.data || error.message);
}



    setEmail('')
    setPassword('')

    }
  return (
    <div className=' flex justify-center items-center h-screen'>
        <form onSubmit={(e)=>{
            submitHandler(e);
        }} className='border-2 p-10 border-gray-500 h-auto w-[80%] flex flex-col justify-center items-center gap-4 rounded-lg shadow-lg md:w-[30%]'>
            <p className='text-2xl font-semibold '>Login</p>
            <input className='rounded-md p-2 border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500' type="email" placeholder='Enter your email' value={email} onChange={(e)=>{setEmail(e.target.value)}} />
            <input className='rounded-md p-2 border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500' type="password" placeholder='Enter your password' value={password} onChange={(e)=>{setPassword(e.target.value)}} />
            <button type="submit" className='bg-blue-500 text-white px-4 py-2 rounded-md'>Login</button>
            <p className='text-sm'>Don't have an account? <a href="/signup" className='text-blue-600'>Sign Up</a></p>
        </form>
    </div>
  )
}

export default Login