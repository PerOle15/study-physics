import InclinedPlaneSketch from '../sketches/InclinedPlaneSketch.jsx'

function InclinedPlanePage() {
  document.title = 'Fysihka - Schiefe Ebene'
  return (
    <div className='container'>
      <h1 className='page-title'>Schiefe Ebene</h1>
      <InclinedPlaneSketch />
    </div>
  )
}

export default InclinedPlanePage
