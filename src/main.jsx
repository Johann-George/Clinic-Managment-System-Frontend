import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ToastContainer, Bounce } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from 'react-router-dom'
import Login, { loginAction } from './pages/auth/Login.jsx'
import Registration from './pages/auth/Registration.jsx'
import Home from './pages/Home/Home.jsx'
import ErrorPage from './pages/error/ErrorPage.jsx'
import DoctorDashboard from './pages/Doctor/DoctorDashboard.jsx'
import PatientDashboard from './pages/Patient/PatientDashboard.jsx'
import AdminDashboard from './pages/admin/AdminDashboard.jsx'
import ReceptionistDashboard from './pages/Reception/ReceptionistDashboard.jsx'
import { patientRegister } from './pages/auth/Registration.jsx'
import { staffRegister } from './pages/admin/adminActions.js'
import { bookAppointment } from './pages/Patient/bookAppointment.js'
import { doctorDashboardAction } from './pages/Doctor/doctorFunctionality.js'
import { receptionistDashboardAction } from './pages/Reception/receptionistFunctionality.js'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'

const routeDefinitions = createRoutesFromElements(
  <Route path='/' element={<App/>} errorElement={<ErrorPage/>}>
    <Route index element={<Home/>}/>
    <Route path="/home" element={<Home/>}/>
    <Route path="/login" element={<Login/>} action={loginAction}/>
    <Route path="/register" element={<Registration/>} action={patientRegister}/>
    <Route element={<ProtectedRoute allowedRoles={["ROLE_DOCTOR"]}/>}>
      <Route path="/doctor" element={<DoctorDashboard/>} action={doctorDashboardAction}/>
    </Route>
    <Route element={<ProtectedRoute allowedRoles={["ROLE_PATIENT"]}/>}>
      <Route path="/patient" element={<PatientDashboard/>} action={bookAppointment}/>
    </Route>
    <Route element={<ProtectedRoute allowedRoles={["ROLE_ADMIN"]}/>}>
      <Route path="/admin" element={<AdminDashboard/>} action={staffRegister}/>
    </Route>
    <Route element={<ProtectedRoute allowedRoles={["ROLE_RECEPTIONIST"]}/>}>
      <Route path="/receptionist" element={<ReceptionistDashboard/>} action={receptionistDashboardAction}/>
    </Route>
  </Route>
);

const appRouter = createBrowserRouter(routeDefinitions);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={appRouter} />
    </Provider>
    <ToastContainer
      position="top-center"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      draggable
      pauseOnHover
      theme="light"
      transition={Bounce}
    />
  </StrictMode>,
)
