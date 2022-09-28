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
        block.dimensions = Math.pow(block.mass, 1 / 3) * scale
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
      this.strokeWidth = 2
      this.waveCount = 15
      this.frequency = 0
      this.springLength = 1 * scale
      this.originalLength = this.springLength
      this.lastLength = this.originalLength
      this.extension = 0
      this.waveLength = this.length / this.waveCount
      this.amplitude = 30
      this.offset = 0
      this.springConstant = startingSpringConst
      this.springAcceleration = 0
      this.gravityAcceleration = 0
      this.acceleration = 0
      this.velocity = 0
    }

    update() {
      // this.originalLength = Number(springLengthSlider.value) * scale

      if (block.mass !== 0) {
        this.springForce = -this.springConstant * this.extension
        this.springAcceleration = this.springForce / block.mass / frames ** 2
        this.gravityAcceleration = g / frames ** 2
      }
      this.velocity += this.springAcceleration + this.gravityAcceleration

      this.velocity *= 0.96
      this.springLength += this.velocity * scale
      if (this.springLength <= 0) {
        this.springLength = 0
        this.velocity *= -1
      } else if (this.springLength + block.dimensions >= this.p.height - 1) {
        this.springLength = this.p.height - block.dimensions - 1
        this.velocity *= -1
      }
      this.extension = (this.springLength - this.originalLength) / scale
      this.waveLength = this.springLength / this.waveCount
    }

    display() {
      this.update()

      this.p.stroke('black')
      this.p.noFill()
      this.p.beginShape()
      for (let i = 0; i < this.springLength; i++) {
        this.p.vertex(
          this.amplitude *
            this.p.sin(
              ((Math.PI * 2) / this.waveLength) * (i + 1) + this.offset
            ),
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
      this.dimensions = Math.pow(this.mass, 1 / 3) * scale
      this.y = spring.springLength
    }
    update() {
      this.y = spring.springLength
    }
    display() {
      this.update()
      this.p.fill('#f08d54')
      this.p.rect(
        -this.dimensions / 2,
        this.y + 1,
        this.dimensions,
        this.dimensions
      )
    }
  }

  return <Sketch setup={setup} draw={draw} />
}

export default SpringSketch
