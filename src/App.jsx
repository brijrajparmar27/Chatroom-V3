import { Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import Layout from './Components/Layout/Layout'
import useAuthContext from './Hooks/useAuthContext'
import AuthPage from './Pages/authPage/AuthPage'
import Home from './Pages/Home/Home'
import loading from './assets/loading.gif'
import { AnimatePresence } from 'framer-motion'

function App() {
  const { authIsReady } = useAuthContext();
  const location = useLocation();
  return (
    <div className="App">
      {
        authIsReady &&
        <AnimatePresence exitBeforeEnter>
          <Routes location={location} key={location.pathname}>
            <Route path='/' element={<Layout><Home /></Layout>} />
            <Route path='/authpage' element={<Layout><AuthPage /></Layout>} />
          </Routes>
        </AnimatePresence>

      }
      {
        !authIsReady && <img src={loading} style={{ height: "20%" }} />
      }
    </div>
  )
}

export default App
