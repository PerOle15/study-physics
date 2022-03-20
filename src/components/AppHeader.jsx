import { NavLink } from 'react-router-dom'
import { FaYinYang } from 'react-icons/fa'

function AppHeader() {
  const html = document.querySelector('html')
  const isOsDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  html.dataset.theme = isOsDark ? 'theme-dark' : 'theme-light'
  function switchTheme(theme) {
    if (html.dataset.theme === `theme-dark`) {
      html.dataset.theme = `theme-light`
    } else {
      html.dataset.theme = `theme-dark`
    }
  }

  return (
    <header className='main-header'>
      <div className='container'>
        <h1 className='logo'>Fysihka</h1>
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
                Lernen
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
            <li>
              <FaYinYang
                className='change-theme'
                onClick={() => {
                  switchTheme()
                }}
              />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default AppHeader
