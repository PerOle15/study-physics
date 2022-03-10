import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AppHeader from './components/AppHeader'
import AppFooter from './components/AppFooter'
import HomePage from './pages/HomePage'
import StudyPage from './pages/StudyPage'

function App() {
  return (
    <Router className='app'>
      <AppHeader />
      <div id='page-content'>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/study' element={<StudyPage />} />
          <Route path='/membership' element={<>Membership</>} />
          <Route path='/about' element={<>About</>} />
          <Route path='/contact' element={<>Contact</>} />
        </Routes>
      </div>
      <AppFooter />
    </Router>
  )
}

export default App
