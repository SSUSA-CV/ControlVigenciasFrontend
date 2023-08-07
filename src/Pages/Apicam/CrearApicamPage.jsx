import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import '../../styles/PemexCarmen/CrearPemexCarmen.css'

export const CrearApicamPage = () => {
  const [NoEconomico, setNoEconomico] = useState()
  const [placas, setplacas] = useState()
  const [NoSerie, setNoSerie] = useState()
  const [poliza, setpoliza] = useState()
  const [vigencia, setVigencia] = useState()

  const [error, setError] = useState()

  const navigator = useNavigate()

  const handleSubmit = e => {
    e.preventDefault()

    axios.post('https://controlvigenciasbackend-szwc.onrender.com/api/unidades', {
      numero_economico: NoEconomico,
      placas,
      numero_serie: NoSerie,
      poliza,
      vigencia,
    }, { withCredentials: true })
    .then(() => navigator('/apicam'))
    .catch(error => setError(error.response.data))
  }

  return (
    <div>
      <h1 className='añadir-title'>Añadir registro</h1>

      <form className='form-añadir'>
        <div className="form-container">
          <div className="row">

            <div className="col-md-4 mb-3">
              <label htmlFor="NoEconomico" className="form-label">No. Económico</label>
              <input onChange={e => setNoEconomico(e.target.value)} type="text" className="form-control" id="NoEconomico" placeholder="Ej. TP-01" />
            </div>

            <div className='col-md-4 mb-3'>
              <label htmlFor="placas" className='form-label'>Placas</label>
              <input onChange={e => setplacas(e.target.value)} type="text" className="form-control" id="placas" placeholder="Ej. 34IA34" />
            </div>

            <div className="col-md-4 mb-3">
              <label htmlFor="NoSerie" className="form-label">No. Serie</label>
              <input onChange={e => setNoSerie(e.target.value)} type="text" className="form-control" id="NoSerie" required/>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="poliza" className="form-label">Póliza</label>
              <input onChange={e => setpoliza(e.target.value)} type="number" className="form-control" id="poliza" required/>
            </div>

            <div className="col-md-6 mb-3">
              <label htmlFor="vigencia" className="form-label">Vigencia</label>
              <input onChange={e => setVigencia(e.target.value)} type="date" className="form-control" id="vigencia" required/>
            </div>
          </div>

          <p style={{color: "red"}}>{error}</p>

          <input onClick={handleSubmit} type="submit" className='añadir-btn' value='Añadir'/>
        </div>
      </form>
    </div>
  )
}
