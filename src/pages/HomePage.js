import { Link } from 'react-router-dom'

function HomePage() {
  document.title = 'Fysihka - Lerne interaktiv Physik'
  return (
    <div>
      <div className='parallax-img'>
        <div className='container parallax-container'>
          <h2>Ergibt die Physik keinen Sinn?</h2>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tenetur,
            voluptatum fugit dolorem eaque saepe recusandae totam magni illo
            aspernatur et incidunt quasi laboriosam, officiis nihil blanditiis
            vel itaque, necessitatibus fuga dolores sunt voluptas commodi
            quibusdam?
          </p>
          <Link to='/study' className='btn btn-border-pop'>
            Beginne zu lernen
          </Link>
        </div>
      </div>
    </div>
  )
}

export default HomePage
