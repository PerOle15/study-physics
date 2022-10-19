import ThrowSketch from '../sketches/ThrowSketch'
import ImportantFormulas from '../components/ImportantFormulas'
import M from '../components/Maths'
import L from '../components/PageLink'

function DensityPage() {
  document.title = 'Fysihka - Schiefer Wurf'

  const formulas = []
  const hv = 'v_{\\rightarrow}'
  const vv = 'v_{\\uparrow}'
  const horStartVel = '$$v_{0,\\rightarrow}=v_{0}\\cdot \\cos{(\\alpha)}$$'
  const vertStartVel = '$$v_{0,\\uparrow}=v_{0}\\cdot \\sin{(\\alpha)}$$'
  const x = '$$x(t)=v_{\\rightarrow ,0}\\cdot t$$'
  const height =
    '$$y(t)=h_{0} + v_{\\uparrow ,0}\\cdot t - \\frac{1}{2}\\cdot g \\cdot t^2$$'
  const horVel =
    '$$v_{\\rightarrow}=v_{0,\\rightarrow}=v_{0}\\cdot \\cos{(\\alpha)}$$'
  const vertVel =
    '$$v_{\\uparrow}(t)=v_{0,\\uparrow}-g\\cdot t=v_{0}\\cdot sin(\\alpha)-g\\cdot t$$'
  const maxH = '$$h=\\frac{v_{0}^2\\cdot sin(\\alpha)^2}{2\\cdot g}$$'
  const maxD = '$$d=\\frac{v_{0}^2\\cdot sin(2\\cdot \\alpha)}{g}$$'
  formulas.push({
    title: 'Horizontale Anfangsgeschwindigkeit',
    formula: horStartVel,
  })
  formulas.push({
    title: 'Vertikale Anfangsgeschwindigkeit',
    formula: vertStartVel,
  })
  formulas.push({ title: 'Wurfweite', formula: x })
  formulas.push({ title: 'Wurfhöhe', formula: height })
  formulas.push({ title: 'Horizontale Geschwindigkeit', formula: horVel })
  formulas.push({ title: 'Vertikale Geschwindigkeit', formula: vertVel })
  formulas.push({ title: 'Maximale Wurfhöhe', formula: maxH })
  formulas.push({
    title: 'Maximale Wurfweite (gilt nur für Anfangshöhe = 0)',
    formula: maxD,
  })

  return (
    <div className='container'>
      <p className='page-heading'>Schiefer Wurf</p>
      <ThrowSketch />
      <section className='topic-description'>
        <div className='short-description'>
          <p>
            Werfen ist eine der ältesten und einfachsten Formen der Bewegung,
            die durch die Schwerkraft angetrieben wird. Etwas zu werfen ist eine
            Spezialität des Menschen. Der Mensch ist das einzige Tier, das
            richtig werfen kann. Obwohl das Konzept des Schiefen Wurfes bereits
            in den antiken Schriften erwähnt wird, wurden die Berechnungen dazu
            erst im 17. Jahrhundert von Isaac Newton formuliert.
          </p>
        </div>
        <ImportantFormulas content={formulas} />
        <br />
        <div className='long-description'>
          <p>
            Der Schiefe Wurf ist eine Bewegung, bei der ein Objekt in einem
            Winkel zur Horizontalen geworfen wird. Die Geschwindigkeit und der
            Weg des Objekts hängen von der Höhe und dem Anfangswinkel ab, mit
            dem es geworfen wird.
            <br />
            Die Bewegung eines Körpers beim Schiefen Wurf unterliegt drei
            Kräften: der <L to='mass'>Schwerkraft</L>, der Luftwiderstandskraft
            und der <L to='buoyancy'>Auftriebskraft</L>. Hier vernachlässigen
            wir jedoch die Luft, also den Luftwiderstand und den Auftrieb. Die
            Schwerkraft zeigt immer in Richtung Erdmittelpunkt und wirkt auf
            alle Körper gleich.
            <br />
            Die Bewegung eines Körpers beim Schiefen Wurf ist eine Kombination
            aus vertikaler und horizontaler Bewegung. Die Veränderung der
            vertikalen Geschwindigkeit <M>{vv}</M> wird durch die Schwerkraft
            angetrieben, während die horizontale Geschwindigkeit <M>{hv}</M>{' '}
            sich nicht verändert.
            <br />
            Versucht den Ball am weitesten zu werfen. Was fällt euch auf? Bei
            einer Anfangshöhe von 0m fliegt der Ball am weitesten bei einem
            Anfangswinkel von 45°. Die Maximale Wurfdistanz wird ist am grössten
            bei einem Winkel <M>\alpha=45°</M>, da bei diesem Winkel der Sinus
            sein Maximum erreicht (siehe Formel oben). Ausserdem ist die
            Wurfweite abhängig von der Anfangsgeschwindigkeit. Je grösser die
            Anfangsgeschwindigkeit, desto weiter fliegt der Ball.
            <br />
            Wird der Ball jedoch mit einer Anfangshöhe &gt; 0 abgeworfen, muss
            der Winkel kleiner als 45° gewählt werden, um die maximale
            Wurfdistanz zu erreichen.
          </p>
        </div>
      </section>
    </div>
  )
}

export default DensityPage
