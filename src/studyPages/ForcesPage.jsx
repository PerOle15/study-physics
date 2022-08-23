import ForcesSketch from '../sketches/ForcesSketch'
import ImportantFormulas from '../components/ImportantFormulas'
import M from '../components/Maths'

function DensityPage() {
  document.title = 'Fysihka - Dichte'

  const formulas = []
  const force = '$$F=m\\cdot a$$'
  formulas.push({ title: 'Gewichtskraft', formula: force })

  return (
    <div className='container'>
      <p className='page-heading'>Kräfte</p>
      <ForcesSketch />
      <section className='topic-description'>
        <div className='short-description'>
          <p></p>
        </div>
        <ImportantFormulas content={formulas} />
        <br />
        <div className='long-description'>
          <p>
            <M>F=m*a</M>
          </p>
        </div>
      </section>
    </div>
  )
}

export default DensityPage
