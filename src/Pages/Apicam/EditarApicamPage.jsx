import React, { useEffect, useRef, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

import '../../styles/PemexCarmen/EditarPemexCarmen.css'

export const EditarApicamPage = () => {
  const {id} = useParams()

  const [data, setData] = useState([])

  const [NoEconomico, setNoEconomico] = useState()
  const [Placas, setPlacas] = useState()
  const [NoSerie, setNoSerie] = useState()
  const [Poliza, setPoliza] = useState()
  const [vigencia, setVigencia] = useState()

  const NoEconomicoRef = useRef('')
  const PlacasRef = useRef('')
  const NoSerieRef = useRef('')
  const PolizaRef = useRef('')
  const vigenciaRef = useRef('')

  useEffect(() => {
    setNoEconomico(NoEconomicoRef.current.value)
    setPlacas(PlacasRef.current.value)
    setNoSerie(NoSerieRef.current.value)
    setPoliza(PolizaRef.current.value)
    setVigencia(vigenciaRef.current.value)
  })

  const [error, setError] = useState()

  useEffect(() => {
    axios.get(`https://controlvigenciasbackend-szwc.onrender.com/api/unidades_id/${id}`, { withCredentials: true })
    .then(response => {
      setData(response.data[0])
      /*setPlacas(response.data[0].Placas)
      setPoliza(response.data[0].Poliza)*/

      const [dd, mm, yyyy] = response.data[0].vigencia.split('/')
      setVigencia(`${yyyy}-${mm}-${dd}`)
    })
    .catch(error => console.log(error))
  }, [])
  
  const navigator = useNavigate()

  const handleSubmit = e => {
    e.preventDefault()

    axios.put(`https://controlvigenciasbackend-szwc.onrender.com/api/unidades/${data.id}`, {
      numero_economico: NoEconomico,
      placas: Placas,
      numero_serie: NoSerie,
      poliza: Poliza,
      vigencia
    }, { withCredentials: true })
    .then(() => navigator('/apicam'))
    .catch(err => setError(err.response.data))
  }

  return (
    <div className='editar-container'>
      <div className='formulario'>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="NoEconomico" className='form-label'>No. Económico</label>
              <input ref={NoEconomicoRef} onChange={e => setNoEconomico(e.target.value)} defaultValue={data.numero_economico} type="text" id='NoEconomico' className='form-control' placeholder='Ej. TP-01' required/>
            </div>

            <div className="col-md-6 mb-3">
              <label htmlFor="Placas" className="form-label">Placas</label>
              <input ref={PlacasRef} onChange={e => setPlacas(e.target.value)} defaultValue={data.placas} type="text" id='Placas' className='form-control' placeholder='Ej. 20UH4D' required/>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="NoSerie" className='form-label'>No. Serie</label>
              <input ref={NoSerieRef} onChange={e => setNoSerie(e.target.value)} defaultValue={data.numero_serie} type="text" id='NoSerie' className='form-control' required/>
            </div>

            <div className="col-md-6 mb-3">
              <label htmlFor="Poliza" className="form-label">Póliza</label>
              <input ref={PolizaRef} onChange={e => setPoliza(e.target.value)} defaultValue={data.poliza} type="text" id='Poliza' className='form-control' required/>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="vigencia" className='form-label'>Vigencia</label>
              <input ref={vigenciaRef} onChange={e => setVigencia(e.target.value)} defaultValue={vigencia} type="date" id='vigencia' className='form-control' required/>
            </div>
          </div>

          <p style={{color: "red"}}>{error}</p>

          <input type="submit" value='Actualizar' className='actualizar-btn' />

        </form>
      </div>
      <div className='datos'>
        <h1>{NoEconomico}</h1>
        <ul className='datos-ul'>
          <li><span className='datos-span'>Placas:</span> {Placas}</li>
          <li><span className='datos-span'>Número de serie:</span> {NoSerie}</li>
          <li><span className='datos-span'>Póliza: </span> {Poliza}</li>
          <li><span className='datos-span'>Vigencia:</span> {vigencia}</li>
        </ul>
      </div>
    </div>
  )
}