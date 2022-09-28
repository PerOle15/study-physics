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
        normalVector.angle = -plane.angle + Math.PI
        normalVector.length = block.perpLength * vectorScale
        frictionVector.angle = -plane.angle - Math.PI / 2
      })
    degreeLabel.html(`Winkel: ${degreeSlider.value().toFixed(2)}°`)

    function controlFriction(slidingChanged = false) {
      const staticFriction = staticFrictionSlider.value()
      const slidingFriction = slidingFrictionSlider.value()
      if (!slidingChanged && staticFriction < slidingFriction) {
        slidingFrictionSlider.value(staticFriction)
        slidingFrictionLabel.html(
          `Gleitreibungszahl: ${slidingFrictionSlider.value().toFixed(2)}`
        )
      } else if (slidingChanged && staticFriction < slidingFriction) {
        staticFrictionSlider.value(slidingFriction)
        staticFrictionLabel.html(
          `Haftreibungszahl: ${staticFrictionSlider.value().toFixed(2)}`
        )
      }
    }

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
        controlFriction()
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
      .input((e) => {
        controlFriction(true)
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
      block.x1 = Math.sin(plane.angle) * block.dimensions
      block.calcPosition()
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
      this.width = this.p.width / scale
      this.height = this.p.height / scale
      this.staticFriction = startingStaticFriction
      this.slidingFriction = startingSlidingFriction
      this.distance = this.p.width / Math.cos(this.angle)
      this.x2 = this.width
      this.y2 = this.height
      this.x1 = 0
      this.y1 = this.y2 - this.distance * Math.sin(this.angle)
    }

    update() {
      this.staticFriction = staticFrictionSlider.value()
      this.slidingFriction = slidingFrictionSlider.value()
      this.distance = this.width / Math.cos(this.angle)
      this.x1 = 0
      this.y1 = this.y2 - this.distance * Math.sin(this.angle)
    }

    display() {
      this.update()
      this.p.strokeWeight(1)
      this.p.stroke(80)
      this.p.fill(120)
      this.p.triangle(
        this.x1 * scale,
        this.y1 * scale,
        this.x2 * scale,
        this.y2 * scale,
        0,
        this.p.height
      )
    }
  }

  class Block {
    constructor(p) {
      this.p = p
      this.mass = 2
      this.dimensions = Math.cbrt(this.mass)
      this.x1 = Math.sin(plane.angle) * this.dimensions
      this.height = this.p.height / scale
      this.width = this.p.width / scale
      // this.dimensions / cos(plane.angle) ergibt den Abstand von der Ebene zur

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
        -plane.angle + Math.PI,
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
        ((Math.pow(2, 1 / 2) * this.dimensions) / 2) *
          Math.cos(plane.angle + Math.PI / 4)
      this.yCenter =
        this.y1 +
        ((Math.pow(2, 1 / 2) * this.dimensions) / 2) *
          Math.sin(plane.angle + Math.PI / 4)
    }
    calcPosition() {
      this.y1 =
        plane.y1 +
        Math.sin(plane.angle) * (this.x1 / Math.cos(plane.angle)) -
        this.dimensions / Math.cos(plane.angle)
      if (this.y1 < 0) {
        this.x1 =
          this.dimensions / Math.cos(plane.angle) / Math.tan(plane.angle) -
          plane.y1 / Math.tan(plane.angle)
        this.y1 =
          plane.y1 +
          Math.sin(plane.angle) * (this.x1 / Math.cos(plane.angle)) -
          this.dimensions / Math.cos(plane.angle)
      }
      this.x2 = this.x1 + Math.cos(plane.angle) * this.dimensions
      this.y2 = this.y1 + Math.sin(plane.angle) * this.dimensions
      this.x3 = this.x2 + Math.cos(plane.angle + Math.PI / 2) * this.dimensions
      this.y3 = this.y2 + Math.sin(plane.angle + Math.PI / 2) * this.dimensions
      this.x4 = this.x1 + Math.cos(plane.angle + Math.PI / 2) * this.dimensions
      this.y4 = this.y1 + Math.sin(plane.angle + Math.PI / 2) * this.dimensions

      if (this.x4 < 0) {
        this.x1 = Math.sin(plane.angle) * this.dimensions
        this.calcPosition()
      }
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

        // Stop bug, where block slides because static friction is smaller than sliding friction
        if (
          this.velocity === 0 &&
          plane.slidingFriction * this.perpLength >
            Math.sqrt(
              Math.pow(this.gravForce.x + this.perpForce.x, 2) +
                Math.pow(this.gravForce.y + this.perpForce.y, 2)
            ) -
              plane.slidingFriction * this.perpLength
        ) {
          this.frictionLength = plane.slidingFriction * this.perpLength

          this.resLength =
            Math.sqrt(
              Math.pow(this.gravForce.x + this.perpForce.x, 2) +
                Math.pow(this.gravForce.y + this.perpForce.y, 2)
            ) - this.frictionLength
        }

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

        const maxFrictionLength = this.gravForce.mag() * Math.sin(plane.angle)
        if (this.frictionLength > maxFrictionLength) {
          this.frictionLength = maxFrictionLength
        }

        this.acceleration = this.resForce.x / this.mass / frames ** 2
        this.velocity += this.acceleration

        if (this.velocity < 0) {
          this.velocity = 0
        }

        this.x1 += this.velocity
        if (this.x2 + this.velocity >= this.width) {
          this.x1 = this.width - Math.cos(plane.angle) * this.dimensions
          this.acceleration = 0
          this.velocity = 0
        }
      }
    }
    update() {
      this.calcVelocity()
      this.calcPosition()
      this.calcCenterOfBlock()
      gravityVector.x1 = this.xCenter * scale
      gravityVector.y1 = this.yCenter * scale
      normalVector.x1 = ((this.x4 + this.x3) / 2) * scale
      normalVector.y1 = ((this.y4 + this.y3) / 2) * scale
      frictionVector.x1 = this.x4 * scale
      frictionVector.y1 = this.y4 * scale
      frictionVector.length = this.frictionLength * vectorScale
    }

    display() {
      this.update()

      this.p.noStroke()
      this.p.fill('salmon')
      this.p.quad(
        this.x1 * scale,
        this.y1 * scale,
        this.x2 * scale,
        this.y2 * scale,
        this.x3 * scale,
        this.y3 * scale,
        this.x4 * scale,
        this.y4 * scale
      )
    }
  }

  return <Sketch setup={setup} draw={draw} />
}

export default InclinedPlaneSketch
