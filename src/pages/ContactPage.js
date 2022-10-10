import MailTo from '../components/MailTo'
import { useState } from 'react'

export default function ContactPage() {
  // const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')

  document.title = 'Fysihka - Kontakt'

  function handleChange(e) {
    switch (e.target.id) {
      // case 'email':
      //   setEmail(e.target.value)
      //   break
      case 'subject':
        setSubject(e.target.value)
        break
      case 'message':
        setMessage(e.target.value)
        break
      default:
        break
    }
  }

  return (
    <div id='contact-page'>
      <div className='container'>
        <div id='contact-form-info'>
          <p className='page-heading'>Kontakt</p>
          <p>
            Falls du ein Thema nicht verstehst, Verbesserungsvorschläge hast, du
            andere Fragen hast oder dich sonst melden willst, bist du hier genau
            richtig. Wir freuen uns sehr über deine Meinung und Fragen! Unser
            Ziel ist es, die best mögliche Plattform zu machen, um möglichst
            vielen Personen bei dem Lernen und Verstehen zu helfen. Wir sind
            offen für konstruktive Kritik und freuen uns immer über Vorschläge,
            was wir noch verbessern oder hinzufügen könnten.
          </p>
        </div>
        <form id='contact-form'>
          {/* <label htmlFor='email'>E-Mail</label>
          <input
            onChange={handleChange}
            className='contact-input'
            type='text'
            id='email'
            value={email}
          /> */}
          <label className='small-heading' htmlFor='subject'>
            Betreff
          </label>
          <input
            onChange={handleChange}
            className='contact-input'
            type='text'
            id='subject'
            value={subject}
          />
          <label className='small-heading' htmlFor='message'>
            Nachricht
          </label>
          <textarea
            id='message'
            className='contact-input'
            onChange={handleChange}
            value={message}
          ></textarea>
          <MailTo /* email={email} */ subject={subject} message={message}>
            Nachricht Senden
          </MailTo>
        </form>
      </div>
    </div>
  )
}
