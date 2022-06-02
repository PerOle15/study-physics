import Sketch from 'react-p5'

function WaveSketch() {
  let wave
  let waveArray = []
  const frames = 30
  const gridColor = '#707070'
  const waveScale = 90
  const setup = (p, canvasParentRef) => {
    // use parent to render the canvas in this ref
    // (without that p will render the canvas outside of your component)
    p.createCanvas(500, 500).parent(canvasParentRef)
    p.frameRate(frames)
    p.background(180)

    // frequencyInput.value = frequencySlider.value
    // waveLengthInput.value = waveLengthSlider.value
    // amplitudeInput.value = amplitudeSlider.value

    wave = new Wave(p)
    for (let i = 0; i < wave.circleCount; i++) {
      waveArray.push(
        new WavePoint(
          p,
          wave.radius,
          i * (p.width / wave.circleCount) + wave.radius
        )
      )
    }
  }

  const draw = (p) => {
    p.fill(180)
    p.rect(0, 0, p.width, p.height)
    p.translate(0, p.height / 2)

    // Raster zeichnen
    p.drawingContext.setLineDash([5, 10])
    p.noStroke()
    p.fill(gridColor)
    p.text(0, p.width - 3, 0)
    p.textAlign(p.RIGHT, p.CENTER)
    p.stroke(gridColor)
    p.line(0, 0, p.width - 20, 0)
    for (let i = 0; i < p.height / 2 / waveScale; i++) {
      p.stroke(gridColor)
      p.line(0, (i + 1) * waveScale, p.width - 20, (i + 1) * waveScale)
      p.line(0, -(i + 1) * waveScale, p.width - 20, -(i + 1) * waveScale)
      p.noStroke()
      p.text(i + 1, p.width - 3, -(i + 1) * waveScale)
      p.text(-(i + 1), p.width - 3, (i + 1) * waveScale)
    }
    p.drawingContext.setLineDash([0, 0])

    wave.update()
    waveArray.forEach((wavePoint, i) => {
      if (i === 1) {
        wavePoint.display('blue')
      } else {
        wavePoint.display('#f08d54')
      }
    })

    // if (!p5.focused) {
    //   pauseBtn.innerText = 'Fortfahren'
    //   p5.noLoop()
    // }
  }

  class Wave {
    constructor(p) {
      this.p = p
      this.radius = 3
      this.circleCount = this.p.width / (this.radius * 2 + 2)
      this.frequency = 2
      this.waveLength = 1 * waveScale
      this.amplitude = 1 * waveScale
    }
    update() {
      this.frequency = 1
      this.waveLength = 1 * waveScale
      this.amplitude = 1 * waveScale
    }
  }

  class WavePoint {
    constructor(p, radius, x) {
      this.p = p
      this.radius = radius
      this.x = x
      this.y = 0
      this.offset = 0
    }

    update() {
      this.offset -= (Math.PI * 2 * wave.frequency) / frames
      this.y =
        wave.amplitude *
        Math.sin(((Math.PI * 2) / wave.waveLength) * this.x + this.offset)
    }

    display(color) {
      this.update()
      this.p.fill(color)
      this.p.noStroke()
      this.p.circle(this.x, this.y, this.radius * 2)
    }
  }

  return <Sketch setup={setup} draw={draw} />
}

export default WaveSketch

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
