import Sketch from 'react-p5'

function BuoyancySketch() {
  const frames = 60
  const scale = 50
  const g = 9.81
  const flowResistance = 1.1

  let volumeSlider
  let densitySlider
  let liquidDensitySlider

  const minVolume = 0.1
  const maxVolume = 5
  const startingVolume = 2
  const minDensity = 400
  const maxDensity = 2000
  const startingDensity = 1500
  const minLiquidDensity = minDensity
  const maxLiquidDensity = maxDensity
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
        cube.updateVolume()
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
        cube.updateDensity()
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
        liquid.density = liquidDensitySlider.value()
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
      this.width = this.p.width / scale
      this.height = this.p.height / scale
      this.density = startingDensity
      this.volume = startingVolume
      this.dim = Math.cbrt(this.volume)
      this.mass = this.density * this.volume
      this.x = this.width / 2 - this.dim / 2
      this.y = 200 / scale
      this.offsetX = 0
      this.offsetY = 0
      this.vel = 0
      this.acc = 0
      this.submergedVolume = 0
      this.submergedPart = 0
      this.dragging = false
    }

    pressed() {
      const px = this.p.mouseX / scale
      const py = this.p.mouseY / scale
      if (
        px > this.x &&
        px < this.x + this.dim &&
        py > this.y &&
        py < this.y + this.dim
      ) {
        this.dragging = true
        this.offsetX = this.x - px
        this.offsetY = this.y - py
        this.acc = 0
        this.vel = 0
      }
    }

    notPressed() {
      this.dragging = false
    }

    calcAcceleration() {
      this.acc = g
      if (this.y + this.dim) {
        // Fläche durch 2 Teilen, damit die Abbremsung nicht so gross ist
        const area = this.dim ** 2 / 2
        // Formel aus: https://www.leifiphysik.de/mechanik/stroemungslehre/grundwissen/stroemungswiderstand-und-crmw-wert
        const resistanceForce =
          (1 / 2) * flowResistance * this.density * area * this.vel
        const resistanceAcc = resistanceForce / (this.density * this.volume)
        this.acc -= resistanceAcc
      }
      if (this.y + this.dim > liquid.y) {
        if (this.y > liquid.y) {
          this.submergedPart = 1
          this.submergedVolume = this.volume * this.submergedPart
        } else {
          this.submergedPart = (this.y + this.dim - liquid.y) / this.dim
          this.submergedVolume = this.volume * this.submergedPart
        }
        const buoyancyForce = this.submergedVolume * liquid.density * g
        const buoyancyAcceleration = buoyancyForce / this.mass
        this.acc -= buoyancyAcceleration
      }
    }

    updateDensity() {
      this.density = densitySlider.value()
      this.mass = this.density * this.volume
    }

    updateVolume() {
      this.volume = volumeSlider.value()
      this.lastdim = this.dim
      this.dim = Math.cbrt(this.volume)
      this.x = this.x + (this.lastdim - this.dim) / 2
      this.mass = this.density * this.volume
    }

    update() {
      // Überprüfen, ob Würfel über den unteren Rand hinaus geht
      if (this.y + this.dim + this.vel / frames < this.height) {
        // Überprüfen, ob Würfel über den oberen Rand hinaus geht
        if (this.y + this.vel / frames < 0) {
          this.vel *= -1
          this.y = 0
        }
        // Beschleunigung des Würfels berechnen
        this.calcAcceleration()
        this.vel += this.acc / frames
        // Wasser-/Luftwiderstand (vereinfacht)
        // this.vel *= 0.993
        this.y += this.vel / frames
      } else {
        this.vel *= -1
        this.y = this.height - this.dim
      }
    }

    display() {
      if (this.dragging) {
        this.x = this.p.mouseX / scale + this.offsetX
        this.y = this.p.mouseY / scale + this.offsetY
        if (this.x < 0) {
          this.x = 0
        } else if (this.x + this.dim > this.width) {
          this.x = this.width - this.dim
        }
        if (this.y < 0) {
          this.y = 0
        } else if (this.y + this.dim + this.vel / frames > this.height) {
          this.y = this.height - this.dim
          // Kleiner Abstand, damit der Würfel nicht am Boden stecken bleibt
          this.y -= 0.000001
        }
        // Untergetauchter Teil des Würfels berechnen
        if (this.y > liquid.y) {
          this.submergedPart = 1
          this.submergedVolume = this.volume * this.submergedPart
        } else if (this.y + this.dim < liquid.y) {
          this.submergedPart = 0
          this.submergedVolume = 0
        } else {
          this.submergedPart = (this.y + this.dim - liquid.y) / this.dim
          this.submergedVolume = this.volume * this.submergedPart
        }
      } else {
        this.update()
      }
      this.p.fill(0)
      this.p.square(this.x * scale, this.y * scale, this.dim * scale)
    }
  }

  class Liquid {
    constructor(p) {
      this.p = p
      this.width = this.p.width / scale
      this.height = this.p.height / scale
      this.density = startingLiquidDensity
      this.startY = 300 / scale
      this.y = this.startY
    }

    update() {
      this.y = this.startY - (cube.submergedPart * cube.dim ** 2) / this.width
    }

    display() {
      this.update()
      this.p.fill('#607d84')
      this.p.rect(0, this.y * scale, this.p.width, this.p.height)
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
