import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from "axios";

export const RegisterPage = () => {
  const navigator = useNavigate()

  const [nombre, setNombre] = useState()
  const [correo, setCorreo] = useState()
  const [contraseña, setContraseña] = useState()
  const [Rcontraseña, setRContraseña] = useState()

  const [data, setData] = useState()

  const onChangeNombre = e => {
    setNombre(e.target.value)
  }
  const onChangeCorreo = e => {
    setCorreo(e.target.value)
  }
  const onChangeContraseña = e => {
    setContraseña(e.target.value)
  }
  const onChangeRContraseña = e => {
    setRContraseña(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()

    if(contraseña === Rcontraseña) {
      axios.post('https://controlvigenciasbackend-szwc.onrender.com/api/usuarios', {
        nombre,
        correo,
        password: contraseña
      })
      .then(response => {
        console.log(response.data)
        setData(response.data.message)
        localStorage.setItem('registrado', response.data.message)
        if(response.data.OK) {
          navigator("/login")
        }
      })
      .catch(err => {
        console.log(err)
      })
    } else {
      setData("Las contraseñas no coinciden")
    }
   
  }
  return (
    <div className='auth-h-screen'>
      <div className='auth-container'>
        <h3>Registrarse</h3>
        <span className='message-wrong'>{data}</span>
        <form className='form-div' onSubmit={handleSubmit}>
          <div className="form">
            <input className='input' onChange={onChangeNombre} type='text' placeholder='Nombre' required />
            <input className='input' id={data === 'Ya existe este usuario' ? 'errorCorreo' : ''} onChange={onChangeCorreo} type='email' placeholder='Correo electrónico' required />
            <input className='input' id={data === 'Las contraseñas no coinciden' ? 'errorContraseña1' : ''} onChange={onChangeContraseña} type='password' minLength={8} placeholder='Contraseña' required />
            <input className='input' id={data === 'Las contraseñas no coinciden' ? 'errorContraseña2' : ''} onChange={onChangeRContraseña} type='password' minLength={8} placeholder='Confirmar contraseña' required />
          </div>
          <p className='question'>¿Ya tienes una cuenta? <Link to="/login">Inicia sesión aquí</Link></p>

          <input className='submit' type='submit' value='Registrarse' />
        </form>
      </div>
    </div>
  )
}
