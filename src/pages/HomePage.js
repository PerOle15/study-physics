import { Link } from 'react-router-dom'

function HomePage() {
  document.title = 'Fysihka - Lerne interaktiv Physik'
  return (
    <div>
      <section className='parallax-img'>
        <div className='container parallax-container'>
          <p className='section-heading'>Ergibt die Physik keinen Sinn?</p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tenetur,
            voluptatum fugit dolorem eaque saepe recusandae totam magni illo
            aspernatur et incidunt quasi laboriosam, officiis nihil blanditiis
            vel itaque, necessitatibus fuga dolores sunt voluptas commodi
            quibusdam?
          </p>
          <Link to='/study' className='btn btn-light '>
            Beginne zu lernen
          </Link>
        </div>
      </section>

      <section className='new-topics-section'>
        <p className='section-heading'>Die Neuesten Themen:</p>
        <div className='quick-links max-width'>
          <Link to='/study/sine-wave' className='new-topic'>
            <p className='card-heading secondary'>Sinuswellen</p>
            <p className='secondary'>
              Wellen kommen überall in unserer Umgebung vor, ob als Schall oder
              im Wasser. Entdecke, wie sie sich verhalten!
            </p>
          </Link>
          <Link to='/study/inclined-plane' className='new-topic'>
            <p className='card-heading secondary'>Schiefe Ebene</p>
            <p className='secondary'>
              Eine beliebte Prüfungsaufgabe ist es, welche Kraft man braucht, um
              einen Schlitten einen Berg hochzuziehen. Wie löst man dieses
              Problem?
            </p>
          </Link>
          <Link to='/study/pendulum' className='new-topic'>
            <p className='card-heading secondary'>Pendel</p>
            <p className='secondary'>
              In der alten Uhr der Grosseltern schwingt immer ein Pendel hin und
              her. Es schwingt immer gleich lange, wie du vielleicht schon
              bemerkt hast.
            </p>
          </Link>
        </div>
      </section>
    </div>
  )
}

export default HomePage
