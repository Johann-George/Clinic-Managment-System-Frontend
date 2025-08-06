import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import Home from './pages/Home/Home'
import { Outlet } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigation } from 'react-router-dom'

function App() {

  const navigation = useNavigation();
  return (
    <>
      <Header />
      {navigation.state === "loading"?(
        <div className="loading-container">
          <span className="loading-text">
            Loading...
          </span>
        </div>
      ):(
       <Outlet /> 
      )}
      <Footer />
    </>
  )
}

export default App
