import AccelerationSketch from '../sketches/AccelerationSketch'

function AccelerationPage() {
  document.title = 'Fysihka - Beschleunigung'
  return (
    <div className='container'>
      <p className='page-heading'>AccelerationPage</p>
      <AccelerationSketch />
      <section className='topic-description'>
        <div className='short-description'>
          <p></p>
        </div>
        <br />
        <div className='long-description'>
          <p>
            Eine negative Beschleunigung bedeutet nicht, dass der beschleunigte
            Körper abbremst, sondern zeigt nur die Richtung, in welche er
            beschleunigt.
          </p>
        </div>
      </section>
    </div>
  )
}

export default AccelerationPage
