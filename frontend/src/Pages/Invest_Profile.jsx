import React from 'react'
import NavBar from '../Components/NavBar'
import Profile from '../Components/Investor/Profile'
import Footer from '../Components/Footer'

const Invest_Profile = () => {
  return (
    <div className='w-[95%] m-auto p-4 md:w-[90%] md:p-5'>
        <NavBar props='Back' isProfilePage={true}/>
        <Profile/>
        <Footer/>
    </div>
  )
}

export default Invest_Profile