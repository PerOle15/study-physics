import { Link, NavLink } from 'react-router-dom'
import { useState } from 'react'
import logo from '../img/logo.png'
import { Spin as Hamburger } from 'hamburger-react'
// import ThemeChangeButton from './ThemeChangeButton'

function AppHeader() {
  // const [mobileIsActive, setMobileIsActive] = useState(false)
  const [isOpen, setOpen] = useState(false)

  // function handleHamburgerToggle() {
  //   setOpen(!isOpen)
  // }

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
          {/* <button
            className={`hamburger hamburger--slider-r${
              mobileIsActive ? ' is-active' : ''
            }`}
            type='button'
            onClick={handleHamburgerToggle}
          > */}
          <Hamburger toggled={isOpen} toggle={setOpen} />
          {/* //   <span className='hamburger-box'>
          //     <span className='hamburger-inner'></span>
          //   </span>
          // </button> */}
          <ul id='nav-links' className={isOpen ? 'is-active' : ''}>
            <li className='nav-item'>
              <NavLink
                onClick={onClick}
                to='/'
                className={({ isActive }) => (isActive ? ' active' : '')}
              >
                Home
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink
                onClick={onClick}
                to='/study'
                className={({ isActive }) => (isActive ? ' active' : '')}
              >
                Lernen
              </NavLink>
            </li>
            {/* <li className='nav-item'>
              <NavLink
                onClick={onClick}
                to='/membership'
                className={({ isActive }) => (isActive ? ' active' : '')}
              >
                Mitgliedschaft
              </NavLink>
            </li> */}
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
            {/* <ThemeChangeButton /> */}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default AppHeader
