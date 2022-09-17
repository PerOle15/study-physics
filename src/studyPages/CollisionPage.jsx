import CollisionSketch from '../sketches/CollisionSketch'
import ImportantFormulas from '../components/ImportantFormulas'
import M from '../components/Maths'

function DensityPage() {
  document.title = 'Fysihka - Stösse'

  const formulas = []
  const force = '$$F_{G}=m\\cdot g$$'
  formulas.push({ title: 'Gewichtskraft', formula: force })

  return (
    <div className='container'>
      <p className='page-heading'>Stösse</p>
      <CollisionSketch />
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
