import AppHeader from './components/AppHeader'
import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AppFooter from './components/AppFooter'

function App() {
  return (
    <Router className='App'>
      <AppHeader />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/study' element={<>Study</>} />
        <Route path='/membership' element={<>Membership</>} />
        <Route path='/about' element={<>About</>} />
        <Route path='/contact' element={<>Contact</>} />
      </Routes>
      <AppFooter />
    </Router>
  )
}

export default App
