import Sketch from 'react-p5'
import Vector from '../utils/Vector'

function ThrowSketch() {
  const frames = 60
  const scale = 40
  const vectorScale = 10
  const g = 9.81
  const ballRadius = 7

  let angleSlider
  let heightSlider
  let velSlider

  const minAngle = 10
  const maxAngle = 90
  const startingAngle = 40
  const minHeight = 0
  const maxHeight = 4
  const startingHeight = 0
  const minVel = 5
  const maxVel = 12
  const startingVel = 10

  let ball
  const balls = []
  const setup = (p, canvasParentRef) => {
    p.createCanvas(800, 500).parent(canvasParentRef)
    p.frameRate(frames)
    p.background(180)

    const controlContainer = p
      .createDiv()
      .parent(canvasParentRef)
      .class('sketch-control highlight-box')

    // Shoot Button
    p.createButton('Werfen')
      .parent(controlContainer)
      .class('btn')
      .mousePressed(() => {
        ball.shot = true
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
        angleLabel.html(`Anfangswinkel: ${angleSlider.value().toFixed(2)} °`)
        ball.angle = (angleSlider.value() / 360) * Math.PI * 2
        ball.calcVel()
        ball.updateVector()
      })
    angleLabel.html(`Anfangswinkel: ${angleSlider.value().toFixed(2)} °`)

    const heightContainer = p
      .createDiv()
      .parent(controlContainer)
      .class('sketch-input-container')
    const heightLabel = p.createDiv().parent(heightContainer)
    heightSlider = p
      .createSlider(minHeight, maxHeight, startingHeight, 0)
      .parent(heightContainer)
      .class('sketch-slider')
      .input(() => {
        heightLabel.html(`Anfangshöhe: ${heightSlider.value().toFixed(2)} m`)
        ball.offsetY = heightSlider.value()
        ball.calcY()
        ball.updateVector()
      })
    heightLabel.html(`Anfangshöhe: ${heightSlider.value().toFixed(2)} m`)

    const velContainer = p
      .createDiv()
      .parent(controlContainer)
      .class('sketch-input-container')
    const velLabel = p.createDiv().parent(velContainer)
    velSlider = p
      .createSlider(minVel, maxVel, startingVel, 0)
      .parent(velContainer)
      .class('sketch-slider')
      .input(() => {
        velLabel.html(
          `Anfangsgeschwindigkeit: ${velSlider.value().toFixed(2)} m/s`
        )
        ball.startv = velSlider.value()
        ball.calcVel()
        ball.updateVector()
      })
    velLabel.html(`Anfangsgeschwindigkeit: ${velSlider.value().toFixed(2)} m/s`)

    ball = new Ball(p)
  }
  const draw = (p) => {
    p.background(180)

    // Draw platform
    p.fill('#888')
    if (ball.offsetY !== 0) {
      p.rect(
        0,
        p.height - ball.offsetY * scale,
        ball.platformWidth * scale,
        ball.offsetY * scale
      )
    }

    // Draw balls
    p.fill('#999')
    balls.forEach((ball) => {
      p.circle(ball.x, ball.y, ballRadius * 2)
    })
    ball.display()
  }

  class Ball {
    constructor(p) {
      this.p = p
      this.width = this.p.width / scale
      this.height = this.p.height / scale
      this.radius = ballRadius / scale
      this.platformWidth = 70 / scale
      this.offsetY = heightSlider.value()
      this.x = this.platformWidth / 2
      this.calcY()
      this.angle = (angleSlider.value() / 360) * Math.PI * 2
      this.shot = false
      this.landed = false

      this.startv = velSlider.value()

      this.calcVel()
      this.ay = g / frames

      this.velVector = new Vector(
        p,
        this.x * scale,
        this.y * scale,
        Math.PI / 2 + this.angle,
        this.startv * vectorScale
      )
    }
    calcY() {
      if (!this.shot) {
        this.y = this.height - this.radius - this.offsetY
      }
    }
    calcVel() {
      if (!this.shot) {
        this.vx = Math.cos(this.angle) * this.startv
        this.vy = Math.sin(this.angle) * this.startv
      }
    }
    checkCollision() {
      if (this.y - this.vy / frames + this.radius > this.height) {
        // Der Teil der Geschwindigkeit, den der Ball noch zurücklegt
        const partOfDistance = Math.abs(
          (this.height - (this.y + this.radius)) / (this.vy / frames)
        )
        this.x += (this.vx / frames) * partOfDistance
        this.y = this.height - this.radius
        this.vy = 0
        this.vx = 0
        this.landed = true
        balls.push({ x: this.x * scale, y: this.p.height - ballRadius })
        ball = new Ball(this.p)
      }
    }
    checkHitWall() {
      // Hit right or left wall
      if (
        this.x + this.radius + this.vx / frames > this.width ||
        this.x - this.radius + this.vx / frames < 0
      ) {
        this.vx *= -1
      }

      // Hit the top
      if (this.y - this.radius - this.vy / frames < 0) {
        this.vy *= -1
      }
    }
    updateVector() {
      this.velVector.length =
        Math.sqrt(this.vx ** 2 + this.vy ** 2) * vectorScale
      this.velVector.angle = Math.atan(this.vy / this.vx) + Math.PI / 2
      this.velVector.x1 = this.x * scale
      this.velVector.y1 = this.y * scale
    }
    update() {
      this.checkCollision()
      this.checkHitWall()

      this.x += this.vx / frames
      this.y -= this.vy / frames

      this.updateVector()

      this.vy -= this.ay
    }

    display() {
      if (this.shot) {
        this.update()
      }
      this.p.fill('#f25c05')
      this.p.circle(this.x * scale, this.y * scale, this.radius * 2 * scale)

      this.velVector.display()

      this.p.fill(0)
      this.p.noStroke()
      const distFromVec = 20
      this.p.textSize(16)
      this.p.textAlign(this.p.CENTER, this.p.CENTER)
      this.p.text(
        this.shot ? 'v' : 'v_0',
        this.velVector.x2 +
          Math.cos(this.velVector.angle - Math.PI / 2) * distFromVec,
        this.velVector.y2 -
          Math.sin(this.velVector.angle - Math.PI / 2) * distFromVec
      )

      this.p.strokeWeight(1)
      this.p.stroke(0)
    }
  }

  return <Sketch setup={setup} draw={draw} />
}

export default ThrowSketch

// Vektor zur Anzeige der Geschwindigkeit
