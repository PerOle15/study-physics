import Sketch from 'react-p5'

import { useEffect } from 'react'

function PlaneSketch(props) {
  let controller
  let plane
  let block
  const blockScale = 75
  const frames = 40
  const localGravity = 9.81

  const startingAngle = Math.PI / 12
  const startingStaticFriction = 0.25
  const startingSlidingFriction = 0.25

  const minDegreeAngle = 10
  const maxDegreeAngle = 30
  const minRadianAngle = (minDegreeAngle / 360) * Math.PI * 2
  const maxRadianAngle = (maxDegreeAngle / 360) * Math.PI * 2

  const minSlidingFriction = 0.1
  const minStaticFriction = 0.1
  const maxSlidingFriction = 0.9
  const maxStaticFriction = 0.9

  let degreeInput = document.getElementById('degree-input')
  let radianInput = document.getElementById('radian-input')
  let staticFrictionInput = document.getElementById('static-friction-input')
  let slidingFrictionInput = document.getElementById('sliding-friction-input')
  useEffect(() => {
    degreeInput = document.getElementById('degree-input')
    radianInput = document.getElementById('radian-input')
    staticFrictionInput = document.getElementById('static-friction-input')
    slidingFrictionInput = document.getElementById('sliding-friction-input')
  })

  const setup = (p, canvasParentRef) => {
    p.createCanvas(800, 500).parent(canvasParentRef)
    p.frameRate(frames)
    p.background(180)

    controller = new Controller(p)
    plane = new Plane(p)
    block = new Block(p)
    radianInput.value = startingAngle
    degreeInput.value = (startingAngle / (Math.PI * 2)) * 360
    slidingFrictionInput.value = startingSlidingFriction
    staticFrictionInput.value = startingStaticFriction
  }

  const draw = (p) => {
    controller.display(p)
    radianInput.value = plane.angle
    degreeInput.value = (plane.angle / (Math.PI * 2)) * 360
    staticFrictionInput.value = plane.staticFriction
    slidingFrictionInput.value = plane.slidingFriction

    // if (!focused) {
    //   pauseBtn.innerText = 'Fortfahren'
    //   noLoop()
    // }
  }

  // resetBtn.addEventListener('click', () => {
  //   resetCanvas()
  //   display()
  // })

  const windowResized = (p) => {
    // p.resizeCanvas(document.body.clientWidth, document.body.clientHeight)
  }

  function handleReset(e) {
    e.preventDefault()
    controller.resetCanvas()
  }

  function handleAngleChange(e) {
    // value bigger than max value
    if (
      (e.target.id === 'degree-input' && e.target.value > maxDegreeAngle) ||
      (e.target.id === 'radian-input' && e.target.value > maxRadianAngle)
    ) {
      e.target.value =
        e.target.id === 'degree-input' ? maxDegreeAngle : maxRadianAngle
    }
    // value smaller than max value
    if (
      (e.target.id === 'degree-input' && e.target.value < minDegreeAngle) ||
      (e.target.id === 'radian-input' && e.target.value < minRadianAngle)
    ) {
      e.target.value =
        e.target.id === 'degree-input' ? minDegreeAngle : minRadianAngle
    }
    let radians =
      e.target.id === 'degree-input'
        ? (e.target.value / 360) * Math.PI * 2
        : e.target.value
    // setRadianAngle(radians)
    // plane.angle = radians

    let degrees =
      e.target.id === 'degree-input'
        ? e.target.value
        : (e.target.value / (Math.PI * 2)) * 360

    // setDegreeAngle(degrees)
    degreeInput.value = degrees
    radianInput.value = radians
  }

  function handleSlidingFrictionChange(e) {
    e.preventDefault()
  }

  function handleStaticFrictionChange(e) {
    e.preventDefault()
    // staticFrictionInput.value = Number(e.target.value)
  }

  function handlePause(e) {
    e.preventDefault()
    controller.handleLoop()
  }

  class Controller {
    constructor(p) {
      this.p = p
    }
    display() {
      this.p.fill(180)
      this.p.rect(0, 0, this.p.width, this.p.height)

      plane.display()
      block.display()
    }
    resetCanvas() {
      block.velocity = 0
      block.acceleration = 0
      block.x1 = 20
    }
    handleLoop() {
      const pauseBtn = document.getElementById('pause-btn')
      if (this.p.isLooping()) {
        this.p.noLoop()
        pauseBtn.innerText = 'Fortfahren'
      } else {
        this.p.loop()
        pauseBtn.innerText = 'Stoppen'
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
      this.angle = Number(radianInput.value)
      this.staticFriction = Number(staticFrictionInput.value)
      this.slidingFriction = Number(slidingFrictionInput.value)
      this.distance = this.p.width / Math.cos(this.angle)
      this.x2 = this.p.width
      this.y2 = this.p.height
      this.x1 = 0
      this.y1 = this.y2 - this.distance * Math.sin(this.angle)
    }

    display() {
      this.update()
      this.p.stroke(0)
      this.p.stroke('blue')
      this.p.line(this.x1, this.y1, this.x2, this.y2)
    }
  }

  class Block {
    constructor(p) {
      this.p = p
      this.mass = 2
      this.dimensions = Math.cbrt(this.mass)
      this.displayDimensions = this.dimensions * blockScale
      this.x1 = 20
      // this.displayDimensions / cos(plane.angle) ergibt den Abstand von der Ebene zur
      this.calcPosition()

      this.acceleration = 0
      this.velocity = 0
    }
    calcPosition() {
      this.y1 =
        plane.y1 +
        Math.sin(plane.angle) * (this.x1 / Math.cos(plane.angle)) -
        this.displayDimensions / Math.cos(plane.angle)
      if (this.y1 < 0) {
        this.x1 =
          this.displayDimensions /
            Math.cos(plane.angle) /
            Math.tan(plane.angle) -
          plane.y1 / Math.tan(plane.angle)
        this.y1 =
          plane.y1 +
          Math.sin(plane.angle) * (this.x1 / Math.cos(plane.angle)) -
          this.displayDimensions / Math.cos(plane.angle)
      }
      this.x2 = this.x1 + Math.cos(plane.angle) * this.displayDimensions
      this.y2 = this.y1 + Math.sin(plane.angle) * this.displayDimensions
      this.x3 =
        this.x2 + Math.cos(plane.angle + Math.PI / 2) * this.displayDimensions
      this.y3 =
        this.y2 + Math.sin(plane.angle + Math.PI / 2) * this.displayDimensions
      this.x4 =
        this.x1 + Math.cos(plane.angle + Math.PI / 2) * this.displayDimensions
      this.y4 =
        this.y1 + Math.sin(plane.angle + Math.PI / 2) * this.displayDimensions
    }
    update() {
      if (this.p.isLooping()) {
        this.gravitationalForce = this.p.createVector(
          0,
          this.mass * localGravity
        )
        this.perpendicularLength =
          this.gravitationalForce.mag() * Math.cos(plane.angle)
        this.perpendicularForce = this.p.createVector(
          this.perpendicularLength * Math.sin(plane.angle),
          -this.perpendicularLength * Math.cos(plane.angle)
        )
        this.frictionLength = this.perpendicularLength * plane.staticFriction
        this.resultingLength =
          Math.sqrt(
            Math.pow(this.gravitationalForce.x + this.perpendicularForce.x, 2) +
              Math.pow(this.gravitationalForce.y + this.perpendicularForce.y, 2)
          ) - this.frictionLength

        if (this.resultingLength > 0) {
          this.resultingForce = this.p.createVector(
            this.resultingLength * Math.cos(plane.angle),
            this.resultingLength * Math.sin(plane.angle)
          )
        } else {
          if (this.velocity > 0) {
            this.resultingForce = this.p.createVector(
              this.resultingLength * Math.cos(plane.angle),
              this.resultingLength * Math.sin(plane.angle)
            )
          } else {
            this.resultingForce = this.p.createVector(0, 0)
          }
        }

        this.acceleration = this.resultingForce.x / this.mass / frames
        this.velocity += this.acceleration

        if (this.velocity < 0) {
          this.velocity = 0
        }

        this.x1 += this.velocity
        if (
          this.x1 + Math.cos(plane.angle) * this.displayDimensions >
          this.p.width
        ) {
          this.x1 =
            this.p.width - Math.cos(plane.angle) * this.displayDimensions
        }
      }
      this.calcPosition()
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

  return (
    <>
      <Sketch setup={setup} draw={draw} windowResized={windowResized} />
      <form className='sketch-control'>
        <button id='pause-btn' className='btn pause-btn' onClick={handlePause}>
          Stoppen
        </button>
        <button className='btn reset-btn' onClick={handleReset}>
          Zurücksetzen
        </button>
        <label>Winkel in °:</label>
        <input
          type='range'
          id='degree-input'
          onInput={handleAngleChange}
          min={minDegreeAngle}
          max={maxDegreeAngle}
          step='0.00001'
        />
        <label>Winkel in Radianten:</label>
        <input
          type='range'
          id='radian-input'
          onInput={handleAngleChange}
          min={minRadianAngle}
          max={maxRadianAngle}
          step='0.00001'
        />
        <label>Haftreibungszahl:</label>
        <input
          type='range'
          id='static-friction-input'
          min={minStaticFriction}
          max={maxStaticFriction}
          step='0.01'
          onChange={handleStaticFrictionChange}
        />
        <label>Gleitreibungszahl:</label>
        <input
          type='range'
          id='sliding-friction-input'
          min={minSlidingFriction}
          max={maxSlidingFriction}
          step='0.01'
          onChange={handleSlidingFrictionChange}
        />
      </form>
    </>
  )
}

export default PlaneSketch
