import Sketch from 'react-p5'
import Vector from '../utils/Vector'

function MassSketch() {
  const frames = 60
  const scale = 10

  let controller
  let controlContainer

  let cube
  let dyn

  let gravitySlider
  let massSlider

  const minGravity = 1
  const maxGravity = 30
  const startingGravity = 9.81
  const minMass = 1
  const maxMass = 20
  const startingMass = 10

  const setup = (p, canvasParentRef) => {
    p.createCanvas(800, 500).parent(canvasParentRef)
    p.frameRate(frames)
    p.background(180)

    controller = new Controller(p)

    dyn = new Dynamometer(p)
    cube = new Cube(p)

    controlContainer = p
      .createDiv()
      .parent(canvasParentRef)
      .class('sketch-control highlight-box')

    // Sliders with labels
    const massContainer = p
      .createDiv()
      .parent(controlContainer)
      .class('sketch-input-container')
    const massLabel = p.createDiv().parent(massContainer)
    massSlider = p
      .createSlider(minMass, maxMass, startingMass, 0)
      .parent(massContainer)
      .class('sketch-slider')
      .input(() => {
        massLabel.html(`Masse: ${massSlider.value().toFixed(2)} kg`)
        cube.mass = massSlider.value()
        cube.calcDim()
        cube.calcForce()
        controller.display()
      })
    massLabel.html(`Masse: ${massSlider.value().toFixed(2)} kg`)

    const gravityContainer = p
      .createDiv()
      .parent(controlContainer)
      .class('sketch-input-container')
    const gravityLabel = p.createDiv().parent(gravityContainer)
    gravitySlider = p
      .createSlider(minGravity, maxGravity, startingGravity, 0)
      .parent(gravityContainer)
      .class('sketch-slider')
      .input(() => {
        gravityLabel.html(
          `Ortsfaktor: ${gravitySlider.value().toFixed(2)} m/s<sup>2</sup>`
        )
        controller.gravity = gravitySlider.value()
        cube.calcForce()
        controller.display()
      })
    gravityLabel.html(
      `Ortsfaktor: ${gravitySlider.value().toFixed(2)} m/s<sup>2</sup>`
    )

    controller.display()
  }

  class Controller {
    constructor(p) {
      this.p = p
      this.gravity = 9.81
    }
    update() {}
    display() {
      this.p.noStroke()
      this.p.fill(180)
      this.p.rect(0, 0, this.p.width, this.p.height)

      this.p.fill(0)
      this.p.textSize(20)
      this.p.textAlign(this.p.LEFT, this.p.TOP)
      this.p.text(`Gewichtskraft: ${Math.round(cube.force)} N`, 10, 10)

      dyn.display()
      cube.display()
    }
  }

  class Cube {
    constructor(p) {
      this.p = p
      this.height = p.height / scale
      this.mass = startingMass
      this.calcDim()
      this.calcForce()
      this.hookRadius = 8
      this.y = dyn.entLength + this.hookRadius
      this.vector = new Vector(
        p,
        p.width / 2,
        this.y + this.dim,
        0,
        this.force / 3,
        '#395d66'
      )
    }
    calcDim() {
      this.dim = this.mass ** (1 / 3) * scale * 5
    }
    calcForce() {
      this.force = this.mass * controller.gravity
    }
    update() {
      this.y = dyn.entLength + this.hookRadius

      this.vector.length = this.force / 3
      this.vector.y1 = this.y + this.dim / 2
    }
    display() {
      this.update()
      this.p.strokeWeight(3)
      this.p.stroke(80)
      this.p.line(
        this.p.width / 2,
        dyn.entLength - this.hookRadius,
        this.p.width / 2,
        dyn.entLength + this.hookRadius
      )

      this.p.strokeWeight(1)
      this.p.fill(0)
      this.p.square(this.p.width / 2 - this.dim / 2, this.y, this.dim)

      this.vector.display()
    }
  }

  class Dynamometer {
    constructor(p) {
      this.p = p
      this.w = 20
      this.h = 80
      this.ext = 0
      //extension width
      this.extw = this.w - 2
      this.extLength = this.h + this.ext

      this.springConst = 100

      this.hookRadius = 10
      this.hookDiameter = this.hookRadius * 2
      this.hookLength = 4

      // Entire length
      this.entLength = this.extLength + this.hookLength + this.hookDiameter
    }
    update() {
      this.ext = (cube.force / this.springConst) * scale
      this.extLength = this.h + this.ext
      this.entLength = this.extLength + this.hookLength + this.hookDiameter
    }
    display() {
      this.update()
      this.p.stroke(100)
      this.p.strokeWeight(1)
      this.p.fill(80)
      this.p.rect(this.p.width / 2 - this.w / 2, 0, this.w, this.h)
      this.p.fill(100)
      this.p.rect(this.p.width / 2 - this.extw / 2, this.h, this.extw, this.ext)

      this.p.strokeWeight(3)
      this.p.line(
        this.p.width / 2,
        this.h + this.ext,
        this.p.width / 2,
        this.extLength + this.hookLength
      )
      this.p.noFill()
      this.p.arc(
        this.p.width / 2,
        this.extLength + this.hookLength + this.hookRadius,
        this.hookDiameter,
        this.hookDiameter,
        Math.PI * 1.5,
        Math.PI
      )
    }
  }

  return <Sketch setup={setup} />
}

export default MassSketch
