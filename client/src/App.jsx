import React from 'react'
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Layout from "./components/Layout.jsx";
import Features from "./pages/Features.jsx";
import HowItWorks from "./pages/HowItWorks.jsx";
import Pricing from "./pages/Pricing.jsx";
import About from './pages/About.jsx';
import Login from './pages/Login.jsx'
import Register from "./pages/Register.jsx";
import DashboardLayout from "./components/DashboardLayout.jsx";
import AddPerson from "./components/Dashboard/AddPerson.jsx";
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import AllContact from "./components/Dashboard/AllContacts.jsx"
import Message from "./components/Dashboard/Messages.jsx"
import Settings from "./components/Dashboard/Settings.jsx"
import UpcomingBirthdays  from "./components/Dashboard/UpcomingBirthdays.jsx"
import ForgotPassword from "./pages/Auth/ForgotPassword";
import VerifyOTP from "./pages/Auth/VerifyOTP";
import ResetPassword from "./pages/Auth/ResetPassword";
import PasswordResetSuccess from "./pages/Auth/PasswordResetSuccess";
import Notifications from "./components/Dashboard/Notifications";
function App() {
  return (
    <Routes>
      <Route element ={<Layout />} >
          <Route path="/" element={<Home />} />
          <Route path="/Features" element={<Features />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/about" element={<About />} />
      </Route>
      <Route path="/login" element ={<Login />} />
      <Route path="/signup" element={<Register />}/>
      <Route element ={<DashboardLayout />} >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/add-person/:id?" element={<AddPerson />} />
          <Route path="/dashboard/contacts" element={<AllContact />} />
          <Route path="/dashboard/messages" element={<Message />} />
          <Route path="/dashboard/settings" element={<Settings />} />
          <Route path="/dashboard/upcoming-birthdays" element={<UpcomingBirthdays />} />
          <Route path="/dashboard/notifications" element={<Notifications />} />
      </Route>
      <Route path="/forgot-password" element={<ForgotPassword/>}/>
      <Route  path = "/verify-otp" element={<VerifyOTP />}/>
      <Route path = "/reset-password" element={<ResetPassword />} />
      <Route path = "/password-success" element={<PasswordResetSuccess />} />

      
    </Routes>
  )
}

export default App
