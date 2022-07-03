import { FaYinYang } from 'react-icons/fa'

function ThemeChangeButton() {
  const html = document.querySelector('html')
  const isOsDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  html.dataset.theme = isOsDark ? 'theme-dark' : 'theme-light'

  function switchTheme() {
    if (html.dataset.theme === `theme-dark`) {
      html.dataset.theme = `theme-light`
    } else {
      html.dataset.theme = `theme-dark`
    }
  }

  return (
    <li>
      <FaYinYang
        className='change-theme'
        onClick={() => {
          switchTheme()
        }}
      />
    </li>
  )
}

export default ThemeChangeButton
