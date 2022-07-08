import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './Components/Layout/Layout'
import AuthPage from './Pages/authPage/AuthPage'
import Home from './Pages/Home/Home'

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout><Home/></Layout>}/>
          <Route path='/authpage' element={<Layout><AuthPage/></Layout>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
