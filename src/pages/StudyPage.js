import { Outlet } from 'react-router-dom'

function StudyPage() {
  document.title = 'Fysihka - Lerne interaktiv Physik'
  return <Outlet />
}

export default StudyPage
