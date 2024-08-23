import { useState } from 'react'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./pages/Login/Login"
import Signup from './pages/signup/Signup';
import Profile from './pages/Profile/Profile';
import EditProfile from './pages/EditProfile/Editprofile';

function App() {
  return(
    <Router>
      <Routes>
        <Route path = "/" element= {<Login/>} />
        <Route path = "/signup" element= {<Signup/>} />
        <Route path = "/profile" element= {<Profile/>} />
        <Route path = "/profile/:id" element= {<EditProfile/>} />
      </Routes>
    </Router>
  )
}

export default App
