import { Link } from 'react-router-dom'
import { BsArrowRight } from 'react-icons/bs'

function NotFoundPage() {
  return (
    <div className='container'>
      <p className='page-heading'>Error 404: Not Found</p>
      <p>
        Es wurde keine Seite mit dem Namen "{window.location.pathname}"
        gefunden.
        <br />
        <Link to='/'>
          <BsArrowRight /> Hier geht es zurück zur Homepage.
        </Link>
      </p>
    </div>
  )
}

export default NotFoundPage
