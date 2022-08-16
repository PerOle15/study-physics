import PendulumSketch from '../sketches/PendulumSketch'
import Latex from 'react-latex'

function PendulumPage() {
  const oscillationPeriod = '$$T=2\\pi\\sqrt{\\frac{l}{g}} $$'
  return (
    <div className='container'>
      <p className='page-heading'>Pendel</p>
      <PendulumSketch />
      <section className='topic-description'>
        <div className='short-description'>
          <p>
            Ein Pendel ist eines der einfachsten physikalischen Objekte.
            Grundsätzlich versteht man unter einem Pendel einen Körper, der
            drehbar aufgehängt ist. Die einfachste Art eines solchen Pendels ist
            ein Fadenpendel, also ein Körper, der mithilfe eines Fadens
            aufgehängt ist. Die Einfachheit eines Pendels kommt daher, dass
            dessen Schwingungsdauer nur von der Länge der Schnur und der
            Gravitation abhängt.
          </p>
        </div>
        <div className='important-formulas'>
          <p className='section-title'>
            Die wichtigsten Formeln auf einen Blick:
          </p>
          <p>
            Schwingungsdauer: <Latex>{oscillationPeriod}</Latex>
          </p>
        </div>
        <br />
        <div className='long-description'>
          <p>
            In der Animation oben wird das Pendel vereinfacht dargestellt. Es
            handelt sich dabei um ein völlig starres Pendel, das ohne
            Luftwiderstand schwingt.
            <br />
            Wenn man von diesen Bedingungen ausgeht, lässt sich die
            Schwingungsdauer mit einer einfachen Formel berechnen. Als
            Schwingungsdauer wird die Zeit bezeichnet, in der das Pendel eine
            gesamte Schwingung, also einmal hin und her, durchläuft. In der
            Formel steht <span className='math'>T</span> für die
            Schwingungsdauer, <span className='math'>l</span> für die Länge des
            Pendels und <span className='math'>g</span> für den Ortsfaktor, also
            die Gravitation.
          </p>
        </div>
      </section>
    </div>
  )
}

export default PendulumPage
