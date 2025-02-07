// eslint-disable-next-line no-unused-vars
import React from 'react'
import { Route,BrowserRouter,Routes } from 'react-router-dom'
import Login from '../screens/Login'
import Register from '../screens/Register'
import Home from '../screens/Home'


const AppRoutes = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<div>{<Home/>}</div>}/>
            <Route path="/login" element={<div>{<Login/>}</div>}/>
            <Route path="/Register" element={<div>{<Register/>}</div>}/>

        </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes