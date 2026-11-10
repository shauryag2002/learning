import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
// import Landing from './components/Landing'
// import DashBoard from './components/Dashboard'
import Navbar from './components/Navbar'
import { lazy } from 'react'

const Landing = lazy(() => import("./components/Landing"))
const DashBoard = lazy(() => import("./components/Dashboard"))

function App() {

  return (
    <>
      <BrowserRouter >
        <Navbar />
        <Routes >
          <Route Component={Landing} path='/' />
          <Route Component={DashBoard} path='/dashboard' />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
