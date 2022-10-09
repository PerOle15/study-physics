import Sketch from 'react-p5'

export default function CollisionSketch() {
  const frames = 60
  const scale = 25
  const textSize = 16
  const trainLength = 4
  const elastic = true

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

    trainLeft = new Train(p, 0, 0, 5, 1000, '#f08d54')
    trainRight = new Train(
      p,
      p.width / scale - trainLength,
      0,
      -5,
      10000,
      '#607d84'
    )

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

    const elasticContainer = p
      .createDiv()
      .parent(controlContainer)
      .class('sketch-input-container')
    p.createDiv().parent(elasticContainer).html('Elastischer Stoss')
    // checkbox
    const checkBox = p
      .createCheckbox('', elastic)
      .parent(elasticContainer)
      .class('switch')
      .changed(() => {
        controller.elastic = checkBox.checked()
      })
    //Span for checkbox
    p.createSpan().parent(checkBox).class('slider round')

    const m1Container = p
      .createDiv()
      .parent(controlContainer)
      .class('sketch-input-container')
    const m1Label = p.createDiv().parent(m1Container)
    m1Slider = p
      .createSlider(minMass, maxMass, (startingMass / (Math.PI * 2)) * 360, 0)
      .parent(m1Container)
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
      this.elastic = elastic
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
      trainRight.x = this.p.width / scale - trainLength
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
    constructor(p, x, startingAcc, startingVel, mass, color) {
      this.p = p
      this.width = this.p.width / scale
      this.height = this.p.height / scale
      this.mass = mass
      this.color = color
      this.h = 2
      this.l = trainLength
      this.wheelRadius = 7 / scale
      this.wheelY = this.height - this.wheelRadius

      this.acc = startingAcc
      this.vel = startingVel
      this.x = x
      this.right = this.x + this.l
      this.y = this.height - this.h - 2 * this.wheelRadius
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

        if (controller.elastic) {
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
      if (this.x + this.l + this.vel > this.width) {
        // Teil der Geschwindigkeit bei Aufprall mit der Seite speichern, damit immer die ganze Strecke genutzt wird.
        const partvel = this.vel - (this.width - this.x - this.l)
        this.x = this.width - this.l - partvel
        this.vel *= -1
      } else if (this.x + this.vel < 0) {
        const partvel = -this.vel - this.x
        this.x = partvel
        this.vel *= -1
      } else {
        this.x += this.vel
      }
      this.right = this.x + this.l
    }
    display() {
      this.update()

      this.p.fill(this.color)
      this.p.rect(
        this.x * scale,
        this.y * scale,
        this.l * scale,
        this.h * scale
      )
      this.p.circle(
        (this.x + this.wheelRadius) * scale,
        this.wheelY * scale,
        this.wheelRadius * 2 * scale
      )
      this.p.circle(
        (this.x + this.l / 2) * scale,
        this.wheelY * scale,
        this.wheelRadius * 2 * scale
      )
      this.p.circle(
        (this.x + this.l - this.wheelRadius) * scale,
        this.wheelY * scale,
        this.wheelRadius * 2 * scale
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
