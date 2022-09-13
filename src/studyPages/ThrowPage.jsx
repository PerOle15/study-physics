import ThrowSketch from '../sketches/ThrowSketch'
import ImportantFormulas from '../components/ImportantFormulas'
import M from '../components/Maths'

function DensityPage() {
  document.title = 'Fysihka - Schiefer Wurf'

  const formulas = []
  const force = '$$F_{G}=m\\cdot g$$'
  formulas.push({ title: 'Gewichtskraft', formula: force })

  return (
    <div className='container'>
      <p className='page-heading'>Schiefer Wurf</p>
      <ThrowSketch />
      <section className='topic-description'>
        <div className='short-description'>
          <p></p>
        </div>
        <ImportantFormulas content={formulas} />
        <br />
        <div className='long-description'>
          <p>
            <M>F=m\\cdot g</M>
          </p>
        </div>
      </section>
    </div>
  )
}

export default DensityPage
