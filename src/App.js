import React from 'react'
// import './App.css'

import { Route, Routes } from 'react-router-dom'

import Header from './Components/Header/Header'
// import PrivateRoute from './Components/PrivateRoute/PrivateRoute.js'

import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import Profile from './Components/Profile/Profile.js'
import Home from './Components/Home/Home.js'


const App = () => {
  return (
    <div>
      <Header />
      <Routes>
            {/* <PrivateRoute exact path="/" element={<Home />} /> */}
            {/* <Route>
                <PrivateRoute component={Home}/>
            </Route> */}
            <Route exact path="/profile" element={<Profile />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/" element={<Home />} />
            {/* <Route exact path="/chat" element={<Chat />} /> */}
      </Routes>
    </div>
  )
}

export default App