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
            Pendelschwingungsdauer: <Latex>{oscillationPeriod}</Latex>
          </p>
        </div>
        <br />
        <div className='long-description'>
          <p>
            Mit einer schiefen Ebene kann man keine Energie einsparen. Was an
            Kraft gespart wird, muss in Form des Weges ergänzt werden («Goldene
            Regel der Mechanik»). Ein Körper, der auf einer schiefen Ebene
            steht, wird durch seine Gewichtskraft bergab beschleunigt. Die
            Gewichtskraft wird in zwei Teile zerlegt: die Kraft senkrecht zur
            schiefen Ebene (Normalkraft) und die Kraft parallel zur schiefen
            Ebene (Hangabtriebskraft). Wenn die Hangabtriebskraft (FH) größer
            ist als die Reibungskraft zwischen dem Körper und der schiefen
            Ebene, rutscht der Körper.
          </p>
        </div>
      </section>
    </div>
  )
}

export default PendulumPage
