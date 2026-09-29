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
          <Route path="/dashboard/add-person" element={<AddPerson />} />
          <Route path="/dashboard/contacts" element={<AllContact />} />
          <Route path="/dashboard/messages" element={<Message />} />
          <Route path="/dashboard/settings" element={<Settings />} />
          <Route path="/dashboard/upcoming-birthdays" element={<UpcomingBirthdays />} />
      </Route>

      
    </Routes>
  )
}

export default App
