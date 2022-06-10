import { Routes, Route } from 'react-router-dom'

import MainStudyPage from '../components/MainStudyPage'
import SineWavePage from '../studyPages/SineWavePage'
import InclinedPlanePage from '../studyPages/InclinedPlanePage'

function StudyPage() {
  return (
    <Routes>
      <Route path='/' element={<MainStudyPage />} />
      <Route path='inclined-plane' element={<InclinedPlanePage />} />
      <Route path='/sine-wave' element={<SineWavePage />} />
    </Routes>
  )
}

export default StudyPage
