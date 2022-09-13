import Sketch from 'react-p5'
import Arrow from '../utils/Vector'

export default function PotentialEnergySketch() {
  const frames = 60
  const scale = 75
  const g = 9.81
  const groundHeight = 30
  const gap = 300

  const minMass = 0.1
  const maxMass = 4
  const startingMass = 2
  const minHeight = 1 * scale + groundHeight
  const realMaxHeight = 4
  const maxHeight = realMaxHeight * scale + groundHeight
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

    block = new Block(p)
    diagram = new Diagram(p)

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
        block.y = p.height - heightSlider.value() - block.displayDim
        block.velocity = 0
        block.calcRealHeight()
        block.calcEnergy()
        display(p)
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
        massLabel.html(`Masse: ${massSlider.value().toFixed(2)} kg`)
        // Update block
        block.lastMass = block.mass
        block.mass = massSlider.value()
        block.dim = Math.pow(block.mass, 1 / 3)
        block.displayDim = block.dim * scale
        block.lastDim = Math.pow(block.lastMass, 1 / 3)
        block.y = block.y - (block.displayDim - block.lastDim * scale)
        block.calcPot()
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
        heightLabel.html(
          `Fallhöhe: ${((heightSlider.value() - groundHeight) / scale).toFixed(
            2
          )} m`
        )
        block.platformHeight = heightSlider.value()
        if (!block.falling) {
          block.y = p.height - block.platformHeight - block.displayDim
          block.realHeight = (heightSlider.value() - groundHeight) / scale
        }
        block.calcPot()
      })
    heightLabel.html(
      `Fallhöhe: ${((heightSlider.value() - groundHeight) / scale).toFixed(
        2
      )} m`
    )
  }
  const draw = (p) => {
    display(p)
  }

  function display(p) {
    p.fill(180)
    p.rect(0, 0, p.width, p.height)

    block.display()
    diagram.display()

    // Plattform und Boden
    const platformY = p.height - heightSlider.value()
    const groundY = p.height - groundHeight
    const platformWidth = p.width / 2
    p.fill(80)
    p.stroke(0)
    p.beginShape()
    p.vertex(0, p.height - heightSlider.value())
    p.vertex((platformWidth - gap) / 2, platformY)
    p.vertex((platformWidth - gap) / 2, groundY)
    p.vertex(platformWidth - (platformWidth - gap) / 2, groundY)
    p.vertex(platformWidth - (platformWidth - gap) / 2, platformY)
    p.vertex(platformWidth, platformY)
    p.vertex(platformWidth, p.height)
    p.vertex(0, p.height)
    p.endShape(p.CLOSE)
  }

  class Controller {
    constructor(p) {
      this.p = p
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

  class Block {
    constructor(p) {
      this.p = p
      this.mass = startingMass
      this.dim = Math.pow(this.mass, 1 / 3)
      this.displayDim = this.dim * scale
      this.falling = false
      this.onGround = false
      this.velocity = 0
      this.acceleration = g / frames
      this.platformHeight = maxHeight
      this.platformWidth = this.p.width / 2
      this.y = this.p.height - this.platformHeight - this.displayDim

      this.calcRealHeight()
      this.calcEnergy()
    }

    calcRealHeight() {
      this.realHeight = Math.abs(
        (this.p.height - groundHeight - this.y - this.displayDim) / scale
      )
    }

    calcPot() {
      this.pot = this.mass * g * this.realHeight
    }

    calcEnergy() {
      this.calcPot()
      this.kin = (this.mass * this.velocity ** 2) / 2
      this.heat = this.onGround
        ? (this.mass * g * (this.platformHeight - groundHeight)) / scale
        : 0
    }

    update() {
      this.velocity += this.acceleration
      console.log(this.velocity)
      this.scaledVelocity = (this.velocity * scale) / frames
      this.y += this.scaledVelocity
      if (
        this.y + this.displayDim + this.scaledVelocity >
        this.p.height - groundHeight
      ) {
        this.y = this.p.height - groundHeight - this.displayDim
        this.velocity = 0
        this.onGround = true
      }
      this.calcRealHeight()
      this.calcEnergy()
    }

    display() {
      if (this.falling && !this.onGround) {
        this.update()
      }
      this.p.fill(0)
      this.p.textSize(20)
      this.p.textAlign(this.p.LEFT, this.p.TOP)
      this.p.text(`Fallhöhe: ${this.realHeight.toFixed(2)} m`, 10, 10)
      this.p.text(`Potentielle Energie: ${this.pot.toFixed(2)} J`, 10, 35)
      this.p.fill(120)
      this.p.stroke(0)
      this.p.rect(
        this.platformWidth / 2 - this.displayDim / 2,
        this.y,
        this.displayDim,
        this.displayDim
      )

      // Falls Block nicht fällt, Brett zeichnen
      if (!this.falling) {
        this.p.fill('#6c3803')
        this.p.rect(
          this.platformWidth / 2 - gap / 2,
          this.p.height - this.platformHeight,
          gap,
          10
        )
      }
    }
  }

  class Diagram {
    constructor(p) {
      this.p = p
      this.gap = 20
      this.x = this.p.width / 2 + this.gap
      this.y = this.p.height - this.gap
      this.h = maxHeight
      this.w = this.p.width / 2 - this.gap * 2
      this.xAxis = new Arrow(this.p, this.x, this.y, Math.PI / 2, this.w)
      this.yAxis = new Arrow(this.p, this.x, this.y, Math.PI, this.h)

      this.maxEnergy = realMaxHeight * maxMass * g

      this.scale = this.h / this.maxEnergy

      this.potArray = []
      this.kinArray = []
      this.heatArray = []
      this.totArray = []
      this.potColor = 'blue'
      this.kinColor = 'orange'
      this.heatColor = 'green'
      this.totColor = 'purple'
      for (let i = 0; i < this.w; i++) {
        this.potArray.push(block.pot * this.scale)
        this.kinArray.push(block.kin * this.scale)
        this.heatArray.push(block.heat * this.scale)
        this.totArray.push(
          ((block.platformHeight - groundHeight) / scale) *
            block.mass *
            g *
            this.scale
        )
      }
    }

    drawGraph(array, color) {
      this.p.stroke(color)
      this.p.beginShape()
      array.forEach((y, i) => {
        this.p.vertex(i + this.x + 1, this.y - y - 1)
      })
      this.p.endShape()
    }

    update() {
      this.potArray.push(block.pot * this.scale)
      this.potArray.shift()
      this.kinArray.push(block.kin * this.scale)
      this.kinArray.shift()
      this.heatArray.push(block.heat * this.scale)
      this.heatArray.shift()
      this.totArray.push(
        ((block.platformHeight - groundHeight) / scale) *
          block.mass *
          g *
          this.scale
      )
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
    }
  }

  return <Sketch setup={setup} draw={draw} />
}
