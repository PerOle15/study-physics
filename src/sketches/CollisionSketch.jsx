import Sketch from 'react-p5'

export default function CollisionSketch() {
  const frames = 60
  const scale = 25
  const textSize = 16
  const trainLength = 100
  let elastic = true

  let controller
  let trainLeft
  let trainRight

  let pauseBtn
  let m1Slider
  let m2Slider
  let v1Slider
  let v2Slider

  const minMass = 1
  const maxMass = 10
  const startingMass = 5

  const setup = (p, canvasParentRef) => {
    p.createCanvas(800, 500).parent(canvasParentRef)
    p.frameRate(frames)
    p.background(180)

    controller = new Controller(p)

    trainLeft = new Train(p, 0, 0, 10, 1000)
    trainRight = new Train(p, p.width - trainLength, 0, -10, 10000)

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
    const m1Label = p.createDiv().parent(degreeContainer)
    m1Slider = p
      .createSlider(minMass, maxMass, (startingMass / (Math.PI * 2)) * 360, 0)
      .parent(degreeContainer)
      .class('sketch-slider')
      .input(() => {
        if (!p.isLooping()) {
          controller.display()
        }
        const newMass = m1Slider.value()
        // set m1Label value
        m1Label.html(`Masse 1: ${newMass.toFixed(2)} kg`)
        trainLeft.mass = newMass
      })
    m1Label.html(`Masse 1: ${m1Slider.value().toFixed(2)} kg`)
  }

  const draw = (p) => {
    controller.display()
  }

  class Controller {
    constructor(p) {
      this.p = p
    }
    display() {
      this.p.background(180)

      trainLeft.checkCollision(trainRight)
      trainLeft.display()
      trainRight.display()

      this.p.fill(0)
      this.p.textAlign(this.p.LEFT, this.p.TOP)
      this.p.textSize(textSize)
      this.p.text(`${trainLeft.vel.toFixed(2)} m/s`, 10, 10)
    }
    resetCanvas() {
      trainLeft.x = 0
      trainRight.x = this.p.width - trainLength
      controller.display()
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

  class Train {
    constructor(p, x, startingAcc, startingVel, mass) {
      this.p = p
      this.mass = mass
      this.h = 50
      this.l = trainLength
      this.wheelRadius = 7
      this.wheelY = this.p.height - this.wheelRadius

      this.acc = startingAcc * scale
      this.vel = startingVel
      this.x = x
      this.right = this.x + this.l
      this.y = this.p.height - this.h - 2 * this.wheelRadius
      this.momentum = this.mass * this.vel
    }
    checkCollision(other) {
      // This train is left, the other one comes from the right
      const collisionLeft = this.x + this.l > other.x && this.x < other.x
      // This train is right, the other one comes from the left
      const collisionRight =
        this.x < other.x + other.l && this.x + this.l > other.x
      if (collisionLeft || collisionRight) {
        const mediumV =
          (this.mass * this.vel + other.mass * other.vel) /
          (this.mass + other.mass)

        if (elastic) {
          // If elastic collision
          this.vel = 2 * mediumV - this.vel
          other.vel = 2 * mediumV - other.vel
        } else {
          // If inelastic collision
          this.vel = mediumV
          other.vel = mediumV

          if (collisionLeft) {
            other.x = this.x + this.l + 1
          } else {
            other.x = this.x - this.l - 1
          }
        }
      } else {
        return
      }
    }
    checkHitWall() {}
    update() {
      this.vel += this.acc / frames ** 2
      this.scaledVel = (this.vel / frames) * scale
      if (this.x + this.l + this.scaledVel > this.p.width) {
        // Teil der Geschwindigkeit bei Aufprall mit der Seite speichern, damit immer die ganze Strecke genutzt wird.
        const partvel = this.scaledVel - (this.p.width - this.x - this.l)
        this.x = this.p.width - this.l - partvel
        this.vel *= -1
      } else if (this.x + this.scaledVel < 0) {
        const partvel = -this.scaledVel - this.x
        this.x = partvel
        this.vel *= -1
      } else {
        this.x += this.scaledVel
      }
      this.right = this.x + this.l
    }
    display() {
      this.update()

      this.p.fill('#f08d54')
      this.p.rect(this.x, this.y, this.l, this.h)
      this.p.circle(
        this.x + this.wheelRadius,
        this.wheelY,
        this.wheelRadius * 2
      )
      this.p.circle(this.x + this.l / 2, this.wheelY, this.wheelRadius * 2)
      this.p.circle(
        this.x + this.l - this.wheelRadius,
        this.wheelY,
        this.wheelRadius * 2
      )
    }
  }

  class Diagram {
    constructor(p) {
      this.p = p
    }
  }

  return <Sketch setup={setup} draw={draw} />
}
