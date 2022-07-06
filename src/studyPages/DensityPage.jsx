import DensitySketch from '../sketches/DensitySketch'

function DensityPage() {
  document.title = 'Fysihka - Dichte'

  return (
    <div className='container'>
      <p className='page-heading'>Dichte</p>
      <DensitySketch />
    </div>
  )
}

export default DensityPage
