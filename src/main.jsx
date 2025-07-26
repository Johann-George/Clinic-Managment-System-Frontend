import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './pages/auth/Login.jsx'
import Registration from './pages/auth/Registration.jsx'

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/home",
    element: <App />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Registration />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={appRouter} />
  </StrictMode>,
)
