import CollisionSketch from '../sketches/CollisionSketch'
import ImportantFormulas from '../components/ImportantFormulas'
import M from '../components/Maths'
import L from '../components/PageLink'

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
  const vInelastic = `$$v'=${mediumV}$$`
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

  const v1Exchange = `v_{1}'=v_{2}`
  const v2Exchange = `v_{2}'=v_{1}`
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
          </p>
        </div>
        <ImportantFormulas content={formulas} />
        <br />
        <div className='long-description'>
          <p>
            In der Physik unterscheidet man zwischen elastischen und
            unelastischen Stössen. Bei einem vollkommen elastischen Stoss
            bleiben sowohl die kinetische <L to='energy'>Energie</L> als auch
            der Impuls des Systems vor und nach der Kollision erhalten. Wenn zum
            Beispiel zwei Kugeln zusammenstoßen, bleibt fast die gesamte
            kinetische Energie erhalten (ein kleiner Teil davon wird in
            Wärmeenergie umgewandelt). Vollkommen elastische Stösse existieren
            in der realen Welt nicht.
            <br />
            Wenn bei einem Billardspiel eine Kugel genau mittig auf eine andere
            trifft, so wechseln sich deren Geschwindigkeiten. Es handelt sich
            dabei um einen fast elastischen Stoss. Da beide Kugeln genau die
            gleiche Masse besitzen, werden die Geschwindigkeiten exakt getauscht
            (<M>{v1Exchange + ', ' + v2Exchange}</M>). Ein weiteres, speziell
            anschauliches, Beispiel für diesen Fall ist das Newtonpendel.
            <br />
            Unelastische Kollisionen sind solche, bei denen die kinetische
            Energie nicht erhalten bleibt, da ein Teil der Energie in andere
            Formen wie Wärme, Schall oder sogar Verformungsenergie umgewandelt
            wird. Die Menge an kinetischer Energie, die bei einem unelastischen
            Stoß verloren geht, ist gleich der Menge an umgewandelter Energie.
            <br />
            Wenn zwei Körper vollkommen unelastisch zusammenstoßen, bleiben sie
            aneinander haften und die maximal mögliche Menge an kinetischer
            Energie wird in Verformungsenergie umgewandelt. Nach dem
            Zusammenstoss bewegen sich beide Körper mit gleicher Geschwindigkeit{' '}
            <M>v'</M> in dieselbe Richtung. Im speziellen Fall, dass beide
            Körper die gleiche Masse und Geschwindigkeit besitzen, bleiben die
            Körper nach dem Stoss stehen (<M>v'=0</M>)
          </p>
        </div>
      </section>
    </div>
  )
}

export default DensityPage
