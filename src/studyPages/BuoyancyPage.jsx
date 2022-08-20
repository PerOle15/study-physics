import BuoyancySketch from '../sketches/BuoyancySketch'
import ImportantFormulas from '../components/ImportantFormulas'
import M from '../components/Maths'

function BuoyancyPage() {
  document.title = 'Fysihka - Auftrieb'
  const densityLiquid = '\\rho_{Fl}'
  const densityBody = '\\rho_{K}'
  const bForce = 'F_{A}'
  const volIn = 'V_{K,ein}'
  const volTotal = 'V_{K,ges}'
  const formulas = []
  const buoyancyForce = `$$${bForce}=${densityLiquid}\\cdot ${volIn}\\cdot g$$`
  const ratio = `$$\\frac{${volIn}}{${volTotal}}=\\frac{${densityBody}}{${densityLiquid}}$$`
  formulas.push({ title: 'Auftriebskraft', formula: buoyancyForce })
  formulas.push({
    title: 'Verhältnis Eingetauchtes Volumen zu Gesamtvolumen',
    formula: ratio,
  })
  const volumeLiquid = `${densityLiquid}\\cdot ${volIn}`
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
          <p>
            Die Auftriebskraft entspricht der Dichte der Flüssigkeit (
            <M>{densityLiquid}</M>) multipliziert mit dem eingetauchten Volumen
            des Körpers <M>{volIn}</M> und dem Ortsfaktor <M>g</M>. Was man hier
            berechnet ist die gleiche Kraft wie die Gewichtskraft der vom
            eingetauchten Körper verdrängten Flüssigkeit. Das Volumen des
            eingetauchten Teils des Körpers ist gleich dem Volumen der
            verdrängten Flüssigkeit, also ergibt <M>{volumeLiquid}</M> die Masse{' '}
            <M>m</M> der verdrängten Flüssigkeit. Das Prinzip der Auftriebskraft
            ist folgendermassen zu verstehen. Wenn ein Körper in eine
            Flüssigkeit - oder in ein Gas - eingetaucht wird, will die
            Flüssigkeit züruck an diesen Platz, wo sich jetzt der Körper
            befindet. Die Flüssigkeit drückt also genau mit der Schwerkraft, die
            die verdrängte Flüssigkeit bewirkt, auf das Objekt. Ohne Schwerkraft
            gäbe es also keinen Auftrieb. Wird beispielsweise ein Wasserball im
            All, fern von allen Planeten und Sternen, in Wasser getaucht, so
            gibt es diesen Effekt nicht, der Ball wird nicht aus dem Wasser
            herausgedrückt.
            <br />
            Die zweite Formel gibt an, welcher Teil eines Körpers in eine
            Flüssigkeit eingtaucht und welcher herausschaut, sobald der Körper
            sich nicht mehr bewegt. Nehmen wir an, wir tauchen einen Gegenstand
            mit einer Dichte von 750kg/m<sup>3</sup> in Wasser, mit ungefähr
            1000kg/m<sup>3</sup>. Dann ist das Verhältnis aus Dichte des
            Gegenstands und Dichte des Wassers 0.75. Die Dichte des Gegenstands
            beträgt also 75% der Dichte des Wassers. Daraus lässt sich
            schliessen, dass 75% des Körpers eingetaucht sind, wenn er ins
            Wasser gelegt wird. Mit diesem einfachen Prinzip lässt sich auch
            feststellen, dass bei gleicher Dichte des eingetauchten Körpers und
            der Flüssigkeit (<M>{densityBody + '=' + densityLiquid}</M>) der
            Körper in der Flüssigkeit schweben wird. Ausserdem wird jeder
            Körper, dessen Dichte grösser ist als die der Flüssigkeit,
            untergehen.
          </p>
        </div>
      </section>
    </div>
  )
}

export default BuoyancyPage
