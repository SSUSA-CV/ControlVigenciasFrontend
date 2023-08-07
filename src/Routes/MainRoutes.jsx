import { BrowserRouter, Routes, Route } from "react-router-dom"

import { InicioPage } from '../Pages/InicioPage'
import { LoginPage } from '../Pages/Auth/LoginPage'
import { RegisterPage } from '../Pages/Auth/RegisterPage'

import { NavBar } from '../Components/NavBar'

import { PublicRoutes } from './PublicRoutes'
import { ProtectedRoutes } from './ProtectedRoutes'
import { ProtectedRolRoutes } from './ProtectedRolRoutes'

import { PerfilPage } from '../Pages/Cuenta/PerfilPage'
import { EditarPerfilPage } from '../Pages/Cuenta/EditarPerfilPage'
import { ApicamPage } from '../Pages/Apicam/ApicamPage'
import { CrearApicamPage } from '../Pages/Apicam/CrearApicamPage'
import { EditarApicamPage } from '../Pages/Apicam/EditarApicamPage'
import { PemexCarmenPage } from '../Pages/Pemex-Carmen/PemexCarmenPage'
import { CrearPemexCarmenPage } from '../Pages/Pemex-Carmen/CrearPemexCarmenPage'
import { EditarPemexCarmenPage } from '../Pages/Pemex-Carmen/EditarPemexCarmenPage'
import { PemexDosBocasPage } from '../Pages/Pemex-DosBocas/PemexDosBocasPage'
import { CrearPemexDosBocasPage } from '../Pages/Pemex-DosBocas/CrearPemexDosBocasPage'
import { EditarPemexDosBocasPage } from '../Pages/Pemex-DosBocas/EditarPemexDosBocasPage'
import { ErrorPage } from '../Pages/ErrorPage'
import { Footer } from '../Components/Footer'

export const MainRoutes = () => {
  return (
    <BrowserRouter>

        <NavBar />

        <div className='container'>
          <Routes>
            {/*Rutas publicas*/}
            <Route element={<PublicRoutes />}>
              <Route index element={<LoginPage />} />
              <Route path='/login' element={<LoginPage />} />
              <Route path='/register' element={<RegisterPage />} />
            </Route>

            {/*Rutas protegidas*/}
            <Route element={<ProtectedRoutes />}>
              <Route path='/inicio' element={<InicioPage />} />

              <Route path='/cuenta' element={<PerfilPage />} />
              <Route path='/editar-cuenta' element={<EditarPerfilPage />} />

              <Route path='/apicam' element={<ApicamPage />} />
              <Route path='/pemex-carmen' element={<PemexCarmenPage />} />
              <Route path='/pemex-dosbocas' element={<PemexDosBocasPage />} />

              {/*Rutas protegidas por rol*/}
              <Route element={<ProtectedRolRoutes />}>
                <Route path='/crear-apicam' element={<CrearApicamPage />} />
                <Route path='/editar-apicam/:id' element={<EditarApicamPage/>} />

                <Route path='/crear-pemex-carmen' element={<CrearPemexCarmenPage />} />
                <Route path='/editar-pemex-carmen/:id' element={<EditarPemexCarmenPage />} />

                <Route path='/crear-pemex-dosbocas' element={<CrearPemexDosBocasPage/>} />
                <Route path='/editar-pemex-dosbocas/:id' element={<EditarPemexDosBocasPage />} />
              </Route>
            </Route>

            <Route path='*' element={<ErrorPage />} />
          </Routes>
        </div>

        <Footer />
    </BrowserRouter>
  )
}
