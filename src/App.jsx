import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './Components/Layout/Layout'
import useAuthContext from './Hooks/useAuthContext'
import AuthPage from './Pages/authPage/AuthPage'
import Home from './Pages/Home/Home'

function App() {
  const {authIsReady} = useAuthContext();
  return (
    <div className="App">
      {
        authIsReady && 
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Layout><Home/></Layout>}/>
            <Route path='/authpage' element={<Layout><AuthPage/></Layout>}/>
          </Routes>
        </BrowserRouter>
      }
    </div>
  )
}

export default App
