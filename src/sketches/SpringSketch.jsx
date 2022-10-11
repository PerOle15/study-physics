import Sketch from 'react-p5'

function SpringSketch() {
  let spring
  let block
  const scale = 60
  const frames = 60

  const minSpringConst = 20
  const maxSpringConst = 100
  const startingSpringConst = 40
  const minMass = 0
  const maxMass = 10
  const startingMass = 5

  let springConstSlider
  let massSlider

  const g = 9.81
  const setup = (p, canvasParentRef) => {
    p.createCanvas(800, 500).parent(canvasParentRef)
    p.frameRate(frames)
    p.background(180)

    const controlContainer = p
      .createDiv()
      .parent(canvasParentRef)
      .class('sketch-control highlight-box')

    const springConstContainer = p
      .createDiv()
      .parent(controlContainer)
      .class('sketch-input-container')
    const springConstLabel = p.createDiv().parent(springConstContainer)
    springConstSlider = p
      .createSlider(minSpringConst, maxSpringConst, startingSpringConst, 0)
      .parent(springConstContainer)
      .class('sketch-slider')
      .input(() => {
        springConstLabel.html(
          `Federkonstante: ${Math.round(springConstSlider.value())} N/m`
        )
        spring.springConstant = springConstSlider.value()
      })
    springConstLabel.html(
      `Federkonstante: ${Math.round(springConstSlider.value())} N/m`
    )

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
        massLabel.html(`Masse: ${massSlider.value().toFixed(1)} kg`)
        block.velocity = 0
        block.mass = massSlider.value()
        block.dim = Math.pow(block.mass, 1 / 3)
      })
    massLabel.html(`Masse: ${massSlider.value().toFixed(1)} kg`)

    spring = new Spring(p)
    block = new Block(p)
  }
  const draw = (p) => {
    p.fill(180)
    p.rect(0, 0, p.width, p.height)
    p.translate(p.width / 2, 0)

    spring.display()
    block.display()
  }

  class Spring {
    constructor(p) {
      this.p = p
      this.height = this.p.height / scale
      this.strokeWidth = 2
      this.mass = 0.05
      this.waveCount = 10
      this.originalLength = 1
      this.lastLength = this.originalLength
      this.extension = 0
      this.springLength = this.originalLength + this.extension
      this.waveLength = (this.springLength * scale) / this.waveCount
      this.amplitude = 30
      this.springConstant = startingSpringConst
      this.springAcceleration = 0
      this.gravityAcceleration = 0
      this.acceleration = 0
      this.velocity = 0
    }

    update() {
      this.springForce = -this.springConstant * this.extension
      // Kann nicht durch Masse = 0 teilen
      this.springAcceleration =
        this.springForce / (block.mass + this.mass) / frames
      this.gravityAcceleration = g / frames
      this.velocity += this.springAcceleration + this.gravityAcceleration

      this.velocity *= block.mass === 0 ? 0.9 : 0.97
      this.springLength += this.velocity / frames
      if (this.springLength <= 0) {
        this.springLength = 0
        this.velocity *= -1
      } else if (
        this.springLength + block.dim + this.velocity / frames >=
        this.height
      ) {
        this.springLength = this.height - block.dim
        this.velocity *= -1
      }
      this.extension = this.springLength - this.originalLength
      this.waveLength = (this.springLength * scale) / this.waveCount
    }

    display() {
      this.update()

      this.p.stroke('black')
      this.p.noFill()
      this.p.beginShape()
      for (let i = 0; i < this.springLength * scale; i++) {
        this.p.vertex(
          this.amplitude *
            this.p.sin(((Math.PI * 2) / this.waveLength) * (i + 1)),
          i + 1
        )
      }
      this.p.endShape()
    }
  }

  class Block {
    constructor(p) {
      this.p = p
      this.mass = startingMass
      this.dim = Math.pow(this.mass, 1 / 3)
      this.y = spring.springLength
    }
    update() {
      this.y = spring.springLength
    }
    display() {
      this.update()
      this.p.fill('#f08d54')
      this.p.square(
        (-this.dim / 2) * scale,
        this.y * scale + 1,
        this.dim * scale
      )
    }
  }

  return <Sketch setup={setup} draw={draw} />
}

export default SpringSketch
