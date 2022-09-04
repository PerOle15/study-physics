import { toast } from 'react-toastify'

export default function Mailto({ subject, message, ...props }) {
  const handleSubmit = (e) => {
    e.preventDefault()

    const correctMessage =
      message === '' || message === undefined ? false : true

    if (correctMessage) {
      window.location.href = `mailto:fysihkasupp@gmail.com?subject=${
        subject !== null && subject !== undefined ? subject : ''
      }&body=${message}`
    } else {
      toast.error('Bitte schreibe eine Nachricht!')
    }
  }
  return (
    <button className='btn btn-light' onClick={handleSubmit}>
      {props.children}
    </button>
  )
}
