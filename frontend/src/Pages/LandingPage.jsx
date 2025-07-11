import React from 'react'
import NavBar from '../Components/NavBar.jsx' 
import Hero from '../Components/Hero.jsx'
import MiddleSec from '../Components/MiddleSec.jsx'
import Services from '../Components/Services.jsx'
import Footer from '../Components/Footer.jsx'

const LandingPage = () => {
  return (
    <div className='w-[95%] m-auto p-4 md:w-[90%] md:p-5'>
        <NavBar props="Login" isProfilePage={false} />
        <Hero/>
        <MiddleSec/>
        <Services/>
        <Footer/>
    </div>
  )
}

export default LandingPage