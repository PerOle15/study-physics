import SineWaveSketch from '../sketches/SineWaveSketch'
import ImportantFormulas from '../components/ImportantFormulas'
import M from '../components/Maths'

function SineWavePage() {
  document.title = 'Fysihka - Sinuswellen'

  const formulas = []
  const velocity = '$$c=f\\cdot\\lambda$$'
  formulas.push({ title: 'Geschwindigkeit', formula: velocity })

  const hertz = 'Hz\\:(=\\frac{1}{s})'
  const lambda = '\\lambda'

  return (
    <div className='container'>
      <p className='page-heading'>Sinuswellen</p>
      <SineWaveSketch />
      <section className='topic-description'>
        <div className='short-description'>
          <p>
            Wellen sind in unserer Welt überall zu finden. Wir hören
            Schallwellen, sehen elektromagnetische Wellen, also Licht, und wenn
            wir einen Stein ins Wasser werfen, entstehen ebenfalls Wellen.
            <br />
            Beachte: bei Wellenlängen nahe 0 entstehen, wenn die Welle in
            einzelnen Punkten angezeigt wird, verwirrende Muster. Um diesen
            Effekt zu vermeiden, wechsle auf den Linienmodus, sodass die Welle
            als Linie angezeigt wird.
          </p>
        </div>
        <ImportantFormulas content={formulas} />
        <br />
        <div className='long-description'>
          <p>
            Da Wellen so oft in unserer Welt vorkommen (mit den oben genannten
            Beispielen wird nur ein kleiner Teil aller Phänomene angesprochen),
            ist dies ein wichtiges Konzept in der Physik, das man verstehen
            sollte. Die Eigenschaften einer Welle werden grundsätzlich von drei
            Grössen bestimmt. Die Wellenlänge <M>{lambda}</M> gibt an, wie gross
            der Abstand zwischen zwei Wellenbergen oder zwei Wellentälern ist.
            Die Frequenz <M>f</M> mit der Einheit <M>{hertz}</M> gibt an, wie
            oft sich eine gesamte Periode der Welle pro Sekunde wiederholt. Dies
            kann man sich so vorstellen, dass man beobachtet, wie eine Welle
            gegen eine Wand trifft und dabei zählt, wie oft pro Sekunde ein
            Wellenberg auf die Wand trifft.
          </p>
        </div>
      </section>
    </div>
  )
}

export default SineWavePage
