import React, { useEffect, useRef, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

import '../../styles/PemexCarmen/EditarPemexCarmen.css'

export const EditarPemexDosBocasPage = () => {
  const {id} = useParams()

  const [data, setData] = useState([])

  const [nombre, setNombre] = useState()
  const [puesto, setPuesto] = useState()
  const [nss, setNss] = useState()
  const [tipo_sangre, setTipo_sangre] = useState()
  const [vigencia, setVigencia] = useState()
  const [id_pase, setId_pase] = useState()

  const nombreRef = useRef('')
  const puestoRef = useRef('')
  const nssRef = useRef('')
  const tipo_sangreRef = useRef('')
  const vigenciaRef = useRef('')
  const id_paseRef = useRef('')

  useEffect(() => {
    setNombre(nombreRef.current.value)
    setPuesto(puestoRef.current.value)
    setNss(nssRef.current.value)
    setTipo_sangre(tipo_sangreRef.current.value)
    setVigencia(vigenciaRef.current.value)
    setId_pase(id_paseRef.current.value)
  })

  const [error, setError] = useState()

  useEffect(() => {
    axios.get(`https://controlvigenciasbackend-szwc.onrender.com/api/operadoresD_id/${id}`, { withCredentials: true })
    .then(response => {
      setData(response.data[0])
      setPuesto(response.data[0].puesto)
      setTipo_sangre(response.data[0].tipo_sangre)

      const [dd, mm, yyyy] = response.data[0].vigencia.split('/')
      setVigencia(`${yyyy}-${mm}-${dd}`)
    })
    .catch(error => console.log(error))
  }, [])
  
  const navigator = useNavigate()

  const handleSubmit = e => {
    e.preventDefault()

    axios.put(`https://controlvigenciasbackend-szwc.onrender.com/api/operadoresD/${data.id}`, {
      nombre,
      puesto,
      nss,
      tipo_sangre,
      vigencia,
      id_pase
    }, { withCredentials: true })
    .then(() => navigator('/pemex-dosbocas'))
    .catch(err => setError(err.response.data))
  }

  return (
    <div className='editar-container'>
      <div className='formulario'>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="nombre" className='form-label'>Nombre</label>
              <input ref={nombreRef} onChange={e => setNombre(e.target.value)} defaultValue={data.nombre} type="text" id='nombre' className='form-control' placeholder='Ej. John Doe' required/>
            </div>

            <div className="col-md-6 mb-3">
              <label htmlFor="puesto" className="form-label">Puesto</label>
              <select ref={puestoRef} onChange={e => setPuesto(e.target.value)} value={puesto} className='form-select' id='puesto' required>
                <option value="">Selecciona el puesto</option>
                <option value='operador'>Operador</option>
                <option value='maniobrista'>Maniobrista</option>
              </select>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="nss" className='form-label'>NSS</label>
              <input ref={nssRef} onChange={e => setNss(e.target.value)} defaultValue={data.nss} type="number" id='nss' className='form-control' required/>
            </div>

            <div className="col-md-6 mb-3">
              <label htmlFor="tipo_sangre" className="form-label">Tipo de sangre</label>
              <select ref={tipo_sangreRef} onChange={e => setTipo_sangre(e.target.value)} value={tipo_sangre} className='form-select' id='tipo_sangre' required>
                <option value="">Selecciona el tipo de sangre</option>
                <option value='A+'>A+</option>
                <option value='A-'>A-</option>
                <option value='B+'>B+</option>
                <option value='B-'>B-</option>
                <option value='AB+'>AB+</option>
                <option value='AB-'>AB-</option>
                <option value='O+'>O+</option>
                <option value='O-'>O-</option>
              </select>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="vigencia" className='form-label'>Vigencia</label>
              <input ref={vigenciaRef} onChange={e => setVigencia(e.target.value)} defaultValue={vigencia} type="date" id='vigencia' className='form-control' required/>
            </div>

            <div className="col-md-6 mb-3">
              <label htmlFor="id_pase" className='form-label'>Id de pase</label>
              <input ref={id_paseRef} onChange={e => setId_pase(e.target.value)} defaultValue={data.id_pase} type="text" id='id_pase' className='form-control' required/>
            </div>
          </div>

          <p style={{color: "red"}}>{error}</p>

          <input type="submit" value='Actualizar' className='actualizar-btn' />

        </form>
      </div>
      <div className='datos'>
        <h1>{nombre}</h1>
        <ul className='datos-ul'>
          <li><span className='datos-span'>Puesto:</span> {puesto}</li>
          <li><span className='datos-span'>Número de seguro social:</span> {nss}</li>
          <li><span className='datos-span'>Tipo de sangre:</span> {tipo_sangre}</li>
          <li><span className='datos-span'>Vigencia:</span> {vigencia}</li>
          <li><span className='datos-span'>Id de pase:</span> {id_pase}</li>
        </ul>
      </div>
    </div>
  )
}