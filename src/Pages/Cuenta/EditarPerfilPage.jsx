import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import '../../styles/Cuenta/EditarPerfil.css'

export const EditarPerfilPage = () => {
  const [dataUsuario, setDataUsuario] = useState('')

  const [nombre, setNombre] = useState('')
  const [oldContraseña, setOldContraseña] = useState('')
  const [newContraseña, setNewContraseña] = useState('')
  const [confirmContraseña, setConfirmContraseña] = useState('')

  useEffect(() => {
    axios.get('https://controlvigenciasbackend-szwc.onrender.com/api/logged_data', { withCredentials: true })
    .then(response => setDataUsuario(response.data))
    .catch(error => console.log(error))
  }, [])

    const navigator = useNavigate()

    const handleLogout = () => {
      axios.get('https://controlvigenciasbackend-szwc.onrender.com/api/logout', { withCredentials: true })
      .then(() => {
        localStorage.removeItem('ILI')
        navigator('/login')
      })
      .catch(err => console.log(err.message))
    }

    const handleSubmit = e => {
      e.preventDefault()
      
      axios.post('https://controlvigenciasbackend-szwc.onrender.com/api/actualizar-password', {
        id: dataUsuario.id,
        contraseña: oldContraseña,
      }, { withCredentials: true })
      .then(response => {
        if(!response.data) {
          document.getElementById('statusContraseña').innerHTML = `<span style="color: crimson;">Contraseña incorrecta</span>`
          document.getElementById('statusConfirmContraseña').innerHTML = `<span></span>`
        } else {
          document.getElementById('statusContraseña').innerHTML = `<span style="color: chartreuse;">Contraseña correcta</span>`
          if(newContraseña !== confirmContraseña) {
            return document.getElementById('statusConfirmContraseña').innerHTML = `<span style="color: crimson;">Las contraseñas no coinciden</span>`
          } else {
            document.getElementById('statusConfirmContraseña').innerHTML = `<span style="color: chartreuse;">Las contraseñas coinciden</span>`
            axios.put(`https://controlvigenciasbackend-szwc.onrender.com/api/usuarios/${dataUsuario.id}`, {
              nombre,
              password: newContraseña
            }, { withCredentials: true })
            .then(response => {
              console.log(response.data)
              handleLogout()
            })
            .catch(error => console.log(error))
          }
        }
      })
      .catch(error => console.log(error))
    }

    const inputRef = useRef(null)

    useEffect(() => {
      setNombre(inputRef.current.value)
    })

  return (
    <div>
      <h1>{dataUsuario.nombre}</h1>
      <span>{dataUsuario.correo}</span>
      <hr />
      <form onSubmit={handleSubmit}>
        <div className='sides-container'>
          <div className='left'>
            <label htmlFor="nombre">Cambiar nombre</label>
            <input defaultValue={dataUsuario.nombre} ref={inputRef} onChange={e => setNombre(e.target.value)} className='input-form' type="text" id='nombre' required/>
          </div>

          <div className='right'>
            <p><b>Cambiar contraseña</b></p>

            <div id="statusContraseña"></div>
            <label htmlFor="oldcontraseña">Introduce tu contraseña actual</label>
            <input onChange={e => setOldContraseña(e.target.value)} className='input-form' type="password" id='oldcontraseña' required/>

            <div id="statusConfirmContraseña"></div>
            <label htmlFor="newcontraseña">Introduce una nueva contraseña</label>
            <input onChange={e => setNewContraseña(e.target.value)} className='input-form' type="password" minLength={8} id='newcontraseña' required/>

            <label htmlFor="cnewcontraseña">Confirma tu nueva contraseña</label>
            <input onChange={e => setConfirmContraseña(e.target.value)} className='input-form' type="password" minLength={8} id='cnewcontraseña' required/>
          </div>
        </div>

        <input className='action' type="submit" value='Actualizar' />
      </form>
    </div>
  )
}
