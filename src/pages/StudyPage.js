import { Routes, Route } from 'react-router-dom'

import MainStudyPage from '../components/MainStudyPage'
import DensityPage from '../studyPages/DensityPage'
import SineWavePage from '../studyPages/SineWavePage'
import InclinedPlanePage from '../studyPages/InclinedPlanePage'
import PendulumPage from '../studyPages/PendulumPage'
import AccelerationPage from '../studyPages/AccelerationPage'
import BuoyancyPage from '../studyPages/BuoyancyPage'
import PotentialEnergyPage from '../studyPages/PotentialEnergyPage'

function StudyPage() {
  document.title = 'Fysihka - Lerne interaktiv Physik'
  return (
    <Routes>
      <Route path='/' element={<MainStudyPage />} />
      <Route path='/density' element={<DensityPage />} />
      <Route path='/inclined-plane' element={<InclinedPlanePage />} />
      <Route path='/sine-wave' element={<SineWavePage />} />
      <Route path='/pendulum' element={<PendulumPage />} />
      <Route path='/acceleration' element={<AccelerationPage />} />
      <Route path='/buoyancy' element={<BuoyancyPage />} />
      <Route path='/potential-energy' element={<PotentialEnergyPage />} />
    </Routes>
  )
}

export default StudyPage
