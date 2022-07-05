import React from 'react'
import WaveSketch from '../sketches/SineWaveSketch'

function SineWavePage() {
  document.title = 'Fysihka - Sinuswellen'
  return (
    <div className='container'>
      <p className='page-heading'>Sinuswellen</p>
      <WaveSketch />
    </div>
  )
}

export default SineWavePage
