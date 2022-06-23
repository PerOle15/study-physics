import React from 'react'

export default function ContactPage() {
  document.title = 'Fysihka - Kontakt'
  return (
    <div id='contact-page'>
      <div className='container'>
        <div id='contact-form-info'>
          <h2>Kontaktiere Uns</h2>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illum,
            beatae! Dolor recusandae pariatur assumenda voluptatem porro saepe,
            reprehenderit a corrupti temporibus nisi? Explicabo ducimus, illum
            esse magnam eius libero fugiat, similique minus eum vitae numquam
            cumque incidunt qui maiores beatae.
          </p>
        </div>
        <form id='contact-form'>
          <label htmlFor='email'>E-Mail</label>
          <input
            className='contact-input'
            type='text'
            id='email'
            placeholder='z.B. max.mustermann@gmail.com'
          />
          <label htmlFor='message'>Nachricht</label>
          <textarea
            id='message'
            className='contact-input'
            placeholder='Nachricht...'
          ></textarea>
          <input type='submit' value='Nachricht Senden' />
        </form>
      </div>
    </div>
  )
}
