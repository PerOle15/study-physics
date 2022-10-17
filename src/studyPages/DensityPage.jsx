import L from '../components/PageLink'
import M from '../components/Maths'
import DensitySketch from '../sketches/DensitySketch'
import ImportantFormulas from '../components/ImportantFormulas'

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
            Die Dichte (genauer: Massendichte) ist in der Physik eine sehr
            wichtige Eigenschaft von Körpern mit Masse. Jeder Körper besitzt
            eine Dichte oder eine mittlere Dichte. Mit der Dichte wird
            angegeben, welche Masse ein bestimmtes Volumen eines Körpers
            besitzt.
          </p>
        </div>
        <ImportantFormulas content={formulas} />
        <br />
        <div className='long-description'>
          <p>
            Durch die Formel wird klar, was die Dichte ausmacht. Um die Dichte
            zu erhalten wird die <L to='mass'>Masse</L> des Körpers durch das
            Volumen des Körpers geteilt. Das heisst, die Dichte gibt an, welche
            Masse pro Volumen ein Körper besitzt. Die Einheit der Dichte wird
            meistens als <M>kg/m^3</M>, manchmal aber auch als <M>g/l</M> oder
            ähnlich angegeben.
            <br />
            Je grösser die Dichte eines Körpers, desto grösser ist dessen Masse
            bei gleichbleibendem Volumen und umgekehrt. Stoffe mit besonders
            hoher Dichte sind zum Beispiel Gold oder Blei. Diese werden
            umgangssprachlich als "schwer" bezeichnet. Was damit gemeint ist,
            ist nicht die tatsächliche Masse, sondern deren Verhältnis zum
            Volumen. Ein Kilogramm Federn ist exakt gleich schwer wie ein
            Kilogramm Blei. Nur wird ein Kilogramm Federn ein ganzes Auto
            ausfüllen, während ein Kilogramm Blei knapp das Volumen von einem
            Deziliter besitzt.
            <br />
            Die Dichte spielt unter anderem bei dem{' '}
            <L to='buoyancy'>Auftrieb</L> eine wichtige Rolle. Sie bestimmt, ob
            ein Gegenstand in einer Flüssigkeit schwimmt oder untergeht.
          </p>
        </div>
      </section>
    </div>
  )
}

export default DensityPage
