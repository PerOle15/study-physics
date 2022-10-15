import ThrowSketch from '../sketches/ThrowSketch'
import ImportantFormulas from '../components/ImportantFormulas'
import M from '../components/Maths'

function DensityPage() {
  document.title = 'Fysihka - Schiefer Wurf'

  const formulas = []
  const x = '$$x(t)=v_{\\rightarrow ,0}\\cdot t$$'
  const height =
    '$$y(t)=h_{0} + v_{\\uparrow ,0}\\cdot t - \\frac{1}{2}\\cdot g \\cdot t^2$$'
  const verticalVel = '$$v_{\\uparrow}=v\\cdot \\sin{(\\alpha)}$$'
  const horVel = '$$v_{\\rightarrow}=v\\cdot \\cos{(\\alpha)}$$'
  formulas.push({ title: 'Weite', formula: x })
  formulas.push({ title: 'Höhe', formula: height })
  formulas.push({ title: 'Vertikale Geschwindigkeit', formula: verticalVel })
  formulas.push({ title: 'Horizontale Geschwindigkeit', formula: horVel })

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
