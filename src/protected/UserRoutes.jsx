import React from 'react'
import { Outlet, useNavigate } from 'react-router'

const UserRoutes = () => {
  const user=JSON.parse(localStorage.getItem('user'))
  const navigate=useNavigate()
  return user!=null ?
  <Outlet/>:navigate('/login')
}

export default UserRoutes
