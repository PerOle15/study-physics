import Sketch from 'react-p5'
import React from 'react'

function PendulumSketch() {
  const frames = 60
  const scale = 100
  const localGravity = 9.81

  const minLength = 0.5
  const maxLength = 3
  const startingLength = 1
  const minMass = 0.5
  const maxMass = 5
  const startingMass = 1
  const minAngle = 5
  const maxAngle = 80
  const startingAngle = 50

  let lengthSlider
  let massSlider
  let angleSlider

  let pendulum

  const setup = (p, canvasParentRef) => {
    p.createCanvas(800, 500).parent(canvasParentRef)
    p.frameRate(frames)
    p.background(180)

    pendulum = new Pendulum(p)

    const controlContainer = p
      .createDiv()
      .parent(canvasParentRef)
      .class('sketch-control')

    const pauseBtn = p
      .createButton('Stoppen')
      .parent(controlContainer)
      .class('btn sketch-btn')
      .mousePressed(() => {
        pauseBtn.html(p.isLooping() ? 'Fortfahren' : 'Stoppen')

        if (p.isLooping()) {
          p.noLoop()
        } else {
          p.loop()
        }
      })

    const angleContainer = p
      .createDiv()
      .parent(controlContainer)
      .class('sketch-input-container')
    const angleLabel = p.createDiv().parent(angleContainer)
    angleSlider = p
      .createSlider(minAngle, maxAngle, startingAngle, 0)
      .parent(angleContainer)
      .class('sketch-slider')
      .input(() => {
        angleLabel.html(`Anfangswinkel: ${angleSlider.value().toFixed(1)} °`)
        setAngle()
      })
    angleLabel.html(`Anfangswinkel: ${angleSlider.value().toFixed(1)} °`)

    const lengthContainer = p
      .createDiv()
      .parent(controlContainer)
      .class('sketch-input-container')
    const lengthLabel = p.createDiv().parent(lengthContainer)
    lengthSlider = p
      .createSlider(minLength, maxLength, startingLength, 0)
      .parent(lengthContainer)
      .class('sketch-slider')
      .input(() => {
        lengthLabel.html(`Pendellänge: ${lengthSlider.value().toFixed(2)} m`)
        pendulum.length = lengthSlider.value()
        pendulum.displayLength = pendulum.length * scale
        setAngle()
      })
    lengthLabel.html(`Pendellänge: ${lengthSlider.value().toFixed(2)} m`)

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
        massLabel.html(`Pendelmasse: ${massSlider.value().toFixed(2)} kg`)
        pendulum.mass = massSlider.value()
        pendulum.radius =
          (Math.pow((pendulum.mass * 3) / 4 / Math.PI, 1 / 3) / 3) * scale
      })
    massLabel.html(`Pendelmasse: ${massSlider.value().toFixed(2)} kg`)
  }

  const draw = (p) => {
    p.fill(180)
    p.rect(0, 0, p.width, p.height)
    pendulum.display()
  }

  function setAngle() {
    pendulum.angle = (angleSlider.value() / 360) * 2 * Math.PI
    pendulum.angleAcceleration = 0
    pendulum.angleVelocity = 0
  }

  class Pendulum {
    constructor(p) {
      this.p = p
      this.mass = 1
      this.length = startingLength
      this.displayLength = this.length * scale
      this.radius = (Math.pow((this.mass * 3) / 4 / Math.PI, 1 / 3) / 3) * scale
      this.angle = Math.PI / 3
      this.originX = this.p.width / 2
      this.angleVelocity = 0
      this.angleAcceleration = 0
    }

    calcPosition() {
      this.x = Math.sin(this.angle) * this.displayLength + this.originX
      this.y = Math.cos(this.angle) * this.displayLength
    }

    update() {
      this.resultingForce = Math.sin(this.angle) * localGravity
      this.angleAcceleration = -this.resultingForce / this.length / frames ** 2
      this.angleVelocity += this.angleAcceleration
      this.angle += this.angleVelocity

      this.calcPosition()
    }

    display() {
      this.update()
      this.p.stroke(0)
      this.p.fill(0)
      this.p.line(this.p.width / 2, 0, this.x, this.y)
      this.p.circle(this.x, this.y, this.radius)
    }
  }

  return <Sketch setup={setup} draw={draw} />
}

export default PendulumSketch
