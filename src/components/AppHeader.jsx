import { Link, NavLink } from 'react-router-dom'
import { useState } from 'react'
import logo from '../img/logo.png'
import { Spin as Hamburger } from 'hamburger-react'

function AppHeader() {
  const [isOpen, setOpen] = useState(false)
  const onClick = (e) => {
    setOpen(false)
  }

  return (
    <header className='main-header'>
      <div className='container'>
        <Link to='/'>
          <div className='logo'>
            <img src={logo} alt='' className='logo-img' />
            <h1>Fysihka</h1>
          </div>
        </Link>
        <nav className='main-nav'>
          <Hamburger toggled={isOpen} toggle={setOpen} />
          <ul id='nav-links' className={isOpen ? 'is-active' : ''}>
            {/* <li className='nav-item'>
              <NavLink
                onClick={onClick}
                to='/'
                className={({ isActive }) => (isActive ? ' active' : '')}
              >
                Home
              </NavLink>
            </li> */}
            <li className='nav-item'>
              <NavLink
                onClick={onClick}
                to='/study'
                className={({ isActive }) => (isActive ? ' active' : '')}
              >
                Lernen
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink
                onClick={onClick}
                to='/about'
                className={({ isActive }) => (isActive ? ' active' : '')}
              >
                Über Uns
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink
                onClick={onClick}
                to='/contact'
                className={({ isActive }) => (isActive ? ' active' : '')}
              >
                Kontakt
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default AppHeader
