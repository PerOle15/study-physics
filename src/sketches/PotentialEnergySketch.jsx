import Sketch from 'react-p5'

function PotentialEnergySketch() {
  const frames = 60
  const scale = 75
  const localGravity = 9.81
  const groundHeight = 30
  const gap = 300

  const minMass = 0.1
  const maxMass = 5
  const startingMass = 1
  const minHeight = 1 * scale + groundHeight
  const maxHeight = 4 * scale + groundHeight
  const startingHeight = maxHeight

  let massSlider
  let heightSlider
  let pauseBtn

  let controller

  let block

  const setup = (p, canvasParentRef) => {
    p.createCanvas(800, 500).parent(canvasParentRef)
    p.frameRate(frames)
    p.background(180)

    block = new Block(p)

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
        block.calcRealHeight()
        block.calcPot()
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
    p.fill(180)
    p.rect(0, 0, p.width, p.height)

    block.display()

    // Plattform und Boden
    const platformY = p.height - heightSlider.value()
    const groundY = p.height - groundHeight
    p.fill(80)
    p.stroke(0)
    p.beginShape()
    p.vertex(0, p.height - heightSlider.value())
    p.vertex((p.width - gap) / 2, platformY)
    p.vertex((p.width - gap) / 2, groundY)
    p.vertex(p.width - (p.width - gap) / 2, groundY)
    p.vertex(p.width - (p.width - gap) / 2, platformY)
    p.vertex(p.width, platformY)
    p.vertex(p.width, p.height)
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
      this.mass = 1
      this.dim = Math.pow(this.mass, 1 / 3)
      this.displayDim = this.dim * scale
      this.falling = false
      this.onGround = false
      this.velocity = 0
      this.acceleration = (localGravity / frames ** 2) * scale
      this.platformHeight = maxHeight
      this.y = this.p.height - this.platformHeight - this.displayDim

      this.calcRealHeight()
      this.calcPot()
    }

    calcRealHeight() {
      this.realHeight = Math.abs(
        (this.p.height - groundHeight - this.y - this.displayDim) / scale
      )
    }

    calcPot() {
      this.pot = this.mass * localGravity * this.realHeight
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
      this.calcRealHeight()
      this.calcPot()
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
      this.p.noStroke()
      this.p.rect(
        this.p.width / 2 - this.displayDim / 2,
        this.y,
        this.displayDim,
        this.displayDim
      )

      // Falls Block nicht fällt, Linie zeichnen
      if (!this.falling) {
        this.p.stroke('#f25c05')
        this.p.line(
          0,
          this.p.height - this.platformHeight,
          this.p.width,
          this.p.height - this.platformHeight
        )
      }
    }
  }

  return <Sketch setup={setup} draw={draw} />
}

export default PotentialEnergySketch
