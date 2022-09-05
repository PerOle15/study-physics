import DensitySketch from '../sketches/DensitySketch'
import ImportantFormulas from '../components/ImportantFormulas'
import M from '../components/Maths'

function DensityPage() {
  document.title = 'Fysihka - Dichte'

  const formulas = []
  const densityFormula = '$$\\rho =\\frac{m}{V}$$'
  formulas.push({ title: 'Gewichtskraft', formula: densityFormula })

  return (
    <div className='container'>
      <p className='page-heading'>Dichte</p>
      <DensitySketch />
      <section className='topic-description'>
        <div className='short-description'>
          <p>
            Die Dichte ist in der Physik eine sehr wichtige Eigenschaft von
            Körpern. Jeder Körper besitzt eine Dichte oder eine mittlere Dichte.
            Mit der Dichte wird angegeben, welche Masse ein bestimmtes Volumen
            eines Körpers besitzt.
          </p>
        </div>
        <ImportantFormulas content={formulas} />
        <br />
        <div className='long-description'>
          <p>
            Durch die Formel wird klar, was die Dichte ausmacht. Die Masse des
            Körpers wird durch das Volumen des Körpers geteilt. Das heisst, die
            Dichte gibt an, welche Masse pro Volumen ein Körper besitzt. Die
            Einheit der Dichte wird meistens als kg/m<sup>3</sup>, manchmal aber
            auch als g/l oder ähnlich angegeben.
            <br />
            Je grösser die Dichte eines Körpers, desto grösser ist dessen Masse
            bei gleichbleibendem Volumen.
          </p>
        </div>
      </section>
    </div>
  )
}

export default DensityPage
