import { toHaveAccessibleDescription } from '@testing-library/jest-dom/dist/matchers'
import Sketch from 'react-p5'

function PotentialEnergySketch() {
  const frames = 60
  const scale = 75
  const localGravity = 9.81
  const groundHeight = 30
  const platformHeight = 300 + groundHeight
  const gap = 300

  const minMass = 0.1
  const maxMass = 5
  const startingMass = 1

  let massSlider

  let block

  const setup = (p, canvasParentRef) => {
    p.createCanvas(800, 500).parent(canvasParentRef)
    p.frameRate(frames)
    p.background(180)

    block = new Block(p)

    const controlContainer = p
      .createDiv()
      .parent(canvasParentRef)
      .class('sketch-control')

    const fallButton = p
      .createButton('Würfel fallen lassen')
      .parent(controlContainer)
      .class('btn')
      .mousePressed(() => {
        block.falling = true
        setTimeout(() => {
          console.log(block.velocity)
        }, 500)
      })

    const resetBtn = p
      .createButton('Zurücksetzen')
      .parent(controlContainer)
      .class('btn')
      .mousePressed(() => {
        block.falling = false
        block.onGround = false
        block.y = p.height - platformHeight - block.displayDim
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
      })
    massLabel.html(`Masse: ${massSlider.value().toFixed(2)} kg`)
  }
  const draw = (p) => {
    p.fill(180)
    p.rect(0, 0, p.width, p.height)

    block.display()

    // Plattform und Boden
    const platformY = p.height - platformHeight
    const groundY = p.height - groundHeight
    p.fill(80)
    p.stroke(0)
    p.beginShape()
    p.vertex(0, p.height - platformHeight)
    p.vertex((p.width - gap) / 2, platformY)
    p.vertex((p.width - gap) / 2, groundY)
    p.vertex(p.width - (p.width - gap) / 2, groundY)
    p.vertex(p.width - (p.width - gap) / 2, platformY)
    p.vertex(p.width, platformY)
    p.vertex(p.width, p.height)
    p.vertex(0, p.height)
    p.endShape(p.CLOSE)
  }

  class Block {
    constructor(p) {
      this.p = p
      this.mass = 1
      this.dim = Math.pow(this.mass, 1 / 3)
      this.displayDim = this.dim * scale
      this.pot = this.mass * platformHeight - groundHeight
      this.falling = false
      this.onGround = false
      this.velocity = 0
      this.acceleration = (localGravity / frames ** 2) * scale
      this.y = this.p.height - platformHeight - this.displayDim

      this.realHeight = (platformHeight - groundHeight) / scale
    }

    update() {
      this.velocity += this.acceleration
      this.y += this.velocity
      if (
        this.y + this.displayDim + this.velocity >
        this.p.height - groundHeight
      ) {
        this.y = this.p.height - groundHeight - this.displayDim
        this.velocity = 0
        this.onGround = true
      }
      this.realHeight =
        (this.p.height - groundHeight - this.y - this.displayDim) / scale
      console.log(this.y)
    }

    display() {
      if (this.falling && !this.onGround) {
        this.update()
      }
      this.p.fill(0)
      this.p.text(this.realHeight.toFixed(2) + ' m', 100, 100)
      this.p.stroke(0)
      this.p.fill(120)
      this.p.rect(
        this.p.width / 2 - this.displayDim / 2,
        this.y,
        this.displayDim,
        this.displayDim
      )

      // Falls Block nicht fällt, Linie zeichnen
      if (!this.falling) {
        this.p.stroke('red')
        this.p.line(
          0,
          this.p.height - platformHeight,
          this.p.width,
          this.p.height - platformHeight
        )
      }
    }
  }

  return <Sketch setup={setup} draw={draw} />
}

export default PotentialEnergySketch
