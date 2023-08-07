import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import pemexLogo from '../assets/pemexLogo.png'
import apicamLogo from '../assets/apicamLogo.png'

import axios from 'axios';

import '../styles/Inicio.css'

export const InicioPage = () => {
  const navigator = useNavigate()

  const [data, setData] = useState([])

  useEffect(() => {
    axios.get('https://controlvigenciasbackend-szwc.onrender.com/api/registros-proximos', { withCredentials: true })
    .then(response => {
      setData(response.data)
    })
    .catch(error => console.lo(error))
  }, [])

  return (
    <>
    <div className='inicio-container'>
      <div onClick={() => navigator('/pemex-carmen')} className='links-div'>
        <img className='logoPemex' src={pemexLogo} alt="pemex" />
        <h2><span className='links'>PEMEX - CARMEN</span></h2>
      </div>

      <div onClick={() => navigator('/pemex-dosbocas')} className='links-div'>
        <img className='logoPemex' src={pemexLogo} alt="pemex" />
        <h2><span className='links'>PEMEX - DOS BOCAS</span></h2>
      </div>

      <div onClick={() => navigator('/apicam')} className='links-div'>
        <img className='logoApicam' src={apicamLogo} alt="apicam" />
        <h2><span className='links'>PASES - APICAM</span></h2>
      </div>
    </div>
    <div className='proximos'>
      <h2 style={{marginTop: 20, marginBottom: 20}}>Registros próximos a vencer</h2>
      <div className='table-responsive'>
        <table className='table'>
          <thead>
            <tr className='table-warning'>
                <th>Registros</th>
                <th>vigencia</th>
                <th>Días restantes</th>
                <th>Tabla</th>
            </tr>
          </thead>
          <tbody>
            {
              data === 'No hay registros próximos a vencer' ?
              <tr>
                <td style={{textAlign: 'center'}} colSpan={4}>No hay registros próximos a vencer</td>
              </tr> :
              data.map((dato, index) => (
                <tr key={index}>
                    <td>{dato.Registros}</td>
                    <td>{dato.vigencia}</td>
                    <td>{dato.dias_restantes}</td>
                    <td>{dato.Tabla}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
    </>
  )
}
