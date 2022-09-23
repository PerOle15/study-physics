import Sketch from 'react-p5'

function BuoyancySketch() {
  const frames = 60
  const scale = 200
  const localGravity = 9.81
  const flowResistance = 1.1

  let volumeSlider
  let densitySlider
  let liquidDensitySlider

  const minVolume = 0.001
  const maxVolume = 0.1
  const startingVolume = 0.05
  const minDensity = 400
  const maxDensity = 2000
  const startingDensity = 1500
  const minLiquidDensity = 400
  const maxLiquidDensity = 2000
  const startingLiquidDensity = 1000

  let cube
  let liquid

  const setup = (p, canvasParentRef) => {
    p.createCanvas(800, 500).parent(canvasParentRef)
    p.frameRate(frames)
    p.background(180)

    cube = new Cube(p)
    liquid = new Liquid(p)

    const controlContainer = p
      .createDiv()
      .parent(canvasParentRef)
      .class('sketch-control highlight-box')

    const volumeContainer = p
      .createDiv()
      .parent(controlContainer)
      .class('sketch-input-container')
    const volumeLabel = p.createDiv().parent(volumeContainer)
    volumeSlider = p
      .createSlider(minVolume, maxVolume, startingVolume, 0)
      .parent(volumeContainer)
      .class('sketch-slider')
      .input(() => {
        volumeLabel.html(
          `Volumen Würfel: ${volumeSlider.value().toFixed(3)} m<sup>3</sup>`
        )
      })
    volumeLabel.html(
      `Volumen Würfel: ${volumeSlider.value().toFixed(3)} m<sup>3</sup>`
    )

    const densityContainer = p
      .createDiv()
      .parent(controlContainer)
      .class('sketch-input-container')
    const densityLabel = p.createDiv().parent(densityContainer)
    densitySlider = p
      .createSlider(minDensity, maxDensity, startingDensity, 0)
      .parent(densityContainer)
      .class('sketch-slider')
      .input(() => {
        densityLabel.html(
          `Dichte Würfel: ${Math.floor(densitySlider.value())} kg/m<sup>3</sup>`
        )
      })
    densityLabel.html(
      `Dichte Würfel: ${Math.floor(densitySlider.value())} kg/m<sup>3</sup>`
    )

    const liquidDensityContainer = p
      .createDiv()
      .parent(controlContainer)
      .class('sketch-input-container')
    const liquidDensityLabel = p.createDiv().parent(liquidDensityContainer)
    liquidDensitySlider = p
      .createSlider(
        minLiquidDensity,
        maxLiquidDensity,
        startingLiquidDensity,
        0
      )
      .parent(liquidDensityContainer)
      .class('sketch-slider')
      .input(() => {
        liquidDensityLabel.html(
          `Dichte Flüssigkeit: ${Math.floor(
            liquidDensitySlider.value()
          )} kg/m<sup>3</sup>`
        )
      })
    liquidDensityLabel.html(
      `Dichte Flüssigkeit: ${Math.floor(
        liquidDensitySlider.value()
      )} kg/m<sup>3</sup>`
    )
  }

  const draw = (p) => {
    p.fill(180)
    p.rect(0, 0, p.width, p.height)
    liquid.display()
    cube.display()
  }

  const mousePressed = () => {
    cube.pressed()
  }

  const mouseReleased = () => {
    cube.notPressed()
  }

  class Cube {
    constructor(p) {
      this.p = p
      this.density = 1500
      this.volume = 0.05
      this.dimensions = Math.cbrt(this.volume)
      this.displayDimensions = this.dimensions * scale
      this.mass = this.density * this.volume
      this.x = this.p.width / 2 - this.displayDimensions / 2
      this.y = 200
      this.offsetX = 0
      this.offsetY = 0
      this.velocity = this.p.createVector(0, 0)
      this.acc = this.p.createVector(0, 0)
      this.submergedVolume = 0
      this.submergedPart = 0
      this.dragging = false
    }

    pressed() {
      const px = this.p.mouseX
      const py = this.p.mouseY
      if (
        px > this.x &&
        px < this.x + this.displayDimensions &&
        py > this.y &&
        py < this.y + this.displayDimensions
      ) {
        this.dragging = true
        this.offsetX = this.x - px
        this.offsetY = this.y - py
        this.acc.y = 0
        this.velocity.y = 0
      }
    }

    notPressed() {
      this.dragging = false
    }

    calcAcceleration() {
      this.acc.y = (localGravity / frames ** 2) * scale
      if (this.y + this.displayDimensions) {
        // Fläche durch 2 Teilen, damit die Abbremsung nicht so gross ist
        const area = this.dimensions ** 2 / 2
        // Formel aus: https://www.leifiphysik.de/mechanik/stroemungslehre/grundwissen/stroemungswiderstand-und-crmw-wert
        const resistanceForce =
          (1 / 2) * flowResistance * this.density * area * this.velocity.y
        const resistanceAcc =
          (resistanceForce / (this.density * this.volume) / frames ** 2) * scale
        this.acc.y -= resistanceAcc
      }
      if (this.y + this.displayDimensions > liquid.y) {
        if (this.y > liquid.y) {
          this.submergedPart = 1
          this.submergedVolume = this.volume * this.submergedPart
        } else {
          this.submergedPart =
            (this.y + this.displayDimensions - liquid.y) /
            this.displayDimensions
          this.submergedVolume = this.volume * this.submergedPart
        }
        const buoyancyForce =
          ((this.submergedVolume * liquid.density * localGravity) /
            frames ** 2) *
          scale
        const buoyancyAcceleration = buoyancyForce / this.mass
        this.acc.y -= buoyancyAcceleration
      }
    }

    update() {
      // Werte von den Slidern an passen
      this.density = densitySlider.value()
      this.volume = volumeSlider.value()
      this.lastDisplayDimensions = this.displayDimensions
      this.dimensions = Math.cbrt(this.volume)
      this.displayDimensions = this.dimensions * scale
      this.x =
        this.x + (this.lastDisplayDimensions - this.displayDimensions) / 2
      this.mass = this.density * this.volume
      // Überprüfen, ob Würfel über den unteren Rand hinaus geht
      if (this.y + this.displayDimensions + this.velocity.y < this.p.height) {
        // Überprüfen, ob Würfel über den oberen Rand hinaus geht
        if (this.y + this.velocity.y < 0) {
          this.velocity.y *= -1
          this.y = 0
        }
        // Beschleunigung des Würfels berechnen
        this.calcAcceleration()
        this.velocity.y += this.acc.y
        // Wasser-/Luftwiderstand (vereinfacht)
        // this.velocity.y *= 0.993
        this.y += this.velocity.y
      } else {
        this.velocity.y *= -1
        this.y = this.p.height - this.displayDimensions
      }
    }

    display() {
      if (this.dragging) {
        this.x = this.p.mouseX + this.offsetX
        this.y = this.p.mouseY + this.offsetY
        if (this.x < 0) {
          this.x = 0
        } else if (this.x + this.displayDimensions > this.p.width) {
          this.x = this.p.width - this.displayDimensions
        }
        if (this.y < 0) {
          this.y = 0
        } else if (this.y + this.displayDimensions > this.p.height) {
          this.y = this.p.height - this.displayDimensions
          // Kleiner Abstand, damit der Würfel nicht am Boden stecken bleibt
          this.y -= 0.0001
        }
        this.p.fill(0)
        this.p.rect(
          this.x,
          this.y,
          this.displayDimensions,
          this.displayDimensions
        )
      } else {
        this.update()
        this.p.fill(0)
        this.p.rect(
          this.x,
          this.y,
          this.displayDimensions,
          this.displayDimensions
        )
      }
    }
  }

  class Liquid {
    constructor(p) {
      this.p = p
      this.density = 1000
      this.startY = 300
      this.y = this.startY
    }

    update() {
      this.density = liquidDensitySlider.value()

      this.y =
        this.startY -
        (cube.submergedPart * Math.pow(cube.displayDimensions, 2)) /
          this.p.width
    }

    display() {
      this.update()
      this.p.fill('#f08d54')
      this.p.rect(0, this.y, this.p.width, this.p.height)
    }
  }
  return (
    <Sketch
      setup={setup}
      draw={draw}
      mousePressed={mousePressed}
      mouseReleased={mouseReleased}
    />
  )
}

export default BuoyancySketch
