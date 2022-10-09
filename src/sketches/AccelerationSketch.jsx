import Sketch from 'react-p5'
import Arrow from '../utils/Vector'

function AccelerationSketch() {
  const frames = 60
  const scale = 5

  let train

  let controller

  let pauseBtn
  let accSlider
  let velSlider

  const maxAcc = 2
  const minAcc = -maxAcc
  const startingAcc = 1
  const maxVel = 2
  const minVel = -maxVel
  const startingVel = 0

  const setup = (p, canvasParentRef) => {
    p.createCanvas(800, 500).parent(canvasParentRef)
    p.frameRate(frames)
    p.background(180)

    controller = new Controller(p)
    train = new Train(p)

    const controlContainer = p
      .createDiv()
      .parent(canvasParentRef)
      .class('sketch-control highlight-box')

    pauseBtn = p
      .createButton('Stoppen')
      .parent(controlContainer)
      .class('btn sketch-btn')
      .mousePressed(() => {
        controller.handleLoop()
      })

    const accContainer = p
      .createDiv()
      .parent(controlContainer)
      .class('sketch-input-container')
    const accLabel = p.createDiv().parent(accContainer)
    accSlider = p
      .createSlider(minAcc, maxAcc, startingAcc, 0)
      .parent(accContainer)
      .class('sketch-slider')
      .input(() => {
        accLabel.html(
          `Beschleunigung: ${accSlider.value().toFixed(2)} m/s<sup>2</sup>`
        )
        train.acc = accSlider.value()
      })
    accLabel.html(
      `Beschleunigung: ${accSlider.value().toFixed(2)} m/s<sup>2</sup>`
    )

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
        train.x = train.width / 2 - train.l / 2
        train.vel = velSlider.value()
      })
    velLabel.html(`Anfangsgeschwindigkeit: ${velSlider.value().toFixed(2)} m/s`)
  }

  const draw = (p) => {
    p.fill(180)
    p.rect(0, 0, p.width, p.height)

    train.display()
  }

  class Controller {
    constructor(p) {
      this.p = p
    }
    display() {}
    resetCanvas() {}
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
    constructor(p) {
      this.p = p
      this.width = this.p.width / scale
      this.height = this.p.height / scale
      this.h = 50 / scale
      this.l = 100 / scale
      this.wheelRadius = 7 / scale
      this.wheelY = this.height - this.wheelRadius

      this.acc = startingAcc
      this.vel = startingVel
      this.x = this.width / 2 - this.l / 2
      this.y = this.height - this.h - 2 * this.wheelRadius

      this.diagram = new Diagram(p)
    }

    update() {
      this.vel += this.acc / frames
      if (this.x + this.l + this.vel > this.width) {
        // Teil der Geschwindigkeit bei Aufprall mit der Seite speichern, damit immer die ganze Strecke genutzt wird.
        const partVel = this.vel - (this.width - this.x - this.l)
        this.x = this.width - this.l - partVel
        this.vel *= -1
      } else if (this.x + this.vel < 0) {
        const partVel = -this.vel - this.x
        this.x = partVel
        this.vel *= -1
      } else {
        this.x += this.vel
      }
    }

    display() {
      this.update()

      this.p.fill('#f08d54')
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

      this.diagram.display()
    }
  }

  class Diagram {
    constructor(p) {
      this.p = p
      this.gap = 20
      this.h = this.p.height * 0.75 - this.gap * 2
      this.w = this.p.width - this.gap * 2
      this.x = this.gap
      this.y = this.p.height * 0.75 - this.gap - this.h / 2
      this.xAxis = new Arrow(this.p, this.x, this.y, Math.PI / 2, this.w)
      this.yAxis = new Arrow(
        this.p,
        this.x,
        this.y + this.h / 2,
        Math.PI,
        this.h
      )

      this.maxHeight = 10

      this.scale = this.h / this.maxHeight

      this.velArray = []
      this.accArray = []
      this.velColor = 'blue'
      this.accColor = '#dc143d'
      this.textSize = 16
      this.textGap = 8
      for (let i = 0; i < this.w; i++) {
        this.velArray.push(startingVel)
        this.accArray.push(startingAcc)
      }
    }

    drawGraph(array, color) {
      this.p.stroke(color)
      this.p.beginShape()
      array.forEach((y, i) => {
        this.p.vertex(i + this.x + 1, this.y - y * this.scale - 1)
      })
      this.p.endShape()
    }

    update() {
      this.velArray.push(train.vel)
      this.velArray.shift()
      this.accArray.push(train.acc)
      this.accArray.shift()
    }

    display() {
      this.update()
      this.xAxis.display()
      this.yAxis.display()
      // Potentielle Energie
      this.p.strokeWeight(2)
      this.p.noFill()
      this.drawGraph(this.velArray, this.velColor)
      this.drawGraph(this.accArray, this.accColor)
      this.p.strokeWeight(1)

      this.p.textAlign(this.p.RIGHT, this.p.TOP)
      this.p.textSize(this.textSize)
      this.p.noStroke()
      this.p.fill(this.velColor)
      this.p.text(
        `Geschwindigkeit: ${this.velArray[this.velArray.length - 1].toFixed(
          2
        )} m/s`,
        this.p.width - this.textGap,
        this.textGap
      )
      this.p.fill(this.accColor)
      this.p.text(
        `Beschleungiung: ${this.accArray[this.accArray.length - 1].toFixed(
          2
        )} m/s^2`,
        this.p.width - this.textGap,
        this.textGap * 2 + this.textSize
      )
      this.p.stroke(0)
    }
  }

  return <Sketch setup={setup} draw={draw} />
}

export default AccelerationSketch
