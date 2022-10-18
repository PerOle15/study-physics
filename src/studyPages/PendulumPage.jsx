import PendulumSketch from '../sketches/PendulumSketch'
import ImportantFormulas from '../components/ImportantFormulas'
import M from '../components/Maths'
import L from '../components/PageLink'

function PendulumPage() {
  document.title = 'Fysihka - Pendel'
  const formulas = []
  const fr = '$$F_{R}=m\\cdot g\\cdot sin(\\alpha)$$'
  formulas.push({ title: 'Rückstellkraft', formula: fr })
  const oscillationPeriod = '$$T=2\\cdot\\pi\\cdot\\sqrt{\\frac{l}{g}}$$'
  formulas.push({
    title: 'Schwingungsdauer für Anfangswinkel < 10°',
    formula: oscillationPeriod,
  })
  const pendulumLength = '$$l=\\frac{T^2\\cdot g}{4\\cdot\\pi^2}$$'
  formulas.push({
    title: 'Pendellänge (gleiche Formel, nur umgeformt)',
    formula: pendulumLength,
  })

  const force = 'F_{R}'
  return (
    <div className='container'>
      <p className='page-heading'>Pendel</p>
      <PendulumSketch />
      <section className='topic-description'>
        <div className='short-description'>
          <p>
            Wahrscheinlich kennst du Pendel bereits aus alten Standuhren, die
            hin und her Schwingen und so die Zeit angeben. Grundsätzlich
            versteht man unter einem Pendel einen Körper, der drehbar aufgehängt
            ist. Die einfachste Art eines solchen Pendels ist ein Fadenpendel,
            also ein Körper, der mithilfe eines Fadens aufgehängt ist.
          </p>
        </div>
        <ImportantFormulas content={formulas} />
        <br />
        <div className='long-description'>
          <p>
            In der Animation oben wird das Pendel vereinfacht dargestellt. Es
            handelt sich dabei um ein völlig starres Pendel, das ohne
            Luftwiderstand und Reibung schwingt. Ausserdem gilt die Berechnung
            der Schwingungsdauer nur annähernd und nur für maximale
            Auslenkungswinkel &lt; 10°. Je grösser der Auslenkungswinkel des
            Pendels, desto ungenauer wird die Berechnung der Schwingungsdauer.
            Die exakte Berechnung der Schwingungsdauer eines Pendels ist viel
            komplexer.
            <br />
            Als Schwingungsdauer wird die Zeit bezeichnet, in der das Pendel
            eine gesamte Schwingung, also einmal hin und her, durchläuft. In der
            Formel steht <M>T</M> für die Schwingungsdauer, <M>l</M> für die
            Länge des Pendels und <M>g</M> für den Ortsfaktor, also die
            Gravitationsstärke. Um die Länge des Pendels bei gegebener
            Schwingungsdauer herauszufinden, muss man den Term lediglich nach{' '}
            <M>l</M> auflösen. Wenn wir nun eine Pendeluhr bauen wollen, die
            jede Sekunde einmal tickt, das heisst für eine Hin- und Herbewegung
            braucht es 2 Sekunden <M>(T=2s)</M>, können wir dafür die benötigte
            Pendellänge berechnen. Man kommt auf eine Länge von ca. 99.4cm.
            <br />
            Die treibende Kraft für die Bewegung des Pendels ist die
            Rückstellkraft <M>{force}</M>. Sie ist der Teil der{' '}
            <L to='mass'>Gewichtskraft</L>, der senkrecht zur Pendelschnur
            wirkt.
          </p>
        </div>
      </section>
    </div>
  )
}

export default PendulumPage
