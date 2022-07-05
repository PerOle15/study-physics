import { Link, NavLink } from 'react-router-dom'
import { useState } from 'react'
// import ThemeChangeButton from './ThemeChangeButton'

function AppHeader() {
  const [mobileIsActive, setMobileIsActive] = useState(false)

  function handleHamburgerToggle() {
    setMobileIsActive(!mobileIsActive)
  }

  return (
    <header className='main-header'>
      <div className='container'>
        <Link to='/'>
          <h1 className='logo'>Fysihka</h1>
        </Link>
        <nav className='main-nav'>
          <button
            className={`hamburger hamburger--slider-r ${
              mobileIsActive ? 'is-active' : ''
            }`}
            type='button'
            onClick={handleHamburgerToggle}
          >
            <span className='hamburger-box'>
              <span className='hamburger-inner'></span>
            </span>
          </button>
          <ul className={mobileIsActive ? 'is-active' : ''}>
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
                Lernen
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink
                to='/membership'
                className={({ isActive }) => (isActive ? ' active' : '')}
              >
                Mitgliedschaft
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink
                to='/about'
                className={({ isActive }) => (isActive ? ' active' : '')}
              >
                Über Uns
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink
                to='/contact'
                className={({ isActive }) => (isActive ? ' active' : '')}
              >
                Kontakt
              </NavLink>
            </li>
            {/* <ThemeChangeButton /> */}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default AppHeader
