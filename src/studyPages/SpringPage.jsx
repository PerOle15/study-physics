import SpringSketch from '../sketches/SpringSketch'
import ImportantFormulas from '../components/ImportantFormulas'
import M from '../components/Maths'
import L from '../components/PageLink'

function DensityPage() {
  document.title = 'Fysihka - Elastische Federn'

  const formulas = []
  const force = 'F_{F}'
  const springForce = `$$${force}=D\\cdot s$$`
  const springEnergy = '$$E_{F}=\\frac{1}{2}\\cdot D \\cdot s^2$$'

  formulas.push({ title: 'Federkraft', formula: springForce })
  formulas.push({ title: 'Federenergie', formula: springEnergy })

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
            wurden, sodass sie sich bis zu einer gewissen Belastung elastisch
            verhalten.
          </p>
        </div>
        <ImportantFormulas content={formulas} />
        <br />
        <div className='long-description'>
          <p>
            Die Federkraft <M>{force}</M> ist die Kraft, welche benötigt wird,
            um eine Feder auszudehnen oder zusammenzudrücken. Die Verlängerung
            wird als <M>s</M> bezeichnet. Bei einer Dehnung der Feder wird{' '}
            <M>s</M> positiv und bei einer Stauchung negativ. Aus der
            Federkonstante <M>D</M> erfährt man, welche Kraft benötigt wird, um
            die Feder um eine bestimmte Länge auszudehnen. Die Einheit der
            Federkonstante ist <M>N/m</M>. Die Einheit lässt sich
            folgendermassen verstehen: Wenn die Federkonstante <M>30N/m</M>{' '}
            beträgt, heisst das, man muss mit einer Kraft von 30N an der Feder
            ziehen, um sie um einen Meter auszudehnen. Wenn man nur mit einer
            Kraft von 15N zieht, wird die Feder also bloss um einen halben Meter
            ausgedehnt.
            <br />
            Hängt man zwei Federn mit derselben Federkonstante aneinander, so
            ist die resultierende Federkonstante halb so gross wie zuvor.
            Halbiert man hingegen die Länge eine Feder, verdoppelt sich deren
            Federkonstante.
            <br />
            Die Federenergie zu kennen ist dann wichtig, wenn man eine Feder zur
            Speicherung von <L to='energy'>Energie</L> verwendet. Das Prinzip
            von Federn als Energiespeicher wird beispielsweise in aufziehbaren
            Uhren verwendet. Dort handelt es sich jedoch meist um Spiralfedern,
            nicht um die hier behandelten Schraubenfedern. Daher lassen sich die
            Berechnungen nicht einfach auf die Federn in Uhren übertragen. Mit
            der Ausdehnung von Federn wird Energie in ihnen gespeichert. Die
            Menge an gespeicherter Energie ist dabei abhängig von der
            Federkonstante und der Ausdehnung der Feder.
          </p>
        </div>
      </section>
    </div>
  )
}

export default DensityPage
