import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './Components/auth/Login'
import Register from './Components/auth/Register'
import Home from './Components/pages/Home'
import { useDispatch, useSelector } from 'react-redux'
import authSlice, { setToken } from './slice/auth-slice'
import Cart from './Components/pages/Cart'

const App = () => {
  const dispatch=useDispatch()
  dispatch(setToken(localStorage.getItem('token')))
  const data=useSelector(state => state.authSlice)
  console.log('data',data);
  
  return (
   <>
   <Routes>
   {/* <Route path="/" element={<Home />} /> */}
   <Route path="/" element={data.token? <Home/> :<Login />} />
   <Route path="/register" element={<Register />} />
   <Route path="/home" element={data.token ? <Home /> : <Login />} />
   <Route path="/cart" element={data.token ? <Cart /> : <Login />} />

   

   </Routes>
   </>
  )
}

export default App
