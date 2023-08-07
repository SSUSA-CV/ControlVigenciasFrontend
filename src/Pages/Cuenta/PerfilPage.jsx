import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import '../../styles/Cuenta/Perfil.css'

export const PerfilPage = () => {
  const navigator = useNavigate()

  const [usuario, setUsuario] = useState('')

  useEffect(() => {
    axios.get('https://controlvigenciasbackend-szwc.onrender.com/api/logged_data', { withCredentials: true })
    .then(response => {
      setUsuario(response.data)
    })
    .catch(error => console.log(error))
  }, [])

  const handleLogout = () => {
    axios.get('https://controlvigenciasbackend-szwc.onrender.com/api/logout', { withCredentials: true })
    .then(() => {
      localStorage.removeItem('ILI')
      navigator('/login')
    })
    .catch(err => console.log(err.message))
  }

  const handleDelete = () => {
    axios.delete(`https://controlvigenciasbackend-szwc.onrender.com/api/usuarios/12`, { withCredentials: true })
    .then((response) => handleLogout())
    .catch(error => console.log(error))
  }

  const editPage = () => {
    navigator('/editar-cuenta')
  }

  return (
    <div className='perfil-container'>
      <div className='left-side'>
        <h1>{usuario.nombre}</h1>
        <div className='section'>
          <ul className='perfil-ul'>
            <li>{usuario.correo}</li>
            <li>Rol {usuario.rol}</li>
          </ul>
          <hr className='hr' />
          <div className='fecha'>
            Fecha de registro: {usuario.created_at}
          </div>
        </div>
      </div>
      <div className='right-side'>
        <button onClick={handleLogout} className='button logout'><div className='button-hover'>Cerrar sesión</div></button>
        
        <button onClick={editPage} className='button edit'><div className='button-hover'>Editar cuenta</div></button>

        <button type="button" className="button delete" data-bs-toggle="modal" data-bs-target="#deleteAccount">
          <div className='button-hover'>Eliminar cuenta</div>
        </button>

        <div className="modal fade" id="deleteAccount" tabIndex="-1" aria-labelledby="deleteAccountLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div style={{borderRadius: 0}} className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="deleteAccountLabel">Eliminar cuenta</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                ¿Seguro que quiere eliminar su cuenta?
              </div>
              <div className="modal-footer">
                <button style={{borderRadius: 0}} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                <button style={{borderRadius: 0}} onClick={handleDelete} type="button" className="btn btn-danger" data-bs-dismiss="modal">Si, eliminar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
