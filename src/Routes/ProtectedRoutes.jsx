import { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import axios from 'axios'

export const ProtectedRoutes = () => {
    const [logged, setlogged] = useState('')

    useEffect(() => {
        axios.get('https://controlvigenciasbackend-szwc.onrender.com/api/loggedIn', { withCredentials: true })
        .then(response => {
            setlogged(response.data.isLoggedIn)
        })
        .catch(error => console.log(error.message))
    })

    if(logged === '') return <div>Cargando ...</div>

    if(logged !== 'true') return <Navigate to='/login' replace />

  return (
    <Outlet />
  )
}
