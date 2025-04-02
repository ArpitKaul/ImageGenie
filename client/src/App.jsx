import React from 'react'
import {Routes , Route} from 'react-router-dom'
import Home from './Pages/Home'
import Result from './Pages/Result'
import BuyCredit from './Pages/BuyCredit'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import Login from './Components/Login'
import { AppContext } from './context/AppContext'
import { useContext } from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'


const App = () => {

  const {showLogin,theme} = useContext(AppContext)
  return (
    <div className={`app-container px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen ${theme}`}>
      <ToastContainer position='bottom-right'/>
      <Navbar/>
      {showLogin && <Login/>}
      <Routes >
        <Route path='/' element={<Home/>}/>
        <Route path='/result' element={<Result/>}/>
        <Route path='/buy' element={<BuyCredit/>}/>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
