import InclinedPlaneSketch from '../sketches/InclinedPlaneSketch'
import ImportantFormulas from '../components/ImportantFormulas'
import M from '../components/Maths'
import L from '../components/PageLink'

function InclinedPlanePage() {
  document.title = 'Fysihka - Schiefe Ebene'

  const formulas = []
  const weightFormula = '$$F_{G}=m\\cdot g$$'
  formulas.push({ title: 'Gewichtskraft', formula: weightFormula })
  const staticFrictionFormula = '$$F_{HR}=\\mu_{H}\\cdot F_{N}$$'
  formulas.push({ title: 'Haftreibungskraft', formula: staticFrictionFormula })
  const slidingFrictionFormula = '$$F_{GR}=\\mu_{G}\\cdot F_{N}$$'
  formulas.push({
    title: 'Gleitreibungskraft',
    formula: slidingFrictionFormula,
  })
  const maxFrictionFomula = '$$F_{H}=F_{R,max}=sin(\\alpha) \\cdot F_{G}$$'
  formulas.push({
    title: 'Hangabtriebskraft / Maximal mögliche Reibungskraft',
    formula: maxFrictionFomula,
  })
  const resForceFormula = '$$F_{res}=F_{H}-F_{R}$$'
  formulas.push({
    title: 'Resultierende Kraft',
    formula: resForceFormula,
  })

  const fh = 'F_{H}'
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
            einer Fläche bewegt wird, die geneigt zur Horizontalen ist. Das
            Objekt kann so mit einer kleineren Kraft bewegt werden.
          </p>
        </div>
        <div className='important-formulas'>
          <ImportantFormulas content={formulas} />
        </div>
        <br />
        <div className='long-description'>
          <p>
            Mit einer schiefen Ebene kann man jedoch keine Energie einsparen.
            Was an Kraft gespart wird, muss in Form des Weges ergänzt werden
            («Goldene Regel der Mechanik», <M>W=F\cdot s</M>). Ein Körper, der
            auf einer schiefen Ebene steht, wird durch seine Gewichtskraft
            bergab beschleunigt. Die Gewichtskraft wird in zwei Teile zerlegt:
            die Kraft senkrecht zur schiefen Ebene (wirkt entgegengesetzt zur
            Normalkraft) und die Kraft parallel zur schiefen Ebene
            (Hangabtriebskraft). Wenn die Hangabtriebskraft <M>{fh}</M> größer
            ist als die Reibungskraft zwischen dem Körper und der schiefen
            Ebene, rutscht der Körper den Hang hinunter. Ist die Reibungskraft
            gleich gross wie die Hangabtriebskraft, bewegt sich der Körper
            nicht. Die Reibungskraft kann nur gleich gross oder kleiner als die
            Hangabtriebskraft sein. Wäre sie grösser, würde sich das Objekt auf
            der schiefen Ebene bergauf bewegen.
            <br />
            Ist der Winkel gross oder die Reibung klein, beginnt der Körper zu
            rutschen, er wird durch die Hangabtriebskraft{' '}
            <L to='acceleration'>beschleunigt</L>. Bevor jedoch ein Körper
            anfange zu rutschen kann, muss zuerst die Haftreibung überwunden
            werden. Dieses Phänomen kennt jeder aus dem Alltag. Am meisten ist
            der Effekt bei schweren Objekten bemerkbar. Versucht man
            beispielsweise einen Tisch zu verschieben, braucht es erst eine
            Anfangskraft, um den Tisch in Bewegung zu bringen. Wenn der Tisch
            jedoch schon in Bewegung ist, ist die benötigte Kraft, um ihn weiter
            zu schieben, geringer. Bei bewegten Objekten wirkt nicht die Haft-,
            sondern die Gleitreibungskraft.
          </p>
        </div>
      </section>
    </div>
  )
}

export default InclinedPlanePage
