import React from 'react'
import NavBar from '../Components/NavBar'
import Middle from '../Components/Investor/Middle'
import Footer from '../Components/Footer'

const Dashboard = () => {
  return (
    <div className='w-[95%] m-auto p-4 md:w-[90%] md:p-5'>
    <NavBar props="Profile" isProfilePage={false} isDashboard={true} profileRoute="/invest_profile" />
    <Middle/>
    <Footer/>

    </div>
  )
}

export default Dashboard