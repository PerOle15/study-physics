import Sketch from 'react-p5'

function WaveAdditionSketch() {
  let wave1
  let wave2
  const frames = 60
  // const gridColor = 155
  const waveScale = 90
  const textSize = 16
  const textGap = 10

  let controller
  let controlContainer
  let pauseBtn
  // Frequency
  let f1Slider
  let f2Slider
  // Amplitude
  let a1Slider
  let a2Slider
  // Wave Length
  let w1Slider
  let w2Slider

  const minFrequency = 0
  const maxFrequency = 2
  const startingFrequency = 0.5
  const minWaveLength = 0.05
  const maxWaveLength = 2
  const startingWaveLength = 1
  const minAmplitude = 0
  const maxAmplitude = 1.25
  const startingAmplitude = 1
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
      .class('sketch-control highlight-box')

    pauseBtn = p
      .createButton('Stoppen')
      .parent(controlContainer)
      .class('btn')
      .mousePressed(() => {
        controller.handleLoop()
      })

    // Sliders with labels
    const f1Container = p
      .createDiv()
      .parent(controlContainer)
      .class('sketch-input-container')
    const f1Label = p.createDiv().parent(f1Container)
    f1Slider = p
      .createSlider(minFrequency, maxFrequency, startingFrequency, 0)
      .parent(f1Container)
      .class('sketch-slider')
      .input(() => {
        f1Label.html(`Frequenz 1: ${f1Slider.value().toFixed(2)} Hz`)
        wave1.frequency = f1Slider.value()
      })
    f1Label.html(`Frequenz 1: ${f1Slider.value().toFixed(2)} Hz`)

    const f2Container = p
      .createDiv()
      .parent(controlContainer)
      .class('sketch-input-container')
    const f2Label = p.createDiv().parent(f2Container)
    f2Slider = p
      .createSlider(minFrequency, maxFrequency, startingFrequency, 0)
      .parent(f2Container)
      .class('sketch-slider')
      .input(() => {
        f2Label.html(`Frequenz 2: ${f2Slider.value().toFixed(2)} Hz`)
        wave2.frequency = f2Slider.value()
      })
    f2Label.html(`Frequenz 2: ${f2Slider.value().toFixed(2)} Hz`)

    const w1Container = p
      .createDiv()
      .parent(controlContainer)
      .class('sketch-input-container')
    const w1Label = p.createDiv().parent(w1Container)
    w1Slider = p
      .createSlider(minWaveLength, maxWaveLength, startingWaveLength, 0)
      .parent(w1Container)
      .class('sketch-slider')
      .input(() => {
        w1Label.html(`Wellenlänge 1: ${w1Slider.value().toFixed(2)}`)
        wave1.waveLength = w1Slider.value() * waveScale
        controller.display(true)
      })
    w1Label.html(`Wellenlänge 1: ${w1Slider.value().toFixed(2)}`)

    const w2Container = p
      .createDiv()
      .parent(controlContainer)
      .class('sketch-input-container')
    const w2Label = p.createDiv().parent(w2Container)
    w2Slider = p
      .createSlider(minWaveLength, maxWaveLength, startingWaveLength, 0)
      .parent(w2Container)
      .class('sketch-slider')
      .input(() => {
        w2Label.html(`Wellenlänge 2: ${w2Slider.value().toFixed(2)}`)
        wave2.waveLength = w2Slider.value() * waveScale
        controller.display(true)
      })
    w2Label.html(`Wellenlänge 2: ${w2Slider.value().toFixed(2)}`)

    const a1Container = p
      .createDiv()
      .parent(controlContainer)
      .class('sketch-input-container')
    const a1Label = p.createDiv().parent(a1Container)
    a1Slider = p
      .createSlider(minAmplitude, maxAmplitude, startingAmplitude, 0)
      .parent(a1Container)
      .class('sketch-slider')
      .input(() => {
        a1Label.html(`Amplitude 1: ${a1Slider.value().toFixed(2)}`)
        wave1.amplitude = a1Slider.value() * waveScale
        controller.display(true)
      })
    a1Label.html(`Amplitude 1: ${a1Slider.value().toFixed(2)}`)

    const a2Container = p
      .createDiv()
      .parent(controlContainer)
      .class('sketch-input-container')
    const a2Label = p.createDiv().parent(a2Container)
    a2Slider = p
      .createSlider(minAmplitude, maxAmplitude, startingAmplitude, 0)
      .parent(a2Container)
      .class('sketch-slider')
      .input(() => {
        a2Label.html(`Amplitude 2: ${a2Slider.value().toFixed(2)}`)
        wave2.amplitude = a2Slider.value() * waveScale
        controller.display(true)
      })
    a2Label.html(`Amplitude 2: ${a2Slider.value().toFixed(2)}`)

    wave1 = new Wave(
      p,
      f1Slider.value(),
      w1Slider.value() * waveScale,
      a1Slider.value() + waveScale
    )
    wave2 = new Wave(
      p,
      f2Slider.value(),
      w2Slider.value() * waveScale,
      a2Slider.value() + waveScale
    )
  }

  const draw = (p) => {
    controller.display()
  }

  // control class to control
  class Controller {
    constructor(p) {
      this.p = p
      // Height and width for the different sections for the waves
      this.wave1H = this.p.height / 2
      this.wave2H = this.p.height / 2
      this.addedWaveH = this.p.height
    }
    display(sliderChanged = false) {
      this.p.background(180)

      wave1.update()
      wave2.update()

      this.p.noFill()
      this.p.stroke('#aaa')
      this.p.strokeWeight(2)
      this.p.line(0, this.p.height / 4, this.p.width / 2, this.p.height / 4)
      this.p.line(
        0,
        (this.p.height / 4) * 3,
        this.p.width / 2,
        (this.p.height / 4) * 3
      )
      this.p.line(
        this.p.width / 2,
        this.p.height / 2,
        this.p.width,
        this.p.height / 2
      )
      this.p.strokeWeight(1)

      this.p.stroke(0)
      this.p.line(this.p.width / 2, 0, this.p.width / 2, this.p.height)
      this.p.line(0, this.p.height / 2, this.p.width / 2, this.p.height / 2)

      // Wave 1
      this.p.beginShape()
      for (let i = 0; i < wave1.width; i++) {
        const x = i
        const y = wave1.yArray[i] + this.p.height / 4
        this.p.vertex(x, y)
      }
      this.p.endShape()

      // Wave 2
      this.p.beginShape()
      for (let i = 0; i < wave2.width; i++) {
        const x = i
        const y = wave2.yArray[i] + (this.p.height / 4) * 3
        this.p.vertex(x, y)
      }
      this.p.endShape()

      // Interference Wave
      this.p.beginShape()
      for (let i = 0; i < wave1.width; i++) {
        const x = i + wave1.width + 1
        const y = wave1.yArray[i] + wave2.yArray[i] + this.p.height / 2
        this.p.vertex(x, y)
      }
      this.p.endShape()

      this.p.noStroke()
      this.p.fill(0)
      this.p.textSize(textSize)
      this.p.textAlign(this.p.LEFT, this.p.TOP)
      this.p.text('Welle 1', textGap, textGap)
      this.p.text('Welle 2', textGap, this.p.height / 2 + textGap)
      this.p.text(
        'Interferenz von Welle 1 & Welle 2',
        this.p.width / 2 + textGap,
        textGap
      )
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
    constructor(p, frequency, waveLength, amplitude) {
      this.p = p
      this.frequency = frequency
      this.waveLength = waveLength
      this.amplitude = amplitude
      this.offset = 0
      this.yArray = []
      this.width = this.p.width / 2
      for (let i = 0; i < this.width; i++) {
        this.yArray.push(
          -this.amplitude *
            Math.sin(((Math.PI * 2) / this.waveLength) * (i + 1) + this.offset)
        )
      }
    }
    update() {
      // Verschiebung der Welle nur wenn die Animation läuft
      if (this.p.isLooping()) {
        this.offset -= (Math.PI * 2 * this.frequency) / frames
      }

      this.yArray = []
      for (let i = 0; i < this.width; i++) {
        this.yArray.push(
          -this.amplitude *
            Math.sin(((Math.PI * 2) / this.waveLength) * (i + 1) + this.offset)
        )
      }
    }
  }

  return <Sketch setup={setup} draw={draw} />
}

export default WaveAdditionSketch
