import Sketch from 'react-p5'
import React from 'react'

function PendulumSketch() {
  const frames = 30
  const scale = 100
  const localGravity = 9.81

  let pendulum

  const setup = (p, canvasParentRef) => {
    p.createCanvas(800, 500).parent(canvasParentRef)
    p.frameRate(frames)
    p.background(180)

    pendulum = new Pendulum(p)
    pendulum.display()
  }

  const draw = (p) => {
    p.fill(180)
    p.rect(0, 0, p.width, p.height)
    pendulum.display()
  }

  class Pendulum {
    constructor(p) {
      this.p = p
      this.mass = 1
      this.length = 2
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
      this.gravitationalForce = localGravity * this.mass
      this.resultingForce = -(Math.sin(this.angle) * this.gravitationalForce)
      this.angleAcceleration =
        Math.atan(this.resultingForce / this.length) / this.mass / frames
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
