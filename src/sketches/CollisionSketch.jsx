import Sketch from 'react-p5'

export default function CollisionSketch() {
  const frames = 60
  const scale = 60
  const textSize = 16
  const trainHeight = 50 / scale
  const trainLength = 100 / scale
  const elastic = true

  const trainLeftColor = '#f08d54'
  const trainRightColor = '#607d84'

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
  const startm1 = 2
  const startm2 = 8
  const minVel = -4
  const maxVel = -minVel
  const startv1 = 2
  const startv2 = -2

  const setup = (p, canvasParentRef) => {
    p.createCanvas(800, 500).parent(canvasParentRef)
    p.frameRate(frames)
    p.background(180)

    controller = new Controller(p)

    trainLeft = new Train(p, 0, startv1, startm1, trainLeftColor)
    trainRight = new Train(
      p,
      p.width / scale - trainLength,
      -startv2,
      startm2,
      trainRightColor
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
        if (checkBox.checked()) {
          controller.collided = false
        }
      })
    //Span for checkbox
    p.createSpan().parent(checkBox).class('slider round')

    const m1Container = p
      .createDiv()
      .parent(controlContainer)
      .class('sketch-input-container')
    const m1Label = p.createDiv().parent(m1Container)
    m1Slider = p
      .createSlider(minMass, maxMass, startm1, 0)
      .parent(m1Container)
      .class('sketch-slider')
      .input(() => {
        const newMass = m1Slider.value()
        // set m1Label value
        m1Label.html(`Masse 1: ${newMass.toFixed(2)} kg`)
        trainLeft.mass = newMass
      })
    m1Label.html(`Masse 1: ${m1Slider.value().toFixed(2)} kg`)

    const m2Container = p
      .createDiv()
      .parent(controlContainer)
      .class('sketch-input-container')
    const m2Label = p.createDiv().parent(m2Container)
    m2Slider = p
      .createSlider(minMass, maxMass, startm2, 0)
      .parent(m2Container)
      .class('sketch-slider')
      .input(() => {
        const newMass = m2Slider.value()
        // set m2Label value
        m2Label.html(`Masse 2: ${newMass.toFixed(2)} kg`)
        trainRight.mass = newMass
      })
    m2Label.html(`Masse 2: ${m2Slider.value().toFixed(2)} kg`)

    const v1Container = p
      .createDiv()
      .parent(controlContainer)
      .class('sketch-input-container')
    const v1Label = p.createDiv().parent(v1Container)
    v1Slider = p
      .createSlider(minVel, maxVel, startv1, 0)
      .parent(v1Container)
      .class('sketch-slider')
      .input(() => {
        const newVel = v1Slider.value()
        // set v1Label value
        v1Label.html(`Startgeschwindigkeit 1: ${newVel.toFixed(2)} m/s`)
        trainLeft.vel = newVel
        trainLeft.vpf = newVel / frames
      })
    v1Label.html(`Startgeschwindigkeit 1: ${v1Slider.value().toFixed(2)} m/s`)

    const v2Container = p
      .createDiv()
      .parent(controlContainer)
      .class('sketch-input-container')
    const v2Label = p.createDiv().parent(v2Container)
    v2Slider = p
      .createSlider(minVel, maxVel, startv2, 0)
      .parent(v2Container)
      .class('sketch-slider')
      .input(() => {
        const newVel = v2Slider.value()
        // set v2Label value
        v2Label.html(`Startgeschwindigkeit 2: ${newVel.toFixed(2)} m/s`)
        trainRight.vel = newVel
        trainRight.vpf = newVel / frames
      })
    v2Label.html(`Startgeschwindigkeit 2: ${v2Slider.value().toFixed(2)} m/s`)
  }

  const draw = (p) => {
    controller.display()
  }

  class Controller {
    constructor(p) {
      this.p = p
      this.elastic = elastic
      this.collided = false
    }
    display() {
      this.p.background(180)

      trainLeft.checkCollision(trainRight)
      trainLeft.checkHitWall(trainRight)
      trainRight.checkHitWall(trainLeft)
      trainLeft.display()
      trainRight.display()

      this.p.fill(0)
      this.p.textAlign(this.p.LEFT, this.p.TOP)
      this.p.textSize(textSize)
      this.p.text(`${(trainLeft.vpf * frames).toFixed(2)} m/s`, 10, 10)
    }
    resetCanvas() {
      this.collided = false
      trainLeft.x = 0
      trainRight.x = this.p.width / scale - trainLength
      trainLeft.vel = v1Slider.value()
      trainRight.vel = v2Slider.value()
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
    constructor(p, x, startingVel, mass, color) {
      this.p = p
      this.width = this.p.width / scale
      this.height = this.p.height / scale
      this.mass = mass
      this.color = color
      this.h = trainHeight
      this.l = trainLength
      this.wheelRadius = 7 / scale
      this.wheelY = this.height - this.wheelRadius

      this.vel = startingVel
      // vpf = velocity per frame
      this.vpf = this.vel / frames
      this.x = x
      this.right = this.x + this.l
      this.y = this.height - this.h - 2 * this.wheelRadius
      this.momentum = this.mass * this.vel
    }
    checkCollision(other) {
      // This train is left, the other one comes from the right
      const collisionLeft =
        this.right + this.vpf > other.x + other.vpf && this.x < other.right
      // This train is right, the other one comes from the left
      const collisionRight =
        this.x < other.x + other.l && this.x + this.l > other.x
      if (collisionLeft || collisionRight) {
        const mediumV =
          (this.mass * this.vpf + other.mass * other.vpf) /
          (this.mass + other.mass)

        if (controller.elastic) {
          // If elastic collision
          this.vpf = 2 * mediumV - this.vpf
          other.vpf = 2 * mediumV - other.vpf
        } else {
          // If inelastic collision
          controller.collided = true
          this.vpf = mediumV
          other.vpf = mediumV

          if (collisionLeft) {
            other.x = this.x + this.l
          } else {
            other.x = this.x - this.l
          }
        }
      } else {
        return
      }
    }
    checkHitWall(other) {
      if (this.x + this.l + this.vpf > this.width) {
        console.log('collided right')
        // Teil der Geschwindigkeit bei Aufprall mit der Seite speichern, damit immer die ganze Strecke genutzt wird.
        const partvpf = this.vpf - (this.width - this.x - this.l)
        this.x = this.width - this.l - partvpf
        this.vpf *= -1
        if (controller.collided) {
          other.x = this.x - other.l
          other.vpf *= -1
        }
      } else if (this.x + this.vpf < 0) {
        console.log('collided left')
        const partvpf = -this.vpf - this.x
        this.x = partvpf
        if (controller.collided) {
          other.x = this.x + this.l
          other.vpf *= -1
        }
        this.vpf *= -1
      } else {
        this.x += this.vpf
      }
    }
    update() {
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
