import { TIS620 } from 'mysql/lib/protocol/constants/charsets'
import Sketch from 'react-p5'

function ThrowSketch() {
  const frames = 60
  const scale = 10

  let clearAll

  const balls = []
  const setup = (p, canvasParentRef) => {
    p.createCanvas(800, 500).parent(canvasParentRef)
    p.frameRate(frames)
    p.background(180)

    balls.push(new Ball(p))
  }
  const draw = (p) => {
    p.fill(180)
    p.rect(0, 0, p.width, p.height)

    balls.forEach((ball) => {
      ball.display()
    })
  }

  class Ball {
    constructor(p) {
      this.p = p
      this.mass = 0.2
      this.radius = 10
      this.offsetY = 0
      this.x = this.radius
      this.y = this.p.height - this.radius - this.offsetY
      this.aiming = true
      this.angle = Math.PI / 2
      this.force = 100

      this.vx = 0
      this.vy = 0
      this.ax = 0
      this.ay = 0
    }

    update() {
      this.a = this.force / this.mass
    }

    display() {
      this.p.fill('#f25c05')
      this.p.circle(this.x, this.y, this.radius * 2)
    }
  }

  return <Sketch setup={setup} draw={draw} />
}

export default ThrowSketch
