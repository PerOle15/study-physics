import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './css/index.css'
import App from './App'

import AppHeader from './components/AppHeader'
import AppFooter from './components/AppFooter'
import HomePage from './pages/HomePage'
import ContactPage from './pages/ContactPage'
import AboutPage from './pages/AboutPage'
import StudyPage from './pages/StudyPage'
import ScrollToTop from './components/ScrollToTop'
import NotFoundPage from './pages/NotFoundPage'

/* Study Pages */
import MainStudyPage from './components/MainStudyPage'
import DensityPage from './studyPages/DensityPage'
import SineWavePage from './studyPages/SineWavePage'
import InclinedPlanePage from './studyPages/InclinedPlanePage'
import PendulumPage from './studyPages/PendulumPage'
import AccelerationPage from './studyPages/AccelerationPage'
import BuoyancyPage from './studyPages/BuoyancyPage'
import PotentialEnergyPage from './studyPages/PotentialEnergyPage'
import SpringPage from './studyPages/SpringPage'
import MassPage from './studyPages/MassPage'
import ThrowPage from './studyPages/ThrowPage'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AppHeader />
      <div id='page-content'>
        <ScrollToTop>
          <Routes>
            <Route path='/' element={<App />}>
              <Route path='/' element={<HomePage />} />
              <Route path='/about' element={<AboutPage />} />
              <Route path='/contact' element={<ContactPage />} />
              {/* Study Pages Routes */}
              <Route path='/study' element={<StudyPage />}>
                <Route path='' element={<MainStudyPage />} />
                <Route path='density' element={<DensityPage />} />
                <Route path='inclined-plane' element={<InclinedPlanePage />} />
                <Route path='sine-wave' element={<SineWavePage />} />
                <Route path='pendulum' element={<PendulumPage />} />
                <Route path='acceleration' element={<AccelerationPage />} />
                <Route path='buoyancy' element={<BuoyancyPage />} />
                <Route
                  path='potential-energy'
                  element={<PotentialEnergyPage />}
                />
                <Route path='springs' element={<SpringPage />} />
                <Route path='mass' element={<MassPage />} />
                <Route path='throw' element={<ThrowPage />} />
                <Route path='*' element={<NotFoundPage />} />
              </Route>
              {/* If no page is found, show error */}
              <Route path='*' element={<NotFoundPage />} />
            </Route>
          </Routes>
        </ScrollToTop>
      </div>
      <AppFooter />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)
