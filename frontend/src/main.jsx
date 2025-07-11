import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Login from './Pages/Login.jsx'
import Signup from './Pages/Signup.jsx'
import LandingPage from './Pages/LandingPage.jsx'
import Dashboard from './Pages/Dashboard.jsx'
import Dashboard_Ent from './Pages/Dashboard_Ent.jsx'
import Entrepreneur_Profile from './Pages/Entrepreneur_Profile.jsx'
import Invest_Profile from './Pages/Invest_Profile.jsx'
import Update_Investor from './Components/Investor/Update_Profile.jsx'
import Update_Entrepreneur from './Components/Entrepreneur/UpdateProfile.jsx'
import Chats from './Pages/chats.jsx'
import People from './Components/Chats/People.jsx'
createRoot(document.getElementById('root')).render(
  
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard_Ent" element={<Dashboard_Ent />} />
        <Route path="/entrepreneur_profile" element={<Entrepreneur_Profile />} />
        <Route path="/invest_profile" element={<Invest_Profile />} />
        <Route path="/investor/update_profile" element={<Update_Investor />} />
        <Route path="/entrepreneur/update_profile" element={<Update_Entrepreneur />} />
        <Route path='/Chat' element={<Chats />} />
        <Route path='/People' element={<People />} />
      </Routes>
    </BrowserRouter>

)

      
