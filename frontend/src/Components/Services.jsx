import React from 'react'

const Services = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-4 gap-10 mt-10 px-4 md:px-12 py-8'>
        <div className='flex flex-col items-center text-center gap-4'>
            <i className="text-3xl text-gray-400 fa-solid fa-handshake"></i>
                <p className='font-semibold text-xl'>Trust & Transperancy</p>

        </div>
        <div className='flex flex-col items-center text-center gap-4'>
            <i className="text-3xl text-gray-400 fa-solid fa-bolt"></i>
                <p className='font-semibold text-xl'>Faster Funding</p>
               
        </div>
        <div className='flex flex-col items-center text-center gap-4'>
            <i className="text-3xl text-gray-400 fa-solid fa-network-wired"></i>
                <p className='font-semibold text-xl'>Global Reach</p>
                
        </div>
        <div className='flex flex-col items-center text-center gap-4'>
            <i className="text-3xl text-gray-400 fa-solid fa-arrow-up-right-dots"></i>
            <p className='font-semibold text-xl'>Growth insights</p>
                
        </div>
    </div>
  )
}

export default Services