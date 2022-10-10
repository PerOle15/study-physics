import SpringSketch from '../sketches/SpringSketch'
import ImportantFormulas from '../components/ImportantFormulas'
import M from '../components/Maths'

function DensityPage() {
  document.title = 'Fysihka - Elastische Federn'

  const formulas = []
  const force = 'F_{F}'
  const springForce = `$$${force}=D\\cdot s$$`

  formulas.push({ title: 'Federkraft', formula: springForce })

  return (
    <div className='container'>
      <p className='page-heading'>Elastische Federn</p>
      <SpringSketch />
      <section className='topic-description'>
        <div className='short-description'>
          <p>
            Mit Federn wie wir sie hier betrachten sind nicht etwa Vogelfedern
            gemeint, sondern sogenannte Schraubenfedern. Im Alltag sieht man die
            Federn selten. Sie sind meist versteckt, in etwas eingebaut.
            Beispiele dafür sind die Feder in einem Kugelschreiber, die
            Polsterung von Sesseln und Sofas oder die Feder in einem
            Kraftmesser, der im Physikunterricht verwendet wird. Federn bestehen
            aus Metall und sind Drähte, die zu einer Spirale aufgewickelt
            wurden, sodass sie bis zu einem gewissen Punkt elastisch sind.
          </p>
        </div>
        <ImportantFormulas content={formulas} />
        <br />
        <div className='long-description'>
          <p>
            Die Federkraft <M>{force}</M> beschreibt, welche Kraft die Feder
            auswirkt, wenn sie gedehnt oder zusammengedrückt wird. Die
            Verlängerung, also die zusätzliche Ausdehnung der Feder wird in der
            Formel als <M>s</M> bezeichnet. Aus der Federkonstante <M>D</M> kann
            man erfahren, welche Kraft benötigt wird, um die Feder um einen
            Meter auszudehnen. Die Einheit der Federkonstante ist <M>N/m</M>.
            Die Einheit lässt sich folgendermassen verstehen: Wenn die
            Federkonstante <M>30N/m</M> beträgt, heisst das, man muss mit einer
            Kraft von 30N ziehen, um sie um einen Meter auszudehnen. Wenn man
            nur mit einer Kraft von 15N zieht, wird die Feder also bloss um
            einen halben Meter ausgedehnt.
          </p>
        </div>
      </section>
    </div>
  )
}

export default DensityPage
