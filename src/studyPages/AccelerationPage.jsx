import AccelerationSketch from '../sketches/AccelerationSketch'

function AccelerationPage() {
  document.title = 'Fysihka - Beschleunigung'
  return (
    <div className='container'>
      <p className='page-heading'>AccelerationPage</p>
      <AccelerationSketch />
    </div>
  )
}

export default AccelerationPage
