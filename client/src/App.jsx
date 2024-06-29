import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './Components/auth/Login'
import Register from './Components/auth/Register'
import Home from './Components/pages/Home'
import { useDispatch, useSelector } from 'react-redux'
import authSlice, { setToken } from './slice/auth-slice'
import Cart from './Components/pages/Cart'
import StaffDashboard from './Components/pages/StaffDashboard'

const App = () => {
  const dispatch=useDispatch()
  dispatch(setToken(localStorage.getItem('token')))
  const data=useSelector(state => state.authSlice)
  console.log('data rolelelel',data.role);
  
  return (
   <>
   <Routes>
   {/* <Route path="/" element={<Home />} /> */}
   <Route path="/" element={<Login />} />
   
   <Route path="/register" element={<Register />} />
   <Route path="/home" element={data.token ? data.role==="staff"?<StaffDashboard/>:<Home /> : <Login />} />

   <Route path="/cart" element={data.token ? <Cart /> : <Login />} />

   

   </Routes>
   </>
  )
}

export default App
