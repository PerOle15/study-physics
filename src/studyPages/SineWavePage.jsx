import SineWaveSketch from '../sketches/SineWaveSketch'
import ImportantFormulas from '../components/ImportantFormulas'
import M from '../components/Maths'
import L from '../components/PageLink'

function SineWavePage() {
  document.title = 'Fysihka - Sinuswellen'

  const formulas = []
  const velocity = '$$c=f\\cdot\\lambda$$'
  const frequency = '$$f=\\frac{1}{T}$$'
  const waveFunction =
    '$$f(x,t)=A\\cdot sin(\\frac{2\\cdot \\pi}{\\lambda}\\cdot x-\\omega \\cdot t)$$'
  const kreisfrequenz =
    '$$\\omega =2\\cdot \\pi \\cdot f=\\frac{2\\cdot \\pi}{T}$$'
  formulas.push({ title: 'Geschwindigkeit', formula: velocity })
  formulas.push({ title: 'Frequenz', formula: frequency })
  formulas.push({ title: 'Wellenfunktion', formula: waveFunction })
  formulas.push({ title: 'Kreisfrequenz', formula: kreisfrequenz })

  const hertz = 'Hz\\:(=\\frac{1}{s})'

  return (
    <div className='container'>
      <p className='page-heading'>Sinuswellen</p>
      <SineWaveSketch />
      <section className='topic-description'>
        <div className='short-description'>
          <p>
            Wellen sind in unserer Welt überall zu finden. Wir hören
            Schallwellen und sehen elektromagnetische Wellen, also Licht.
            Wasserwellen hingegen sind in der Regel keine harmonischen Wellen,
            können also nicht durch eine Sinusfunktion beschrieben werden. Da
            Wellen so oft in unserer Welt vorkommen (mit den oben genannten
            Beispielen wird nur ein kleiner Teil aller Phänomene angesprochen),
            ist dies ein wichtiges Konzept in der Physik, das man verstehen
            sollte.
          </p>
        </div>
        <ImportantFormulas content={formulas} />
        <br />
        <div className='long-description'>
          <p>
            Die Eigenschaften einer Welle werden grundsätzlich von drei Grössen,
            der Wellenlänge, der Frequenz und der Amplitude, bestimmt. Die
            Wellenlänge <M>\lambda</M> gibt an, wie gross der Abstand zwischen
            zwei Wellenbergen oder zwei Wellentälern ist. Die Frequenz <M>f</M>{' '}
            mit der Einheit <M>{hertz}</M> gibt an, wie oft sich eine Periode
            der Welle pro Sekunde wiederholt. Eine Periode ist die Zeit, die es
            braucht, bis sich die Welle so weit verschoben hat, dass sie wieder
            gleich aussieht wie zuvor. Die Frequenz kann man sich so vorstellen,
            dass man beobachtet, wie eine Welle gegen eine Wand trifft und dabei
            zählt, wie oft pro Sekunde ein Wellenberg auf die Wand trifft. Die
            Amplitude <M>A</M> gibt die maximale Auslenkung, also den Abstand
            von der x-Achse zu einem Wellenberg oder -tal, an.
            <br />
            Die Wellenfunktion gibt zu jeder <M>x</M>-Koordinate auf der Welle
            an, wie gross die Auslenkung <M>y</M> zu einem bestimmten Zeitpunkt
            ist. <M>\omega</M> ist die Kreisfrequenz und gibt die Veränderung
            des Winkels pro Periode an. <M>\omega \cdot t</M> gibt also die
            Verschiebung der Welle an und wird "Phase" genannt
            <br />
            Die Geschwindigkeit <M>c</M>, mit der sich eine Welle fortbewegt ist
            proportional zu deren Frequenz und zu der Wellenlänge. Je grösser
            die Frequenz, desto öfter verschiebt sich die Welle um eine gesamte
            Wellenlänge in der gleichen Zeit. Je grösser die Wellenlänge, desto
            grösser ist die Strecke, um die sich die Welle jedes mal verschiebt.
            <br />
            Wenn man auf den Punkte-Modus in der Simulation wechselt, lässt sich
            eine Eigenschaft der Welle gut erkennen. Auf der linken Seite
            befindet sich ein blauer Punkt. Wenn man diesen verfolgt, so fällt
            einem auf, dass dieser Punkt sich nur in y-Richtung bewegt. In einer
            Welle bewegen sich also in x-Richtung nicht die Teilchen, sondern
            nur die Störung, die durch die Welle verursacht wird. Die Teilchen
            bewegen sich stets an Ort und Stelle auf und ab.
            <br /> <br />
            Ein sehr interessantes Phänomen, das auftritt, wenn mehrere Wellen
            aufeinander treffen, ist deren <L to='interference'>Überlagerung</L>
            .
          </p>
        </div>
      </section>
    </div>
  )
}

export default SineWavePage
