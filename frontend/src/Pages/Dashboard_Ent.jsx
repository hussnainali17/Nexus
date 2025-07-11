import React from 'react'
import NavBar from '../Components/NavBar'
import Middle from '../Components/Entrepreneur/Middle'
import Footer from '../Components/Footer'

const Dashboard_Ent = () => {
  return (
    <div className='w-[95%] m-auto p-4 md:w-[90%] md:p-5'>
      <NavBar props="Profile" isProfilePage={false} isDashboard={true} profileRoute="/entrepreneur_profile"  />
      <Middle />
      <Footer />
    </div>
  )
}

export default Dashboard_Ent