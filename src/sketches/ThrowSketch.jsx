import Sketch from 'react-p5'

function ThrowSketch() {
  const frames = 60
  const scale = 15
  const g = 9.81

  let clearAll

  const balls = []
  const setup = (p, canvasParentRef) => {
    p.createCanvas(800, 500).parent(canvasParentRef)
    p.frameRate(frames)
    p.background(180)

    balls.push(new Ball(p))
  }
  const draw = (p) => {
    p.background(180)

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
      this.angle = Math.PI / 3

      this.startv = 20

      this.vx = ((Math.cos(this.angle) * this.startv) / frames) * scale
      this.vy = ((Math.sin(this.angle) * this.startv) / frames) * scale
      this.ay = (g / frames ** 2) * scale
      console.log(this.vx, this.vy)
    }

    update() {
      this.x += this.vx
      this.y -= this.vy

      this.vy -= this.ay
    }

    display() {
      this.update()
      this.p.fill('#f25c05')
      this.p.circle(this.x, this.y, this.radius * 2)
    }
  }

  return <Sketch setup={setup} draw={draw} />
}

export default ThrowSketch
