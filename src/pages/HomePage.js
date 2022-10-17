import { Link } from 'react-router-dom'

function HomePage() {
  document.title = 'Fysihka - Lerne interaktiv Physik'
  return (
    <div>
      <section className='parallax-img'>
        <div className='container parallax-container'>
          <p className='section-heading'>Ergibt die Physik keinen Sinn?</p>
          <p>
            Unserer Erfahrung nach ist es für viele schwierig, sich unter
            physikalischen Konzepten etwas konkretes vorzustellen. Oft sind die
            Konzepte zu abstrakt oder scheinen auf den ersten Blick zu
            kompliziert. Um eine Vorstellung davon zu bekommen, wie etwas
            funktioniert, ist es oft notwendig, dass man sich selbst damit
            beschäftigt. Bei den einzelnen Themen muss man sich ansehen, wie
            jeder Teil davon funktioniert und was passiert, wenn man einzelne
            Bedingungen verändert. Genau das ist das Ziel dieser Website -
            interaktives Lernen mithilfe von Simulationen.
          </p>
          <Link to='/study' className='btn btn-light '>
            Beginne zu lernen
          </Link>
        </div>
      </section>

      <section className='new-topics-section'>
        <p className='section-heading'>Die Neuesten Themen:</p>
        <div className='quick-links max-width'>
          <Link to='/study/mass' className='new-topic'>
            <p className='card-heading secondary'>Masse und Gewichtskraft</p>
            <p className='secondary'>
              Die Masse ist grundlegend für einen Grossteil von dem, was unser
              Universum ausmacht. Die Gewichtskraft ist eine Erscheinung von
              massebehafteten Körpern, die unter Einfluss von Gravitation
              stehen.
            </p>
          </Link>
          <Link to='/study/buoyancy' className='new-topic'>
            <p className='card-heading secondary'>Auftrieb</p>
            <p className='secondary'>
              Der Grund, weshalb Schiffe schwimmen und Fische im Wasser schweben
              können ist der Auftrieb. Hier lernst du, wann etwas aufschwimmt
              und wann nicht.
            </p>
          </Link>
          <Link to='/study/interference' className='new-topic'>
            <p className='card-heading secondary'>
              Interferenz von Sinuswellen
            </p>
            <p className='secondary'>
              Die Überlagerung von Wellen ist ein sehr schönes Phänomen. Sehr
              simpel lassen sich faszinierende Muster und Bewegungen erzeugen.
              Diese Überlagerungen kommen überall in unserer Umgebung vor.
            </p>
          </Link>
        </div>
      </section>
    </div>
  )
}

export default HomePage
