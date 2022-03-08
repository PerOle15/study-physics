import { NavLink } from 'react-router-dom'

function AppHeader() {
  return (
    <header className='main-header'>
      <div className='container'>
        <h1 className='logo'>Study-Physics</h1>
        <nav className='main-nav'>
          <ul>
            <li className='nav-item'>
              <NavLink
                to='/'
                className={({ isActive }) => (isActive ? ' active' : '')}
              >
                Home
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink
                to='/study'
                className={({ isActive }) => (isActive ? ' active' : '')}
              >
                Study
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink
                to='/membership'
                className={({ isActive }) => (isActive ? ' active' : '')}
              >
                Membership
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink
                to='/about'
                className={({ isActive }) => (isActive ? ' active' : '')}
              >
                About
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink
                to='/contact'
                className={({ isActive }) => (isActive ? ' active' : '')}
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default AppHeader
