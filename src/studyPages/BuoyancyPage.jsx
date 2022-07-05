import BuoyancySketch from '../sketches/BuoyancySketch'

function BuoyancyPage() {
  document.title = 'Fysihka - Auftrieb'
  return (
    <div className='container'>
      <p className='page-heading'>Auftrieb</p>
      <BuoyancySketch />
    </div>
  )
}

export default BuoyancyPage
