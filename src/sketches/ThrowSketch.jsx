import Sketch from 'react-p5'

function ThrowSketch() {
  const frames = 60
  const scale = 17
  const g = 9.81
  const ballRadius = 7

  let controller
  // let pauseBtn
  let angleSlider
  let heightSlider
  let velSlider

  const minAngle = 10
  const maxAngle = 90
  const startingAngle = 40
  const minHeight = 0
  const maxHeight = 3
  const startingHeight = 0
  const minVel = 0.3
  const maxVel = 1
  const startingVel = 0.7

  let ball
  const balls = []
  const setup = (p, canvasParentRef) => {
    p.createCanvas(800, 500).parent(canvasParentRef)
    p.frameRate(frames)
    p.background(180)

    controller = new Controller(p)

    const controlContainer = p
      .createDiv()
      .parent(canvasParentRef)
      .class('sketch-control highlight-box')

    // pauseBtn = p
    //   .createButton('Stoppen')
    //   .parent(controlContainer)
    //   .class('btn')
    //   .mousePressed(() => {
    //     controller.handleLoop()
    //   })

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
        ball.offsetY = heightSlider.value() * scale
        ball.calcY()
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
        ball.startv = velSlider.value() * scale
        ball.calcVel()
      })
    velLabel.html(`Anfangsgeschwindigkeit: ${velSlider.value().toFixed(2)} m/s`)

    ball = new Ball(p)
  }
  const draw = (p) => {
    p.background(180)

    balls.forEach((ball) => {
      p.circle(ball.x, ball.y, ballRadius * 2)
    })
    ball.display()
  }

  class Controller {
    constructor(p) {
      this.p = p
    }
    // handleLoop() {
    //   if (this.p.isLooping()) {
    //     this.p.noLoop()
    //     pauseBtn.html('Fortfahren')
    //   } else {
    //     this.p.loop()
    //     pauseBtn.html('Stoppen')
    //   }
    // }
  }

  class Ball {
    constructor(p) {
      this.p = p
      this.radius = ballRadius
      this.platformWidth = 50
      this.offsetY = heightSlider.value() * scale
      this.x = this.platformWidth / 2
      this.calcY()
      this.angle = (angleSlider.value() / 360) * Math.PI * 2
      this.shot = false
      this.landed = false

      this.startv = velSlider.value() * scale

      this.calcVel()
      this.ay = (g / frames ** 2) * scale
      console.log(this.vy, this.vx, this.ay)
    }
    calcY() {
      if (!this.shot) {
        this.y = this.p.height - this.radius - this.offsetY
      }
    }
    calcVel() {
      if (!this.shot) {
        this.vx = ((Math.cos(this.angle) * this.startv) / frames) * scale
        this.vy = ((Math.sin(this.angle) * this.startv) / frames) * scale
      }
    }
    checkCollision() {
      if (this.y - this.vy + this.radius > this.p.height) {
        // Der Teil der Geschwindigkeit, den der Ball noch zurücklegt
        const partOfDistance = Math.abs(
          (this.p.height - (this.y + this.radius)) / this.vy
        )
        this.x += this.vx * partOfDistance
        this.y = this.p.height - this.radius
        this.vy = 0
        this.vx = 0
        this.landed = true
        balls.push({ x: this.x, y: this.y })
        ball = new Ball(this.p)
      }
    }
    checkHitWall() {
      // Hit right or left wall
      if (
        this.x + this.radius + this.vx > this.p.width ||
        this.x - this.radius + this.vx < 0
      ) {
        this.vx *= -1
      }

      // Hit the top
      if (this.y - this.radius - this.vy < 0) {
        this.vy *= -1
      }
    }
    update() {
      this.checkCollision()
      this.checkHitWall()

      this.x += this.vx
      this.y -= this.vy

      this.vy -= this.ay
    }

    display() {
      if (this.shot) {
        this.update()
      }
      this.p.fill('#f25c05')
      this.p.circle(this.x, this.y, this.radius * 2)

      this.p.fill('#888')
      if (this.offsetY !== 0) {
        this.p.rect(
          0,
          this.p.height - this.offsetY,
          this.platformWidth,
          this.offsetY
        )
      }
    }
  }

  return <Sketch setup={setup} draw={draw} />
}

export default ThrowSketch
