import BuoyancySketch from '../sketches/BuoyancySketch'
import ImportantFormulas from '../components/ImportantFormulas'
import M from '../components/Maths'

function BuoyancyPage() {
  document.title = 'Fysihka - Auftrieb'
  const formulas = []
  const buoyancyForce = '$$F_{A}=\\rho_{Fl}\\cdot V_{K,ein}\\cdot g$$'
  const ratio = '$$\\frac{V_{K,ein}}{V_{K,ges}}=\\frac{\\rho_{K}}{\\rho_{Fl}}$$'
  formulas.push({ title: 'Auftriebskraft', formula: buoyancyForce })
  formulas.push({
    title: 'Verhältnis Eingetauchtes Volumen zu Gesamtvolumen',
    formula: ratio,
  })
  return (
    <div className='container'>
      <p className='page-heading'>Auftrieb</p>
      <BuoyancySketch />
      <section className='topic-description'>
        <div className='short-description'>
          <p>
            Der Auftrieb ist uns allen, wenn auch vielleicht nur unterbewusst,
            aus dem Alltag bekannt. Es ist die Kraft, die Schiffe über Wasser
            hält und Heliumballone fliegen lässt. Der Auftrieb ist auch der
            Grund dafür, dass wir uns im Wasser leichter fühlen.
            <br />
            In der Animation wird der Fokus auf den Auftrieb in einer
            Flüssigkeit gelegt, die Prinzipien gelten jedoch genauso für jedes
            Gas.
          </p>
        </div>
        <ImportantFormulas content={formulas} />
        <br />
        <div className='long-description'>
          <p></p>
        </div>
      </section>
    </div>
  )
}

export default BuoyancyPage
