import React, { Component } from 'react'

export class AboutPage extends Component {
  render() {
    document.title = 'Über Uns - Fysihka'
    return (
      <div className='container'>
        <h1 className='main-title'>Über Uns</h1>
      </div>
    )
  }
}

export default AboutPage
