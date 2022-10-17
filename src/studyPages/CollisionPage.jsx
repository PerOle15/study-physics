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
  const mediumV = '\\frac{m_{1}\\cdot v_{1} + m_{2}\\cdot v_{2}}{m_{1} + m_{2}}'
  const v1after = `$$v_{1}'=2\\cdot ${mediumV}-v_{1}$$`
  const v2after = `$$v_{2}'=2\\cdot ${mediumV}-v_{2}$$`
  const vInelastic = `$$v=${mediumV}$$`
  formulas.push({ title: 'Impulserhaltung', formula: momentum })
  formulas.push({ title: 'Energieerhaltung', formula: energy })
  formulas.push({
    title: 'Geschwindigkeit 1 nach elastischem Stoss',
    formula: v1after,
  })
  formulas.push({
    title: 'Geschwindigkeit 2 nach elastischem Stoss',
    formula: v2after,
  })
  formulas.push({
    title: 'Geschwindigkeit nach inelastischem Stoss',
    formula: vInelastic,
  })

  return (
    <div className='container'>
      <p className='page-heading'>Stösse</p>
      <CollisionSketch />
      <section className='topic-description'>
        <div className='short-description'>
          <p>
            Bei einem Stoss üben zwei oder mehr Körper kurzzeitig gegenseitig
            eine Kraft aufeinander aus. Die Folge davon ist die
            Geschwindigkeitsänderung aller beteiligten Körper und gegebenenfalls
            auch die Richtungsänderung.
            <br />
            In der Physik unterscheidet man zwischen elastischen und
            unelastischen Stössen. Bei einem elastischen Stoss bleiben sowohl
            die kinetische Energie als auch der Impuls des Systems vor und nach
            der Kollision erhalten. Wenn zum Beispiel zwei Billardkugeln
            zusammenstoßen, prallen die Kugeln mit der gleichen kinetischen
            Energie voneinander ab, die sie beim Zusammenstoß hatten. Die
            gesamte kinetische Energie des Systems (die Summe der kinetischen
            Energien der beiden Kugeln) bleibt erhalten und der
            Energieerhaltungssatz gilt in diesem Fall.
          </p>
        </div>
        <ImportantFormulas content={formulas} />
        <br />
        <div className='long-description'>
          <p>
            Unelastische Kollisionen sind solche, bei denen die kinetische
            Energie nicht erhalten bleibt, da ein Teil der Energie in andere
            Formen wie Wärme, Schall oder sogar Verformungsenergie umgewandelt
            wird. Die Menge an kinetischer Energie, die bei einem unelastischen
            Stoß verloren geht, ist gleich der Menge an umgewandelter Energie.
            <br />
            Wenn zwei Körper vollkommen unelastisch zusammenstoßen, bleiben sie
            aneinander haften und die maximal mögliche Menge an kinetischer
            Energie wird in Verformungsenergie umgewandelt. Nach dem
            Zusammenstoss bewegen sich beide Körper mit gleicher Geschwindigkeit
            in dieselbe Richtung.
          </p>
        </div>
      </section>
    </div>
  )
}

export default DensityPage
