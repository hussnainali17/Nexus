import React from 'react'
import { useNavigate } from 'react-router-dom'

const Hero = () => {
  const navigate = useNavigate();
  return (
    <div className='h-100 md:h-120 flex flex-col justify-center items-center gap-2 mt-5 text-center '>
        <div className='text-3xl md:text-5xl lg:text-6xl font-bold'>
            Connect. Invest. Grow
        </div>
        <div className='text-gray-500 text-3xl md:text-5xl lg:text-6xl font-bold'>
            Entrepreneurs meet investors here
        </div>
        <div className='flex flex-col md:flex-row gap-4 mt-5 font-bold'>
            <button className='bg-black text-white p-3 rounded-xl'onClick={()=>{navigate('/signup')}}>Register as Entrepreneur</button>
            <button className='bg-gray-300 rounded-xl p-3'onClick={()=>{navigate('/signup')}}>Register as Investor</button>
        </div>
    </div>
  )
}

export default Hero