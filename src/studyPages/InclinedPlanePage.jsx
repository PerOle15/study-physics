import React, { Component } from 'react'
import InclinedPlaneSketch from '../sketches/InclinedPlaneSketch'

export class InclinedPlanePage extends Component {
  // constructor(props) {
  //   super(props)
  // }

  render() {
    document.title = 'Schiefe Ebene - Fysihka'
    return (
      <div className='container'>
        <h1 className='page-title'>Schiefe Ebene</h1>
        <InclinedPlaneSketch />
      </div>
    )
  }
}

export default InclinedPlanePage
