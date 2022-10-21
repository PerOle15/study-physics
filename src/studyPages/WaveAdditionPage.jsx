import WaveAdditionSketch from '../sketches/WaveAdditionSketch'
import ImportantFormulas from '../components/ImportantFormulas'
import M from '../components/Maths'
import L from '../components/PageLink'

function WaveAdditionPage() {
  document.title = 'Fysihka - Überlagerung von Sinuswellen'

  const formulas = []
  const waveSum = '$$f(x)=g(x)+h(x)$$'
  formulas.push({ title: 'Summe der Wellen', formula: waveSum })

  return (
    <div className='container'>
      <p className='page-heading'>Überlagerung von Sinuswellen</p>
      <WaveAdditionSketch />
      <section className='topic-description'>
        <div className='short-description'>
          <p>
            Die Interferenz von <L to='sine-wave'>Wellen</L> beschreibt die
            Veränderung der Amplitude, wenn zwei oder mehrere Wellen
            aufeinandertreffen, also bei Überlagerung von Wellen.
          </p>
        </div>
        <ImportantFormulas content={formulas} />
        <br />
        <div className='long-description'>
          <p>
            Bei der Überlagerung werden die Auslenkungen der beteiligten Wellen
            addiert, sodass eine neue Funktion, die Summe der Wellen, entsteht.
            Verstärken sich die Wellen gegenseitig, so handelt es sich um
            konstruktive Interferenz. Löschen die Wellen sich jedoch aus, so
            handelt es sich um destruktive Interferenz. Bei einer kompletten
            Auslöschung der Welle gilt <M>g(x)=-h(x)</M>.
            <br />
            Durch Überlagerung von Wellen können wichtige Phänomene in der
            Physik erklärt werden. Eines der bekanntesten Experimente, bei dem
            Interferenz vorkommt, ist das Doppelspaltexperiment. Es ist ein
            Beweis für Wellencharakter von elektromagnetischen Wellen und
            Materie.
            <br />
            Interferenz kommt auch bei anderen Wellen vor, beispielsweise bei
            Schallwellen. Die Technologie des "Active Noise Cancelling" basiert
            auf der Interferenz von Schallwellen, genauer gesagt auf
            destruktiver Interferenz. Die ankommenden Schallwellen werden über
            ein Mikrofon gemessen. Die Funktion der Schallwellen wird an der
            x-Achse gespiegelt und der neue Ton in den Kopfhörern ausgegeben.
            Bei einer guten Funktionsweise werden so die von aussen ankommenden
            Schallwellen ausgelöscht. So hört die Person, die die Kopfhörer
            trägt keine Geräusche von aussen.
            <br />
            Abgesehen von den physikalischen Eigenschaften von Wellen, haben sie
            natürlich auch eine schöne, fast künstlerische Erscheinungsart.
            Spiele ein bisschen an der Simulation herum und entdecke, welche
            Arten von Mustern damit erzeugt werden können.
          </p>
        </div>
      </section>
    </div>
  )
}

export default WaveAdditionPage
