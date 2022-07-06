// import nodemailer from 'nodemailer'

export default function ContactPage() {
  document.title = 'Fysihka - Kontakt'
  // const transporter = nodemailer.createTransport({
  //   host: 'smtp.google.com',
  //   auth: {
  //     user: process.env.REACT_APP_SMTP_USER,
  //     pass: process.env.REACT_APP_SMTP_PASSWORD,
  //   },
  // })

  // const mailOptions = {
  //   from: 'fysihkasupp@gmail.com',
  //   to: 'fysihkasupp@gmail.com',
  //   subject: 'test',
  //   text: 'This is a test email from Fysihka',
  // }

  // const onSubmit = () => {
  //   transporter.sendMail(mailOptions, (err, succ) => {
  //     if (err) {
  //       console.log(err)
  //     } else {
  //       console.log('Email sent successfully!')
  //     }
  //   })
  // }
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
          <input
            className='btn btn-light btn-block'
            type='submit'
            value='Nachricht Senden'
            // onSubmit={onSubmit}
          />
        </form>
      </div>
    </div>
  )
}
