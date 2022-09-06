import InclinedPlaneSketch from '../sketches/InclinedPlaneSketch'
import ImportantFormulas from '../components/ImportantFormulas'

function InclinedPlanePage() {
  document.title = 'Fysihka - Schiefe Ebene'

  const formulas = []
  const frictionFomula = '$$F_{R}=sin(\\alpha) \\cdot F_{G}$$'
  formulas.push({
    title: 'Reibungskraft bei stehendem Körper',
    formula: frictionFomula,
  })
  const resForceFormula = '$$F_{res}=sin(\\alpha )\\cdot F_{G}-F_{R}$$'
  formulas.push({
    title: 'Resultierende Kraft bei bewegendem Körper',
    formula: resForceFormula,
  })
  return (
    <div className='container'>
      <p className='page-heading'>Schiefe Ebene</p>
      <InclinedPlaneSketch />
      <section className='topic-description'>
        <div className='short-description'>
          <p>
            Eine schiefe Ebene ist eine einfache Maschine, die das Heben oder
            Bewegen von Gegenständen erleichtert. Der Grundgedanke einer
            schiefen Ebene besteht darin, dass das zu bewegende Objekt entlang
            einer Fläche bewegt wird, die nicht gerade nach oben, sondern schräg
            ist. Diese schräge Fläche kann das Bewegen des Objekts erleichtern,
            weil man die Schwerkraft zu seinem Vorteil nutzt.
          </p>
        </div>
        <div className='important-formulas'>
          <p className='section-title'>
            Die wichtigsten Formeln auf einen Blick:
          </p>
          <ImportantFormulas content={formulas} />
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

export default InclinedPlanePage
