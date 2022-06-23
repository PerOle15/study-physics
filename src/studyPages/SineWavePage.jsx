import React from 'react'
import WaveSketch from '../sketches/sineWaveSketch'

function SineWavePage() {
  document.title = 'Fysihka - Sinuswellen'
  return (
    <div className='container'>
      <h1 className='sketch-title'>Sinuswellen</h1>
      <WaveSketch />
    </div>
  )
}

export default SineWavePage
