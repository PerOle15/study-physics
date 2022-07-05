import InclinedPlaneSketch from '../sketches/InclinedPlaneSketch'

function InclinedPlanePage() {
  document.title = 'Fysihka - Schiefe Ebene'
  return (
    <div className='container'>
      <p className='page-heading'>Schiefe Ebene</p>
      <InclinedPlaneSketch />
    </div>
  )
}

export default InclinedPlanePage
