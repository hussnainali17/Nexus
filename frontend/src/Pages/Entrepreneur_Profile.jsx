import React from 'react'
import NavBar from '../Components/NavBar'
import Footer from '../Components/Footer'
import Profile from '../Components/Entrepreneur/Profile'

const Entrepreneur_Profile = () => {
  return (
    <div className='w-[95%] m-auto p-4 md:w-[90%] md:p-5'>
        <NavBar props='Back' isProfilePage={true}/>
        <Profile/>

        <Footer/>
    </div>
  )
}

export default Entrepreneur_Profile