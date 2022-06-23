import React, { Component } from 'react'
import PendulumSketch from '../sketches/PendulumSketch'

export class PendulumPage extends Component {
  render() {
    return (
      <div className='container'>
        <h1>Pendel</h1>
        <PendulumSketch />
      </div>
    )
  }
}

export default PendulumPage
