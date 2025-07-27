import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import Home from './pages/Home/Home'
import { Outlet } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default App
