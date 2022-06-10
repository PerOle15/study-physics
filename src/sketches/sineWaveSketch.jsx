import Sketch from 'react-p5'

function WaveSketch() {
  let wave
  let waveArray = []
  const frames = 30
  const gridColor = '#707070'
  const waveScale = 90

  let controlContainer
  let frequencyLabel
  let frequencySlider
  let amplitudeLabel
  let amplitudeSlider
  let waveLengthLabel
  let waveLengthSlider

  const minFrequency = -2
  const maxFrequency = 2
  const minWaveLength = -3
  const maxWaveLength = 3
  const minAmplitude = -2.5
  const maxAmplitude = 2.5
  const setup = (p, canvasParentRef) => {
    // use parent to render the canvas in this ref
    // (without that p will render the canvas outside of your component)
    p.createCanvas(500, 500).parent(canvasParentRef)
    p.frameRate(frames)
    p.background(180)

    controlContainer = p
      .createDiv()
      .parent(canvasParentRef)
      .class('sketch-control')

    // Sliders with labels
    frequencyLabel = p.createDiv().parent(controlContainer)
    frequencySlider = p
      .createSlider(minFrequency, maxFrequency, 1, 0)
      .parent(controlContainer)
      .class('sketch-slider')
      .input(() => {
        frequencyLabel.html(
          `Frequenz: ${frequencySlider.value().toFixed(2)} Hz`
        )
      })
    frequencyLabel.html(`Frequenz: ${frequencySlider.value().toFixed(2)} Hz`)

    waveLengthLabel = p.createDiv().parent(controlContainer)
    waveLengthSlider = p
      .createSlider(minWaveLength, maxWaveLength, 1, 0)
      .parent(controlContainer)
      .class('sketch-slider')
      .input(() => {
        waveLengthLabel.html(
          `Wellenlänge: ${waveLengthSlider.value().toFixed(2)}`
        )
      })
    waveLengthLabel.html(`Wellenlänge: ${waveLengthSlider.value().toFixed(2)}`)

    amplitudeLabel = p.createDiv().parent(controlContainer)
    amplitudeSlider = p
      .createSlider(minAmplitude, maxAmplitude, 1, 0)
      .parent(controlContainer)
      .class('sketch-slider')
      .input(() => {
        amplitudeLabel.html(`Amplitude: ${amplitudeSlider.value().toFixed(2)}`)
      })
    amplitudeLabel.html(`Amplitude: ${amplitudeSlider.value().toFixed(2)}`)

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
      this.frequency = frequencySlider.value()
      this.waveLength = waveLengthSlider.value() * waveScale
      this.amplitude = amplitudeSlider.value() * waveScale
    }
    update() {
      this.frequency = frequencySlider.value()
      this.waveLength = waveLengthSlider.value() * waveScale
      this.amplitude = amplitudeSlider.value() * waveScale
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

  return (
    <>
      <Sketch setup={setup} draw={draw} />
    </>
  )
}

export default WaveSketch
