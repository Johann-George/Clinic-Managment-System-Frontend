import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from 'react-router-dom'
import Login from './pages/auth/Login.jsx'
import Registration from './pages/auth/Registration.jsx'
import Home from './pages/Home/Home.jsx'
import ErrorPage from './pages/error/ErrorPage.jsx'
import DoctorDashboard from './pages/Doctor/DoctorDashboard.jsx'

const routeDefinitions = createRoutesFromElements(
  <Route path='/' element={<App/>} errorElement={<ErrorPage/>}>
    <Route index element={<Home/>}/>
    <Route path="/home" element={<Home/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/register" element={<Registration/>}/>
    <Route path="/doctor" element={<DoctorDashboard/>}/>
  </Route>
);

const appRouter = createBrowserRouter(routeDefinitions);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={appRouter} />
  </StrictMode>,
)
