import { useEffect, useState } from 'react'
import ssusaLogo from  "../assets/logo.jpg"
import { Link, NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'

import '../styles/NavBar.css'

export const NavBar = () => {
  const data = localStorage.getItem('ILI')

  const navigator = useNavigate()

  const handleLogout = () => {
    axios.get('https://controlvigenciasbackend-szwc.onrender.com/api/logout', { withCredentials: true })
    .then(() => {
      localStorage.removeItem('ILI')
      navigator('/login')
    })
    .catch(err => console.log(err.message))
  }

  const [usuario, setUsuario] = useState()

  useEffect(() => {
    axios.get('https://controlvigenciasbackend-szwc.onrender.com/api/logged_data', { withCredentials: true })
    .then((response) => setUsuario(response.data.nombre))
    .catch(err => console.log(err.message))
  })

  return (
    <header className='header'>
      <div className="container">
        <nav className='nav'>
            <div className='nav-brand'>
                <img src={ssusaLogo} alt='logo' width='100px'></img>
                <span>Servicios y Soluciones Universales S.A. de C.V.</span>
            </div>
            <ul className='navbar-ul'>
              {
                !data ? (
                  <>
                    <li className='navbar-li'><NavLink className='navbar-link' to="/login">Iniciar sesión</NavLink></li>
                    <li className='navbar-li'><NavLink className='navbar-link' to="/register">Registrarse</NavLink></li>
                  </>
                ) : (
                  <>
                    <li><Link className='navbar-link' to='/inicio'>Inicio</Link></li>
                    <li>
                      <div className="dropdown">
                        <button className="dropdown-toggle navbar-link" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                          {usuario}
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                          <li><Link  to='/cuenta' className="dropdown-item">Ver perfil</Link></li>
                          <li><button onClick={handleLogout} className="dropdown-item">Cerrar sesión</button></li>
                        </ul>
                      </div>
                    </li>
                  </>
                )
              }
            </ul>
        </nav>
      </div>
    </header>
  )
}
