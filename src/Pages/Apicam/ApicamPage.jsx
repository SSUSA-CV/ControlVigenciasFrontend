import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import '../../styles/PemexCarmen/PemexCarmen.css'

export const ApicamPage = () => {
  const navigator = useNavigate()

  const [data, setData] = useState([])
  const [idCorrecto, setIdCorrecto] = useState()
  const [NoEconomicoCorrecto, setNoEconomicoCorrecto] = useState()
  const [eliminado, setEliminado] = useState(false)
  const [buscar, setBuscar] = useState()

  const [error, setError] = useState()

  const [rol, setRol] = useState(false)

  useEffect(() => {
    axios.get('https://controlvigenciasbackend-szwc.onrender.com/api/unidades', { withCredentials: true })
    .then(response => setData(response.data))
    .catch(error => setError(error.response.data))
  }, [eliminado])

  const handleDelete = (id) => {
    axios.delete(`https://controlvigenciasbackend-szwc.onrender.com/api/unidades/${id}`, { withCredentials: true })
    .then(response => {
      console.log(response.data)
      setEliminado(() => eliminado === false ? setEliminado(true) : setEliminado(false))
      setData(prevData => prevData.filter(dato => dato.id !== id));
    })
    .catch(error => console.log(error))
  }

  const handleFiltrarProximos = () => {
    axios.get('https://controlvigenciasbackend-szwc.onrender.com/api/unidades_proximas', { withCredentials: true })
    .then(response => {
      setData(response.data)
      console.log(response.data)
    })
    .catch(error => setError(error.response.data))
  }

  const handleFiltrarNoEconomico = e => {
    e.preventDefault()

    axios.get(`https://controlvigenciasbackend-szwc.onrender.com/api/unidades/${buscar}`, { withCredentials: true })
    .then(response => setData(response.data))
    .catch(error => {
      setData([])
      setError(error.response.data)
    })
  }

  const handleFiltrarTodos = () => {
    axios.get('https://controlvigenciasbackend-szwc.onrender.com/api/unidades', { withCredentials: true })
    .then(response => setData(response.data))
    .catch(error => setError(error.response.data))
  }

  useEffect(() => {
    axios.get('https://controlvigenciasbackend-szwc.onrender.com/api/logged_data', { withCredentials: true })
    .then(response => {
      if(response.data.rol === 'admin') {
        setRol(true)
      }
    })
    .catch(error => console.log(error))
  }, [])

  return (
    <div className='container-main'>
      <h1 className='titulo'>PASES APICAM</h1>
      {
        rol && <button onClick={() => navigator('/crear-apicam')} className='añadir'>Añadir registros</button>
      }

      <div className='opciones'>
        <div className='div-buscar'>
        <span className="material-symbols-outlined lupa">search</span>
          <form onSubmit={handleFiltrarNoEconomico}>
            <input onChange={e => setBuscar(e.target.value)} className='input-buscar' type="text" placeholder='Buscar' />
          </form>
        </div>

        <div className="btn-group">
          <button className="button-filtrar btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            Filtrar
          </button>
          <ul className="dropdown-menu">
            <li><button onClick={handleFiltrarTodos} className='button-dos'>Mostrar todos</button></li>
            <hr className="hr" />
            <li><button onClick={handleFiltrarProximos} className='button-dos'>Próximos a vencer</button></li>
          </ul>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr className='table-tr table-info' style={{border: 1, borderColor: 'black'}}>
              <th scope="col">id</th>
              <th scope="col">No. Económico</th>
              <th scope="col">Placas</th>
              <th scope="col">No. Serie</th>
              <th className='text-align-center' scope="col">Póliza</th>
              <th scope="col">Vigencia</th>
              <th className='text-align-center' scope="col">Días restantes</th>
              {
                rol && <th className='text-align-center' scope="col">Acciones</th>
              }
            </tr>
          </thead>
          <tbody>
            {
              data.length <= 0 ? 
                <tr><td style={{textAlign: "center"}} colSpan={9}>{error}</td></tr> 
              :
                data.map((dato, index) => (
                  <tr key={index}>
                    <th scope="row">{dato.id}</th>
                    <td>{dato.numero_economico}</td>
                    <td>{dato.placas}</td>
                    <td>{dato.numero_serie}</td>
                    <td className='text-align-center'>{dato.poliza}</td>
                    <td>{dato.vigencia}</td>
                    <td className='text-align-center'>{dato.dias_restantes}</td>
                    {
                      rol && (
                        <td className='text-align-center'>
                          <button onClick={() => navigator(`/editar-apicam/${dato.id}`)} className='accion'><span className='material-symbols-outlined editar'>edit</span></button>

                          <button onClick={() => {
                            setIdCorrecto(dato.id)
                            setNoEconomicoCorrecto(dato.numero_economico)
                            }} type="button" className="accion" data-bs-toggle="modal" data-bs-target="#eliminarOperador">
                            <span className='material-symbols-outlined borrar'>delete</span>
                          </button>
                          
                          <div className="modal fade" id="eliminarOperador" tabIndex="-1" aria-labelledby="eliminarOperadorLabel" aria-hidden="true">
                            <div className="modal-dialog">
                              <div className="modal-content">
                                <div className="modal-header">
                                  <h5 className="modal-title" id="eliminarOperadorLabel">¡Advertencia!</h5>
                                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                  ¿Quieres eliminar el registro de la unidad {NoEconomicoCorrecto}?
                                </div>
                                <div className="modal-footer">
                                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                  <button onClick={() => handleDelete(idCorrecto)} type="button" className="btn btn-danger" data-bs-dismiss="modal">Sí, eliminar</button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      )
                    }
                  </tr>
                ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}
