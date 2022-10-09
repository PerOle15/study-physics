import WaveAdditionSketch from '../sketches/WaveAdditionSketch'
import ImportantFormulas from '../components/ImportantFormulas'
import M from '../components/Maths'

function WaveAdditionPage() {
  document.title = 'Fysihka - Interferenz von Sinuswellen'

  const formulas = []
  const waveSum = '$$f(x)=h(x)+g(x)$$'
  formulas.push({ title: 'Summe der Wellen', formula: waveSum })

  return (
    <div className='container'>
      <p className='page-heading'>Interferenz von Sinuswellen</p>
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
