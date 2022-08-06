import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './Components/Layout/Layout'
import useAuthContext from './Hooks/useAuthContext'
import AuthPage from './Pages/authPage/AuthPage'
import Home from './Pages/Home/Home'
import loading from './assets/loading.gif'

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
      {
        !authIsReady && <img src={loading} style={{height:"20%"}} />
      }
    </div>
  )
}

export default App
