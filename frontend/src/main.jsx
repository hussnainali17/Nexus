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
import ProfileView from './Components/Entrepreneur/ProfileView.jsx'
import Profile_View from './Components/Investor/Profile_view.jsx'
import UserProtectedWrapper from './Components/ProtectedWrapper/userProtectedwrapper.jsx'
import InvestorProtectedWrapper from './Components/ProtectedWrapper/InvestorProtectedWrapper.jsx'
import EntrepreneurProtectedWrapper from './Components/ProtectedWrapper/EntrepreneurProtectedWrapper.jsx'
import VerifyEmail from './Pages/VerifyEmail.jsx'
createRoot(document.getElementById('root')).render(

  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<UserProtectedWrapper><InvestorProtectedWrapper><Dashboard /></InvestorProtectedWrapper></UserProtectedWrapper>} />
      <Route path="/dashboard_Ent" element={<UserProtectedWrapper><EntrepreneurProtectedWrapper><Dashboard_Ent /></EntrepreneurProtectedWrapper></UserProtectedWrapper>} />
      <Route path="/entrepreneur_profile" element={<UserProtectedWrapper><EntrepreneurProtectedWrapper><Entrepreneur_Profile /></EntrepreneurProtectedWrapper></UserProtectedWrapper>} />
      <Route path="/invest_profile" element={<UserProtectedWrapper><InvestorProtectedWrapper><Invest_Profile /></InvestorProtectedWrapper></UserProtectedWrapper>} />
      <Route path="/investor/update_profile" element={<UserProtectedWrapper><InvestorProtectedWrapper><Update_Investor /></InvestorProtectedWrapper></UserProtectedWrapper>} />
      <Route path="/entrepreneur/update_profile" element={<UserProtectedWrapper><EntrepreneurProtectedWrapper><Update_Entrepreneur /></EntrepreneurProtectedWrapper></UserProtectedWrapper>} />
      <Route path='/Chat' element={<UserProtectedWrapper><Chats /></UserProtectedWrapper>} />
      <Route path='/People' element={<UserProtectedWrapper><People /></UserProtectedWrapper>} />
      <Route path='/entre_profileView' element={<UserProtectedWrapper><ProfileView /></UserProtectedWrapper>} />
      <Route path='/invest_ProfileView' element={<UserProtectedWrapper><Profile_View /></UserProtectedWrapper>} />
      <Route path='/verify-email' element={<VerifyEmail />} />

    </Routes>
  </BrowserRouter>

)


