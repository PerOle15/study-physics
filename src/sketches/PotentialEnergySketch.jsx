import Sketch from 'react-p5'
import Arrow from '../utils/Vector'

export default function PotentialEnergySketch() {
  const frames = 60
  const scale = 75
  const g = 9.81
  const groundHeight = 30 / scale
  const gap = 300 / scale

  const minMass = 1
  const maxMass = 4
  const startingMass = 2
  const minHeight = 1
  const maxHeight = 4
  const startingHeight = maxHeight

  let massSlider
  let heightSlider
  let pauseBtn

  let controller

  let block
  let diagram

  const setup = (p, canvasParentRef) => {
    p.createCanvas(800, 500).parent(canvasParentRef)
    p.frameRate(frames)
    p.background(180)

    controller = new Controller(p)

    const controlContainer = p
      .createDiv()
      .parent(canvasParentRef)
      .class('sketch-control highlight-box')

    pauseBtn = p
      .createButton('Stoppen')
      .parent(controlContainer)
      .class('btn')
      .mousePressed(() => {
        controller.handleLoop()
      })

    // Fall Button
    p.createButton('Würfel fallen lassen')
      .parent(controlContainer)
      .class('btn')
      .mousePressed(() => {
        block.falling = true
      })

    // Reset Button
    p.createButton('Zurücksetzen')
      .parent(controlContainer)
      .class('btn')
      .mousePressed(() => {
        block.falling = false
        block.onGround = false
        block.y = block.height - heightSlider.value() - block.dim - groundHeight
        block.vel = 0
        block.calcEnergy()
        block.maxEnergy = heightSlider.value() * block.mass * g
        controller.display()
      })

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
        if (block.falling && !block.onGround) {
          massSlider.value(block.mass)
          return
        }
        massLabel.html(`Masse: ${massSlider.value().toFixed(2)} kg`)
        // Update block
        block.lastMass = block.mass
        block.mass = massSlider.value()
        block.lastDim = block.dim
        block.dim = Math.pow(block.mass, 1 / 3)
        block.y += block.lastDim - block.dim
        block.calcPot()
        if (!block.falling && !block.onGround) {
          block.maxEnergy = heightSlider.value() * block.mass * g
        }
        if (!p.isLooping()) {
          controller.display()
        }
      })
    massLabel.html(`Masse: ${massSlider.value().toFixed(2)} kg`)

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
        if (block.falling && !block.onGround) {
          heightSlider.value(block.platformHeight - groundHeight)
          return
        }
        const height = heightSlider.value()
        heightLabel.html(`Fallhöhe: ${height.toFixed(2)} m`)
        block.platformHeight = height + groundHeight
        if (!block.falling) {
          block.y = block.height - block.platformHeight - block.dim

          if (!block.onGround) {
            block.maxEnergy = height * block.mass * g
          }
        }
        block.calcPot()
        if (!p.isLooping()) {
          controller.display()
        }
      })
    heightLabel.html(`Fallhöhe: ${heightSlider.value().toFixed(2)} m`)

    block = new Block(p)
    diagram = new Diagram(p)
  }
  const draw = (p) => {
    controller.display()
  }

  class Controller {
    constructor(p) {
      this.p = p
      this.width = this.p.width / scale
      this.height = this.p.height / scale
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
    display() {
      this.p.background(180)

      block.display()
      diagram.display()

      // Plattform und Boden
      const platformY = this.height - block.platformHeight
      const groundY = this.height - groundHeight
      const platformWidth = this.width / 2
      this.p.fill(80)
      this.p.stroke(0)
      this.p.beginShape()
      this.p.vertex(0, platformY * scale)
      this.p.vertex(((platformWidth - gap) / 2) * scale, platformY * scale)
      this.p.vertex(((platformWidth - gap) / 2) * scale, groundY * scale)
      this.p.vertex(
        (platformWidth - (platformWidth - gap) / 2) * scale,
        groundY * scale
      )
      this.p.vertex(
        (platformWidth - (platformWidth - gap) / 2) * scale,
        platformY * scale
      )
      this.p.vertex(platformWidth * scale, platformY * scale)
      this.p.vertex(platformWidth * scale, this.p.height)
      this.p.vertex(0, this.p.height)
      this.p.endShape(this.p.CLOSE)
    }
  }

  class Block {
    constructor(p) {
      this.p = p
      this.width = this.p.width / scale
      this.height = this.p.height / scale
      this.mass = startingMass
      this.dim = Math.pow(this.mass, 1 / 3)
      this.falling = false
      this.onGround = false
      this.vel = 0
      this.acceleration = g / frames
      this.platformHeight = maxHeight + groundHeight
      this.platformWidth = this.width / 2
      this.y = this.height - this.platformHeight - this.dim

      this.maxEnergy = heightSlider.value() * this.mass * g
      this.calcEnergy()
    }

    calcPot() {
      this.pot =
        this.mass * g * (this.height - this.y - this.dim - groundHeight)
    }

    calcEnergy() {
      this.calcPot()
      this.kin = (this.mass * this.vel ** 2) / 2
      this.heat = this.onGround ? this.maxEnergy : 0
    }

    update() {
      this.vel += this.acceleration
      this.y += this.vel / frames
      if (this.y + this.dim + this.vel / frames > this.height - groundHeight) {
        this.y = this.height - groundHeight - this.dim
        this.vel = 0
        this.onGround = true
      }
      this.calcEnergy()
    }

    display() {
      if (this.falling && !this.onGround) {
        this.update()
      }
      this.p.fill(120)
      this.p.stroke(0)
      this.p.square(
        (this.platformWidth / 2 - this.dim / 2) * scale,
        this.y * scale,
        this.dim * scale
      )

      // Falls Block nicht fällt, Brett zeichnen
      if (!this.falling) {
        this.p.fill('#6c3803')
        this.p.rect(
          (this.platformWidth / 2 - gap / 2) * scale,
          (this.height - this.platformHeight) * scale,
          gap * scale,
          10
        )
      }
    }
  }

  class Diagram {
    constructor(p) {
      this.p = p
      this.width = this.p.width / scale
      this.height = this.p.height / scale
      this.gap = 20
      this.x = this.p.width / 2 + this.gap
      this.y = this.p.height - this.gap
      this.h = maxHeight * scale
      this.w = this.p.width / 2 - this.gap * 2
      this.xAxis = new Arrow(this.p, this.x, this.y, Math.PI / 2, this.w)
      this.yAxis = new Arrow(this.p, this.x, this.y, Math.PI, this.h)

      this.maxEnergy = maxHeight * maxMass * g

      this.scale = this.h / this.maxEnergy

      this.potArray = []
      this.kinArray = []
      this.heatArray = []
      this.totArray = []
      this.potColor = 'blue'
      this.kinColor = '#dc143d'
      this.heatColor = 'green'
      this.totColor = 'purple'
      this.textSize = 16
      this.textGap = 8
      for (let i = 0; i < this.w; i++) {
        this.potArray.push(block.pot)
        this.kinArray.push(block.kin)
        this.heatArray.push(block.heat)
        this.totArray.push(block.maxEnergy)
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
      this.potArray.push(block.pot)
      this.potArray.shift()
      this.kinArray.push(block.kin)
      this.kinArray.shift()
      this.heatArray.push(block.heat)
      this.heatArray.shift()
      this.totArray.push(block.maxEnergy)
      this.totArray.shift()
    }

    display() {
      this.update()
      this.xAxis.display()
      this.yAxis.display()
      // Potentielle Energie
      this.p.strokeWeight(2)
      this.p.noFill()
      this.drawGraph(this.potArray, this.potColor)
      this.drawGraph(this.kinArray, this.kinColor)
      this.drawGraph(this.heatArray, this.heatColor)
      this.drawGraph(this.totArray, this.totColor)
      this.p.strokeWeight(1)

      this.p.textAlign(this.p.RIGHT, this.p.TOP)
      this.p.textSize(this.textSize)
      this.p.noStroke()
      this.p.fill(this.totColor)
      this.p.text(
        `Gesamtenergie: ${this.totArray[this.totArray.length - 1].toFixed(
          2
        )} J`,
        this.p.width - this.textGap,
        this.textGap
      )
      this.p.fill(this.potColor)
      this.p.text(
        `Potentielle Energie: ${block.pot.toFixed(2)} J`,
        this.p.width - this.textGap,
        this.textGap * 2 + this.textSize
      )
      this.p.fill(this.kinColor)
      this.p.text(
        `Kinetische Energie: ${block.kin.toFixed(2)} J`,
        this.p.width - this.textGap,
        this.textGap * 3 + this.textSize * 2
      )
      this.p.fill(this.heatColor)
      this.p.text(
        `Wärmeenergie: ${block.heat.toFixed(2)} J`,
        this.p.width - this.textGap,
        this.textGap * 4 + this.textSize * 3
      )
      this.p.stroke(0)
    }
  }

  return <Sketch setup={setup} draw={draw} />
}
