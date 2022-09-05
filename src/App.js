import { Outlet } from 'react-router-dom'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <>
      <div className='app'>
        <Outlet />
      </div>

      <ToastContainer autoClose={3000} theme='dark' />
    </>
  )
}

export default App
