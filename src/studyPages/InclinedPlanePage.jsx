import React, { Component } from 'react'
import InclinedPlaneSketch from '../sketches/inclinedPlaneSketch'

export class InclinedPlanePage extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        <div>InclinedPlanePage</div>
        <InclinedPlaneSketch />
      </div>
    )
  }
}

export default InclinedPlanePage
