import { Link } from 'react-router-dom'

function PageLink({ to, children }) {
  return (
    <Link className='page-link' to={`/study/${to}`}>
      {children}
    </Link>
  )
}

export default PageLink
