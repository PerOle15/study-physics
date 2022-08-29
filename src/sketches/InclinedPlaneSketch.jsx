import Sketch from 'react-p5'
import Vector from '../utils/Vector'

function InclinedPlaneSketch() {
  let controller
  let plane
  let block
  const scale = 75
  const vectorScale = 2.5
  const frames = 40
  const localGravity = 9.81

  const startingAngle = Math.PI / 12
  const startingStaticFriction = 0.25
  const startingSlidingFriction = 0.25

  const minDegreeAngle = 10
  const maxDegreeAngle = 30

  const minSlidingFriction = 0.1
  const minStaticFriction = 0.1
  const maxSlidingFriction = 0.9
  const maxStaticFriction = 0.9

  // eslint-disable-next-line no-unused-vars
  let pauseBtn
  let degreeSlider
  let degreeLabel
  let staticFrictionSlider
  let staticFrictionLabel
  let slidingFrictionSlider
  let slidingFrictionLabel

  let gravityVector
  let frictionVector
  let normalVector

  const setup = (p, canvasParentRef) => {
    p.createCanvas(800, 500).parent(canvasParentRef)
    p.frameRate(frames)
    p.background(180)

    controller = new Controller(p)
    plane = new Plane(p)
    block = new Block(p)

    const controlContainer = p
      .createDiv()
      .parent(canvasParentRef)
      .class('sketch-control highlight-box')

    pauseBtn = p
      .createButton('Stoppen')
      .parent(controlContainer)
      .class('btn sketch-btn')
      .mousePressed((e) => {
        controller.handleLoop()
      })

    //Reset button
    p.createButton('Zurücksetzen')
      .parent(controlContainer)
      .class('btn sketch-btn')
      .mousePressed((e) => {
        controller.resetCanvas()
      })

    const degreeContainer = p
      .createDiv()
      .parent(controlContainer)
      .class('sketch-input-container')
    degreeLabel = p.createDiv().parent(degreeContainer)
    degreeSlider = p
      .createSlider(
        minDegreeAngle,
        maxDegreeAngle,
        (startingAngle / (Math.PI * 2)) * 360,
        0
      )
      .parent(degreeContainer)
      .class('sketch-slider')
      .input(() => {
        if (!p.isLooping()) {
          controller.display()
        }
        // set degreelabel value
        degreeLabel.html(`Winkel: ${degreeSlider.value().toFixed(2)}°`)
        plane.angle = (degreeSlider.value() / 360) * 2 * Math.PI
        normalVector.angle = -plane.angle
        normalVector.length = block.perpLength * vectorScale
        console.log(normalVector.length)
        frictionVector.angle = -plane.angle - Math.PI / 2
      })
    degreeLabel.html(`Winkel: ${degreeSlider.value().toFixed(2)}°`)

    const staticFrictionContainer = p
      .createDiv()
      .parent(controlContainer)
      .class('sketch-input-container')
    staticFrictionLabel = p.createDiv().parent(staticFrictionContainer)
    staticFrictionSlider = p
      .createSlider(
        minStaticFriction,
        maxStaticFriction,
        startingStaticFriction,
        0
      )
      .parent(staticFrictionContainer)
      .class('sketch-slider')
      .input(() => {
        if (!p.isLooping()) {
          controller.display()
        }
        staticFrictionLabel.html(
          `Haftreibungszahl: ${staticFrictionSlider.value().toFixed(2)}`
        )
      })
    staticFrictionLabel.html(
      `Haftreibungszahl: ${staticFrictionSlider.value().toFixed(2)}`
    )

    const slidingFrictionContainer = p
      .createDiv()
      .parent(controlContainer)
      .class('sketch-input-container')
    slidingFrictionLabel = p.createDiv().parent(slidingFrictionContainer)
    slidingFrictionSlider = p
      .createSlider(
        minSlidingFriction,
        maxSlidingFriction,
        startingSlidingFriction,
        0
      )
      .parent(slidingFrictionContainer)
      .class('sketch-slider')
      .input(() => {
        if (!p.isLooping()) {
          controller.display()
        }
        slidingFrictionLabel.html(
          `Gleitreibungszahl: ${slidingFrictionSlider.value().toFixed(2)}`
        )
      })
    slidingFrictionLabel.html(
      `Gleitreibungszahl: ${slidingFrictionSlider.value().toFixed(2)}`
    )
  }

  const draw = (p) => {
    controller.display(p)
  }

  class Controller {
    constructor(p) {
      this.p = p
    }
    display() {
      this.p.fill(180)
      this.p.noStroke()
      this.p.rect(0, 0, this.p.width, this.p.height)

      plane.display()
      block.display()
      gravityVector.display()
      normalVector.display()
      frictionVector.display()
    }
    resetCanvas() {
      block.velocity = 0
      block.acceleration = 0
      block.x1 = 20
      this.display()
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

  class Plane {
    constructor(p) {
      this.p = p
      this.angle = startingAngle
      this.staticFriction = startingStaticFriction
      this.slidingFriction = startingSlidingFriction
      this.distance = this.p.width / Math.cos(this.angle)
      this.x2 = this.p.width
      this.y2 = this.p.height
      this.x1 = 0
      this.y1 = this.y2 - this.distance * Math.sin(this.angle)
    }

    update() {
      this.staticFriction = staticFrictionSlider.value()
      this.slidingFriction = slidingFrictionSlider.value()
      this.distance = this.p.width / Math.cos(this.angle)
      this.x2 = this.p.width
      this.y2 = this.p.height
      this.x1 = 0
      this.y1 = this.y2 - this.distance * Math.sin(this.angle)
    }

    display() {
      this.update()
      this.p.strokeWeight(1)
      this.p.stroke(80)
      this.p.line(this.x1, this.y1, this.x2, this.y2)
      this.p.fill(120)
      this.p.triangle(this.x1, this.y1, this.x2, this.y2, 0, this.p.height)
    }
  }

  class Block {
    constructor(p) {
      this.p = p
      this.mass = 2
      this.dimensions = Math.cbrt(this.mass)
      this.dispDim = this.dimensions * scale
      this.x1 = 20
      // this.dispDim / cos(plane.angle) ergibt den Abstand von der Ebene zur

      this.acceleration = 0
      this.velocity = 0

      this.calcCenterOfBlock()
      gravityVector = new Vector(
        p,
        this.xCenter,
        this.yCenter,
        0,
        localGravity * this.mass * vectorScale
      )
      this.calcVelocity()
      normalVector = new Vector(
        p,
        (this.x4 + this.x3) / 2,
        (this.y4 + this.y3) / 2,
        -plane.angle,
        this.perpLength * vectorScale
      )
      frictionVector = new Vector(
        p,
        this.x4,
        this.y4,
        -plane.angle - Math.PI / 2,
        this.frictionLength * vectorScale
      )
    }
    calcCenterOfBlock() {
      this.xCenter =
        this.x1 +
        ((Math.pow(2, 1 / 2) * this.dispDim) / 2) *
          Math.cos(plane.angle + Math.PI / 4)
      this.yCenter =
        this.y1 +
        ((Math.pow(2, 1 / 2) * this.dispDim) / 2) *
          Math.sin(plane.angle + Math.PI / 4)
    }
    calcPosition() {
      this.y1 =
        plane.y1 +
        Math.sin(plane.angle) * (this.x1 / Math.cos(plane.angle)) -
        this.dispDim / Math.cos(plane.angle)
      if (this.y1 < 0) {
        this.x1 =
          this.dispDim / Math.cos(plane.angle) / Math.tan(plane.angle) -
          plane.y1 / Math.tan(plane.angle)
        this.y1 =
          plane.y1 +
          Math.sin(plane.angle) * (this.x1 / Math.cos(plane.angle)) -
          this.dispDim / Math.cos(plane.angle)
      }
      this.x2 = this.x1 + Math.cos(plane.angle) * this.dispDim
      this.y2 = this.y1 + Math.sin(plane.angle) * this.dispDim
      this.x3 = this.x2 + Math.cos(plane.angle + Math.PI / 2) * this.dispDim
      this.y3 = this.y2 + Math.sin(plane.angle + Math.PI / 2) * this.dispDim
      this.x4 = this.x1 + Math.cos(plane.angle + Math.PI / 2) * this.dispDim
      this.y4 = this.y1 + Math.sin(plane.angle + Math.PI / 2) * this.dispDim
    }

    calcVelocity() {
      if (this.p.isLooping()) {
        this.gravForce = this.p.createVector(0, this.mass * localGravity)
        this.perpLength = this.gravForce.mag() * Math.cos(plane.angle)
        this.perpForce = this.p.createVector(
          this.perpLength * Math.sin(plane.angle),
          -this.perpLength * Math.cos(plane.angle)
        )
        // Choose static or sliding friction
        this.frictionLength =
          (this.velocity === 0 ? plane.staticFriction : plane.slidingFriction) *
          this.perpLength

        this.resLength =
          Math.sqrt(
            Math.pow(this.gravForce.x + this.perpForce.x, 2) +
              Math.pow(this.gravForce.y + this.perpForce.y, 2)
          ) - this.frictionLength

        if (this.resLength > 0) {
          this.resForce = this.p.createVector(
            this.resLength * Math.cos(plane.angle),
            this.resLength * Math.sin(plane.angle)
          )
        } else {
          if (this.velocity > 0) {
            this.resForce = this.p.createVector(
              this.resLength * Math.cos(plane.angle),
              this.resLength * Math.sin(plane.angle)
            )
          } else {
            this.resForce = this.p.createVector(0, 0)
          }
        }

        this.acceleration = (this.resForce.x / this.mass / frames ** 2) * scale
        this.velocity += this.acceleration

        if (this.velocity < 0) {
          this.velocity = 0
        }

        this.x1 += this.velocity
        if (this.x2 + this.velocity >= this.p.width) {
          this.x1 = this.p.width - Math.cos(plane.angle) * this.dispDim
          this.acceleration = 0
          this.velocity = 0
        }
      }
    }
    update() {
      this.calcVelocity()
      this.calcPosition()
      this.calcCenterOfBlock()
      gravityVector.x1 = this.xCenter
      gravityVector.y1 = this.yCenter
      normalVector.x1 = (this.x4 + this.x3) / 2
      normalVector.y1 = (this.y4 + this.y3) / 2
      frictionVector.x1 = this.x4
      frictionVector.y1 = this.y4
      frictionVector.length = this.frictionLength * vectorScale
      console.log(this.velocity)
    }

    display() {
      this.update()

      this.p.noStroke()
      this.p.fill('salmon')
      this.p.quad(
        this.x1,
        this.y1,
        this.x2,
        this.y2,
        this.x3,
        this.y3,
        this.x4,
        this.y4
      )
    }
  }

  return <Sketch setup={setup} draw={draw} />
}

export default InclinedPlaneSketch
