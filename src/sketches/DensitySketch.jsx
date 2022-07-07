import Sketch from 'react-p5'

function DensitySketch() {
  const frames = 60
  const scale = 300

  const minDensity = 100
  const maxDensity = 5000
  const startingDensity = 1000
  const minVolume = 0.01
  const maxVolume = 1
  const startingVolume = 0.1
  const minMass = minDensity * minVolume
  const maxMass = maxDensity * maxVolume
  const startingMass = startingDensity * startingVolume

  let densitySlider
  let densityLabel
  let volumeSlider
  let volumeLabel
  let massSlider
  let massLabel

  let cube

  const setup = (p, canvasParentRef) => {
    p.createCanvas(800, 500).parent(canvasParentRef)
    p.frameRate(frames)
    p.background(180)

    cube = new Cube(p)

    const controlContainer = p
      .createDiv()
      .parent(canvasParentRef)
      .class('sketch-control')

    const densityContainer = p
      .createDiv()
      .parent(controlContainer)
      .class('sketch-input-container')
    densityLabel = p.createDiv().parent(densityContainer)
    densitySlider = p
      .createSlider(minDensity, maxDensity, startingDensity, 0)
      .parent(densityContainer)
      .class('sketch-slider')
      .input(() => {
        setDensityLabel()
        massSlider.value(densitySlider.value() * volumeSlider.value())
        setMassLabel()
      })
    setDensityLabel()

    const volumeContainer = p
      .createDiv()
      .parent(controlContainer)
      .class('sketch-input-container')
    volumeLabel = p.createDiv().parent(volumeContainer)
    volumeSlider = p
      .createSlider(minVolume, maxVolume, startingVolume, 0)
      .parent(volumeContainer)
      .class('sketch-slider')
      .input(() => {
        setVolumeLabel()
        massSlider.value(densitySlider.value() * volumeSlider.value())
        setMassLabel()
      })
    setVolumeLabel()

    const massContainer = p
      .createDiv()
      .parent(controlContainer)
      .class('sketch-input-container')
    massLabel = p.createDiv().parent(massContainer)
    massSlider = p
      .createSlider(minMass, maxMass, startingMass, 0)
      .parent(massContainer)
      .class('sketch-slider')
      .input(() => {
        const maxMass = maxVolume * densitySlider.value()
        if (massSlider.value() > maxMass) {
          massSlider.value(maxMass)
        }
        setMassLabel()
        volumeSlider.value(massSlider.value() / densitySlider.value())
        setVolumeLabel()
      })
    setMassLabel()
  }

  function setDensityLabel() {
    densityLabel.html(
      `Dichte: ${Math.round(densitySlider.value())} kg/m<sup>3</sup>`
    )
  }
  function setVolumeLabel() {
    volumeLabel.html(
      `Volumen: ${volumeSlider.value().toFixed(3)} m<sup>3</sup>`
    )
  }
  function setMassLabel() {
    massLabel.html(`Masse: ${massSlider.value().toFixed(1)} kg`)
  }

  const draw = (p) => {
    p.fill(180)
    p.rect(0, 0, p.width, p.height)
    cube.display()
  }

  class Cube {
    constructor(p) {
      this.p = p
      this.volume = 1
      this.density = 1000
      this.dim = Math.pow(this.volume, 1 / 3)
      this.displayDim = this.dim * scale
      this.scalesHeight = 80
      this.scalesWidth = 600
      this.scoreboardHeight = 60
      this.scoreboardWidth = 200
    }

    update() {
      this.volume = volumeSlider.value()
      this.density = densitySlider.value()
      this.dim = Math.pow(this.volume, 1 / 3)
      this.displayDim = this.dim * scale
    }

    display() {
      this.update()
      this.p.fill(0)
      this.p.rect(
        this.p.width / 2 - this.displayDim / 2,
        this.p.height - this.displayDim - this.scalesHeight,
        this.displayDim,
        this.displayDim
      )
      this.p.fill(120)
      this.p.rect(
        this.p.width / 2 - this.scalesWidth / 2,
        this.p.height - this.scalesHeight,
        this.scalesWidth,
        this.scalesHeight
      )
      this.p.fill(180)
      this.p.rect(
        this.p.width / 2 - this.scoreboardWidth / 2,
        this.p.height -
          (this.scalesHeight - (this.scalesHeight - this.scoreboardHeight) / 2),
        this.scoreboardWidth,
        this.scoreboardHeight
      )
      this.p.textAlign(this.p.CENTER, this.p.CENTER)
      this.p.fill(0)
      this.p.textSize(20)
      this.p.text(
        `${Math.round(massSlider.value())} kg`,
        this.p.width / 2,
        this.p.height - this.scalesHeight / 2
      )
    }
  }

  return <Sketch setup={setup} draw={draw} />
}

export default DensitySketch
