import Sketch from 'react-p5'

function SineWaveSketch() {
  let wave
  let waveArray = []
  const frames = 60
  const gridColor = '#707070'
  const waveScale = 90

  let controller
  let controlContainer
  let pauseBtn
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
    p.createCanvas(800, 500).parent(canvasParentRef)
    p.frameRate(frames)
    p.background(180)

    controller = new Controller(p)

    controlContainer = p
      .createDiv()
      .parent(canvasParentRef)
      .class('sketch-control')

    pauseBtn = p
      .createButton('Stoppen')
      .parent(controlContainer)
      .class('btn sketch-btn')
      .mousePressed((e) => {
        controller.handleLoop()
      })

    // Sliders with labels
    const frequencyContainer = p
      .createDiv()
      .parent(controlContainer)
      .class('sketch-input-container')
    frequencyLabel = p.createDiv().parent(frequencyContainer)
    frequencySlider = p
      .createSlider(minFrequency, maxFrequency, 0.5, 0)
      .parent(frequencyContainer)
      .class('sketch-slider')
      .input(() => {
        frequencyLabel.html(
          `Frequenz: ${frequencySlider.value().toFixed(2)} Hz`
        )
      })
    frequencyLabel.html(`Frequenz: ${frequencySlider.value().toFixed(2)} Hz`)

    const waveLengthContainer = p
      .createDiv()
      .parent(controlContainer)
      .class('sketch-input-container')
    waveLengthLabel = p.createDiv().parent(waveLengthContainer)
    waveLengthSlider = p
      .createSlider(minWaveLength, maxWaveLength, 1.5, 0)
      .parent(waveLengthContainer)
      .class('sketch-slider')
      .input(() => {
        waveLengthLabel.html(
          `Wellenlänge: ${waveLengthSlider.value().toFixed(2)}`
        )
        controller.display(true)
      })
    waveLengthLabel.html(`Wellenlänge: ${waveLengthSlider.value().toFixed(2)}`)

    const amplitudeContainer = p
      .createDiv()
      .parent(controlContainer)
      .class('sketch-input-container')
    amplitudeLabel = p.createDiv().parent(amplitudeContainer)
    amplitudeSlider = p
      .createSlider(minAmplitude, maxAmplitude, 1, 0)
      .parent(amplitudeContainer)
      .class('sketch-slider')
      .input(() => {
        amplitudeLabel.html(`Amplitude: ${amplitudeSlider.value().toFixed(2)}`)
        controller.display(true)
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
    controller.display()
  }

  // control class to control
  class Controller {
    constructor(p) {
      this.p = p
    }
    display(sliderChanged = false) {
      this.p.fill(180)
      // Hintergrund grau machen je nachdem ob der Ursprung schon veschoben wurde oder nicht
      if (sliderChanged) {
        this.p.rect(0, -this.p.height / 2, this.p.width, this.p.height)
      } else {
        this.p.rect(0, 0, this.p.width, this.p.height)
      }

      // Nur wenn die Funktion nicht von einem Slider aufgerufen wurde Ursprung verschieben
      if (!sliderChanged) {
        this.p.translate(0, this.p.height / 2)
      }

      // Raster zeichnen
      this.p.drawingContext.setLineDash([5, 10])
      this.p.noStroke()
      this.p.fill(gridColor)
      this.p.text(0, this.p.width - 3, 0)
      this.p.textAlign(this.p.RIGHT, this.p.CENTER)
      this.p.stroke(gridColor)
      this.p.line(0, 0, this.p.width - 20, 0)
      for (let i = 0; i < this.p.height / 2 / waveScale; i++) {
        this.p.stroke(gridColor)
        this.p.line(
          0,
          (i + 1) * waveScale,
          this.p.width - 20,
          (i + 1) * waveScale
        )
        this.p.line(
          0,
          -(i + 1) * waveScale,
          this.p.width - 20,
          -(i + 1) * waveScale
        )
        this.p.noStroke()
        this.p.text(i + 1, this.p.width - 3, -(i + 1) * waveScale)
        this.p.text(-(i + 1), this.p.width - 3, (i + 1) * waveScale)
      }
      this.p.drawingContext.setLineDash([0, 0])

      wave.update()
      waveArray.forEach((wavePoint, i) => {
        if (i === 1) {
          wavePoint.display('blue')
        } else {
          wavePoint.display('#f08d54')
        }
      })
    }
    handleLoop() {
      if (this.p.isLooping()) {
        this.p.noLoop()
        pauseBtn.html('Fortfahren')
      } else {
        this.p.loop()
        pauseBtn.html('Stoppen')
      }
    }
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
      // Verschiebung der Welle nur wenn die Animation läuft
      if (this.p.isLooping()) {
        this.offset -= (Math.PI * 2 * wave.frequency) / frames
      }
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

export default SineWaveSketch
