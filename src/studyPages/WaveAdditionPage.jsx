import WaveAdditionSketch from '../sketches/WaveAdditionSketch'
import ImportantFormulas from '../components/ImportantFormulas'
import M from '../components/Maths'

function WaveAdditionPage() {
  document.title = 'Fysihka - Addition von Sinuswellen'

  const formulas = []
  const force = '$$F_{G}=m\\cdot g$$'
  formulas.push({ title: 'Gewichtskraft', formula: force })

  return (
    <div className='container'>
      <p className='page-heading'>Addition von Sinuswellen</p>
      <WaveAdditionSketch />
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

export default WaveAdditionPage
