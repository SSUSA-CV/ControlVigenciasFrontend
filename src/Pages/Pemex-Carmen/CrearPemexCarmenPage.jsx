import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import '../../styles/PemexCarmen/CrearPemexCarmen.css'

export const CrearPemexCarmenPage = () => {
  const [nombre, setNombre] = useState()
  const [puesto, setPuesto] = useState()
  const [nss, setNss] = useState()
  const [tipo_sangre, setTipo_sangre] = useState()
  const [vigencia, setVigencia] = useState()
  const [id_pase, setId_pase] = useState()

  const [error, setError] = useState()

  const navigator = useNavigate()

  const handleSubmit = e => {
    e.preventDefault()

    axios.post('https://controlvigenciasbackend-szwc.onrender.com/api/operadoresC', {
      nombre,
      puesto,
      nss,
      tipo_sangre,
      vigencia,
      id_pase
    }, { withCredentials: true })
    .then(() => navigator('/pemex-carmen'))
    .catch(error => setError(error.response.data))
  }

  return (
    <div>
      <h1 className='añadir-title'>Añadir registro</h1>

      <form className='form-añadir'>
        <div className="form-container">
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="nombre" className="form-label">Nombre</label>
              <input onChange={e => setNombre(e.target.value)} type="text" className="form-control" id="nombre" placeholder="Ej. John Doe" />
            </div>

            <div className='col-md-6 mb-3'>
              <label htmlFor="puesto" className='form-label'>Puesto</label>
              <select onChange={e => setPuesto(e.target.value)} className="form-select" id='puesto' aria-label="Default select example" required>
                <option value="">Selecciona el puesto</option>
                <option value="operador">Operador</option>
                <option value="maniobrista">Maniobrista</option>
              </select>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="nss" className="form-label">NSS</label>
              <input onChange={e => setNss(e.target.value)} type="number" className="form-control" id="nss" required/>
            </div>

            <div className="col-md-6 mb-3">
              <label htmlFor="tipo_sangre" className="form-label">Tipo de sangre</label>
              <select onChange={e => setTipo_sangre(e.target.value)} className="form-select" id='tipo_sangre' aria-label="Default select example" required>
                <option value="">Selecciona el tipo de sangre</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="A+">O+</option>
                <option value="A-">O-</option>
              </select>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="vigencia" className="form-label">Vigencia</label>
              <input onChange={e => setVigencia(e.target.value)} type="date" className="form-control" id="vigencia" required/>
            </div>

            <div className="col-md-6 mb-3">
              <label htmlFor="id_pase" className="form-label">Id de pase</label>
              <input onChange={e => setId_pase(e.target.value)} type="text" className="form-control" id="id_pase" required/>
            </div>
          </div>

          <p style={{color: "red"}}>{error}</p>

          <input onClick={handleSubmit} type="submit" className='añadir-btn' value='Añadir'/>
        </div>
      </form>
    </div>
  )
}
