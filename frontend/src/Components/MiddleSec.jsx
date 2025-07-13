import React from 'react'
import { useNavigate } from 'react-router-dom'

const MiddleSec = () => {
  const navigate = useNavigate();
  return (
    <div className='h-full flex flex-col ' >
        
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mt-10 px-4 md:px-12 py-8'>
            <div className='flex flex-col items-center text-center' onClick={()=>{navigate('/signup')}}>
                <img className='w-60 h-60 object-cover rounded-xl mb-4 shadow-lg' src="/public/images/a5fee5b6-917e-49c5-9133-e2907d6dbc11.jpeg" alt="" />
                <div>
                    <p className='font-bold text-2xl'>Signup.</p>
                    <p className='text-gray-500 max-w-xs'>
                        Create your profile as an entrepreneur or investor in minutes.
                    </p>
                </div>
            </div>
            <div className='flex flex-col items-center text-center'>
                <img className='w-60 h-60 object-cover rounded-xl mb-4 shadow-lg' src="/public/images/6f6f8d8f-3a5c-4106-8eff-247e219df256.jpeg" alt="" />
                <div>
                    <p className='font-bold text-2xl'>Discover.</p>
                    <p className='text-gray-500 max-w-xs'>
                        Find the most promising startups or connect with trusted investors.
                    </p>
                </div>
            </div>
            <div className='flex flex-col items-center text-center'>
                <img className='w-60 h-60 object-cover rounded-xl mb-4 shadow-lg' src="/public/images/Global Data Network_ An intricate visual….jpeg" alt="" />
                <div>
                    <p className='font-bold text-2xl'>Connect.</p>
                    <p className='text-gray-500 max-w-xs'>
                        Exchange ideas, start conversations, and build lasting partnerships.
                    </p>
                </div>
            </div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mt-10 px-4 md:px-12 py-8'>
            <div className='flex flex-col items-center text-center' onClick={()=>{navigate('/dashboard_Ent')}}>
                <img className='w-80 h-80 object-cover  mb-4 ' src="\public\images\Black and white Illustration of a successful….jpeg" alt="" />
                <div>
                    <p className='font-bold text-2xl'>Entrepreneur</p>
                    <p className='text-gray-500 max-w-xs'>
                        Support innovative ideas and help them grow with your investment.
                    </p>
                </div>
            </div>
            <div className='flex flex-col items-center text-center' onClick={()=>{navigate('/dashboard')}}>
                <img className='w-80 h-80 object-cover mb-4' src="\public\images\Loan free icons designed by Icongeek26.jpeg" alt="" />
                <div>
                    <p className='font-bold text-2xl'>Investor</p>
                    <p className='text-gray-500 max-w-xs'>
                        Scale your business or investment portfolio with our platform's support.
                    </p>
                </div>
            </div>

        </div>
    </div>
  )
}

export default MiddleSec