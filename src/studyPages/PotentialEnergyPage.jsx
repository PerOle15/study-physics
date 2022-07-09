import PotentialEnergySketch from '../sketches/PotentialEnergySketch'

function DensityPage() {
  document.title = 'Fysihka - Potentielle Energie'

  return (
    <div className='container'>
      <p className='page-heading'>Potentielle Energie</p>
      <PotentialEnergySketch />
    </div>
  )
}

export default DensityPage
