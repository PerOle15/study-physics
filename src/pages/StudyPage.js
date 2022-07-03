import { Routes, Route } from 'react-router-dom'

import MainStudyPage from '../components/MainStudyPage'
import SineWavePage from '../studyPages/SineWavePage'
import InclinedPlanePage from '../studyPages/InclinedPlanePage'
import PendulumPage from '../studyPages/PendulumPage'
import AccelerationPage from '../studyPages/AccelerationPage'

function StudyPage() {
  document.title = 'Fysihka - Lerne interaktiv Physik'
  return (
    <Routes>
      <Route path='/' element={<MainStudyPage />} />
      <Route path='inclined-plane' element={<InclinedPlanePage />} />
      <Route path='sine-wave' element={<SineWavePage />} />
      <Route path='pendulum' element={<PendulumPage />} />
      <Route path='acceleration' element={<AccelerationPage />} />
    </Routes>
  )
}

export default StudyPage
