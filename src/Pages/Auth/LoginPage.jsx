import {useEffect, useState} from 'react'
import { Link } from "react-router-dom"
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

import '../../styles/Auth.css'

export const LoginPage = () => {
  const navigator = useNavigate()
  
  const [correo, setCorreo] = useState()
  const [contraseña, setContraseña] = useState()

  const [registrado, setRegistrado] = useState()
  const [error, setError] = useState()

  const onChangeCorreo = e => {
    setCorreo(e.target.value)
  }
  const onChangeContraseña = e => {
    setContraseña(e.target.value)
  }

  useEffect(() => {
    setRegistrado(localStorage.getItem('registrado'))
    setTimeout(() => {
      localStorage.removeItem('registrado')
      setRegistrado(null)
    }, 3000)
  }, [])

  const handleSubmit = e => {
    e.preventDefault()

    axios.post('https://controlvigenciasbackend-szwc.onrender.com/api/login', {
      correo,
      password: contraseña
    }, { withCredentials: true })
    .then((response) => {
      localStorage.setItem('ILI', true)
      console.log(response.data)
      navigator('/inicio')
    })
    .catch(err => {
      setError(err.response.data)
      console.log(err.response)
    })
  }
  return (
    <div className='auth-h-screen'>
      <div className='auth-container'>
        <h3>Iniciar sesión</h3>
        <span className='message-good'>{registrado}</span>
        <span className='message-wrong'>{error}</span>
        <form className='form-div' onSubmit={handleSubmit}>
          <div className="form">
            <input className='input' id={error === 'Correo electrónico o contraseña incorrecto' ? 'errorCorreo' : ''} onChange={onChangeCorreo} type='email' placeholder='Correo electrónico' required />
            <input className='input' id={error === 'Contraseña incorrecta' ? 'errorCorreo' : ''} onChange={onChangeContraseña} type='password' placeholder='Contraseña' required />
          </div>
          <p className='question'>¿Aún no tienes una cuenta? <Link to="/register">Registrate aquí</Link></p>

          <input className='submit' type='submit' value='Iniciar sesión' />
        </form>
      </div>
    </div>
  )
}
