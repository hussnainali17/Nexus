import React from 'react'

const Footer = () => {
  return (
    <div className='text-gray-500 p-5 md:flex md:gap-30 mt-10 md:justify-center space-y-5 border-t pt-30 border-t-gray-200'>
        <ul>
            <li className='text-black text-xl'>Company</li>
            <li>About</li>
            <li>Carrers</li>
            <li>Press</li>
        </ul>
        <ul>
            <li className='text-black text-xl'>Contact</li>
            <li>Support</li>
            <li>Email</li>
            <li>GitHub</li>
        </ul>
        <ul>
            <li className='text-black text-xl'>Legal</li>
            <li>Terms</li>
            <li>Privacy</li>
            <li>Cookies</li>
        </ul>

    </div>
  )
}

export default Footer