import AccelerationSketch from '../sketches/AccelerationSketch'
import ImportantFormulas from '../components/ImportantFormulas'
import M from '../components/Maths'

function AccelerationPage() {
  document.title = 'Fysihka - Beschleunigung'
  const formulas = []
  const vel = '$$v=\\frac{\\Delta x}{\\Delta t}$$'
  const acc = '$$a=\\frac{\\Delta v}{\\Delta t}$$'
  formulas.push({ title: 'Geschwindigkeit', formula: vel })
  formulas.push({ title: 'Beschleunigung', formula: acc })
  return (
    <div className='container'>
      <p className='page-heading'>AccelerationPage</p>
      <AccelerationSketch />
      <section className='topic-description'>
        <div className='short-description'>
          <p></p>
        </div>
        <ImportantFormulas content={formulas} />
        <br />
        <div className='long-description'>
          <p>
            Eine negative Beschleunigung bedeutet nicht, dass der beschleunigte
            Körper abbremst, sondern zeigt nur die Richtung, in welche er
            beschleunigt. <M>v=10m/s</M>
          </p>
        </div>
      </section>
    </div>
  )
}

export default AccelerationPage
