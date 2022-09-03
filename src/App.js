// import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AppHeader from './components/AppHeader'
import AppFooter from './components/AppFooter'
import HomePage from './pages/HomePage'
import StudyPage from './pages/StudyPage'
import ContactPage from './pages/ContactPage'
import AboutPage from './pages/AboutPage'
import ScrollToTop from './components/ScrollToTop'

import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <Router className='app'>
      <AppHeader />
      <div id='page-content'>
        <ScrollToTop>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/study/*' element={<StudyPage />} />
            <Route path='/about' element={<AboutPage />} />
            <Route path='/contact' element={<ContactPage />} />

            {/* If no page is found, show error */}
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </ScrollToTop>
      </div>
      {/* <div>{reqData}</div> */}
      <AppFooter />
    </Router>
  )
}

export default App
