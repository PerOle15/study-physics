import CollisionSketch from '../sketches/CollisionSketch'
import ImportantFormulas from '../components/ImportantFormulas'
import M from '../components/Maths'

function DensityPage() {
  document.title = 'Fysihka - Stösse'

  const formulas = []
  const half = '\\frac{1}{2}'
  const momentum =
    "$$m_{1}\\cdot v_{1} + m_{2}\\cdot v_{2}=m_{1}\\cdot v_{1} ' + m_{2}\\cdot v_{2} '$$"
  const energy = `$$${half}\\cdot m_{1}\\cdot v_{1}^2 + ${half}\\cdot m_{2}\\cdot v_{2}^2=${half}\\cdot m_{1}\\cdot v_{1}'^2 + ${half}\\cdot m_{2}\\cdot v_{2}'^2$$`
  formulas.push({ title: 'Impulserhaltung', formula: momentum })
  formulas.push({ title: 'Energieerhaltung', formula: energy })

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
