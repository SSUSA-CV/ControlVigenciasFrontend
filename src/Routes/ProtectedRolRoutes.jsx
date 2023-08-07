import React, { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import axios from 'axios'

export const ProtectedRolRoutes = () => {
  const [data, setData] = useState('')

  useEffect(() => {
    axios.get('https://controlvigenciasbackend-szwc.onrender.com/api/logged_data', { withCredentials: true })
    .then(response => setData(response.data.rol))
    .catch(error => console.log(error.message))
  })

  if(data === '') return <div>Cargando ...</div>

  if(data !== 'admin') return <Navigate to="/inicio" replace />

  return (
    <Outlet />
  )
}
