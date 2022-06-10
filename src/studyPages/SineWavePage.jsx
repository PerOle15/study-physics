import React from 'react'
import WaveSketch from '../sketches/sineWaveSketch'

function SineWavePage() {
  return (
    <div className='container'>
      <WaveSketch />
    </div>
  )
}

export default SineWavePage

// let wave
// let waveArray = []
// const gridColor = '#707070'
// const waveScale = 90
// const frames = 30
// const frequencyInput = document.getElementById('frequencyInput')
// const frequencySlider = document.getElementById('frequencySlider')
// const waveLengthInput = document.getElementById('waveLengthInput')
// const waveLengthSlider = document.getElementById('waveLengthSlider')
// const amplitudeInput = document.getElementById('amplitudeInput')
// const amplitudeSlider = document.getElementById('amplitudeSlider')
// const pauseBtn = document.getElementById('pauseBtn')

// setInputAndSlider(frequencyInput, frequencySlider)
// setInputAndSlider(amplitudeInput, amplitudeSlider)
// setInputAndSlider(waveLengthInput, waveLengthSlider)

// function setInputMinMax(el) {
//   const maxVal = Number(el.getAttribute('max'))
//   const minVal = Number(el.getAttribute('min'))
//   if (el.value > maxVal) {
//     el.value = maxVal
//   } else if (el.value < minVal) {
//     el.value = minVal
//   }
// }

// function setInputAndSlider(input, slider) {
//   input.addEventListener('change', () => {
//     setInputMinMax(input)
//     slider.value = input.value
//   })
//   slider.addEventListener('change', () => {
//     input.value = slider.value
//   })
// }
// console.log(document.body.clientWidth, document.body.clientHeight)

// function setup() {
//   const myCanvas = createCanvas(
//     document.body.clientWidth,
//     document.body.clientHeight
//   )
//   myCanvas.parent('canvasContainer')
//   frameRate(frames)
//   background(180)

//   frequencyInput.value = frequencySlider.value
//   waveLengthInput.value = waveLengthSlider.value
//   amplitudeInput.value = amplitudeSlider.value

//   wave = new Wave()
//   for (let i = 0; i < wave.circleCount; i++) {
//     waveArray.push(
//       new WavePoint(wave.radius, i * (width / wave.circleCount) + wave.radius)
//     )
//   }
// }

// function draw() {
//   fill(180)
//   rect(0, 0, width, height)
//   translate(0, height / 2)

//   // Raster zeichnen
//   setLineDash([5, 10])
//   noStroke()
//   fill(gridColor)
//   text(0, width - 3, 0)
//   textAlign(RIGHT, CENTER)
//   stroke(gridColor)
//   line(0, 0, width - 20, 0)
//   for (let i = 0; i < height / 2 / waveScale; i++) {
//     stroke(gridColor)
//     line(0, (i + 1) * waveScale, width - 20, (i + 1) * waveScale)
//     line(0, -(i + 1) * waveScale, width - 20, -(i + 1) * waveScale)
//     noStroke()
//     text(i + 1, width - 3, -(i + 1) * waveScale)
//     text(-(i + 1), width - 3, (i + 1) * waveScale)
//   }
//   setLineDash([0, 0])

//   wave.update()
//   waveArray.forEach((wavePoint, i) => {
//     if (i === 1) {
//       wavePoint.display('blue')
//     } else {
//       wavePoint.display('#f08d54')
//     }
//   })

//   if (!focused) {
//     pauseBtn.innerText = 'Fortfahren'
//     noLoop()
//   }
// }

// function setLineDash(list) {
//   drawingContext.setLineDash(list)
// }

// // Animation stoppen und wieder anstellen
// document.addEventListener('keypress', (e) => {
//   if (e.key === ' ') {
//     e.preventDefault()
//     handleLoop()
//   }
// })

// pauseBtn.addEventListener('click', () => {
//   handleLoop()
// })

// function handleLoop() {
//   if (isLooping()) {
//     pauseBtn.innerText = 'Fortfahren'
//     noLoop()
//   } else {
//     loop()
//     pauseBtn.innerText = 'Pausieren'
//   }
// }

// class Wave {
//   constructor() {
//     this.radius = 3
//     this.circleCount = width / (this.radius * 2 + 2)
//     this.frequency = frequencySlider.value
//     this.waveLength = waveLengthSlider.value * waveScale
//     this.amplitude = amplitudeSlider.value * waveScale
//   }
//   update() {
//     this.frequency = frequencySlider.value
//     this.waveLength = waveLengthSlider.value * waveScale
//     this.amplitude = amplitudeSlider.value * waveScale
//   }
// }

// class WavePoint {
//   constructor(radius, x) {
//     this.radius = radius
//     this.x = x
//     this.y = 0
//     this.offset = 0
//   }

//   update() {
//     this.offset -= (TWO_PI * wave.frequency) / frames
//     this.y =
//       wave.amplitude * sin((TWO_PI / wave.waveLength) * this.x + this.offset)
//   }

//   display(color) {
//     this.update()
//     fill(color)
//     noStroke()
//     circle(this.x, this.y, this.radius * 2)
//   }
// }

// return (
//   <div>
//     <div id='canvasContainer' className='canvas-full-width'>
//       <form id='canvasForm'>
//         <label for='amplitudeInput'>Amplitude</label>
//         <input
//           type='number'
//           id='amplitudeInput'
//           name='amplitudeInput'
//           min='-3'
//           max='3'
//           step='0.1'
//         />
//         <input
//           type='range'
//           id='amplitudeSlider'
//           name='amplitudeSlider'
//           min='-3'
//           max='3'
//           step='0.1'
//           value='1'
//         />
//         <label for='frequencyInput'>Frequenz</label>
//         <input
//           type='number'
//           id='frequencyInput'
//           name='frequencyInput'
//           min='-2'
//           max='2'
//           step='0.1'
//         />
//         <input
//           type='range'
//           id='frequencySlider'
//           name='frequencySlider'
//           min='-2'
//           max='2'
//           step='0.05'
//           value='0.5'
//         />
//         <label for='waveLengthInput'>Wellenlänge</label>
//         <input
//           type='number'
//           id='waveLengthInput'
//           name='waveLengthInput'
//           min='-10'
//           max='10'
//           step='0.1'
//         />
//         <input
//           type='range'
//           id='waveLengthSlider'
//           name='waveLengthSlider'
//           min='-10'
//           max='10'
//           step='0.1'
//           value='3.141'
//         />
//       </form>
//       <button id='pauseBtn'>Pausieren</button>
//     </div>
//   </div>
// )
