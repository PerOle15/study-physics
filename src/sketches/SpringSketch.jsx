import Sketch from 'react-p5'

function DensitySketch() {
  let spring
  let block
  const scale = 60
  const frames = 60

  const minSpringConst = 20
  const maxSpringConst = 100
  const startingSpringConst = 40
  const minMass = 0.5
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

      this.velocity *= 0.98
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

export default DensitySketch

/* 
let spring
let block
let springScale = 100
const gridColor = '#707070'
const frames = 30
const localGravity = 9.81

const pauseBtn = document.getElementById('pauseBtn')

const springLengthInput = document.getElementById('springLengthInput')
const springLengthSlider = document.getElementById('springLengthInput')
const springConstantInput = document.getElementById('springConstantInput')
const springConstantSlider = document.getElementById('springConstantSlider')
const massInput = document.getElementById('massInput')
const massSlider = document.getElementById('massSlider')

springLengthInput.setAttribute('min', 0.5)
springLengthInput.setAttribute('max', 3)
springLengthInput.setAttribute('step', 0.01)
springLengthInput.value = 1
springLengthSlider.setAttribute('min', springLengthInput.getAttribute('min'))
springLengthSlider.setAttribute('max', springLengthInput.getAttribute('max'))
springLengthSlider.setAttribute('step', springLengthInput.getAttribute('step'))
springLengthSlider.value = springLengthInput.value
springConstantInput.setAttribute('min', 1)
springConstantInput.setAttribute('max', 50)
springConstantInput.setAttribute('step', 0.5)
springConstantInput.value = 10
springConstantSlider.setAttribute(
  'min',
  springConstantInput.getAttribute('min')
)
springConstantSlider.setAttribute(
  'max',
  springConstantInput.getAttribute('max')
)
springConstantSlider.setAttribute(
  'step',
  springConstantInput.getAttribute('step')
)
springConstantSlider.value = springConstantInput.value
massInput.setAttribute('min', 0.1)
massInput.setAttribute('max', 10)
massInput.setAttribute('step', 0.05)
massInput.value = 10
massSlider.setAttribute('min', massInput.getAttribute('min'))
massSlider.setAttribute('max', massInput.getAttribute('max'))
massSlider.setAttribute('step', massInput.getAttribute('step'))
massSlider.value = massInput.value

setInputAndSlider(springLengthInput, springLengthSlider)
setInputAndSlider(springConstantInput, springConstantSlider)
setInputAndSlider(massInput, massSlider)

function setInputMinMax(el) {
  const maxVal = Number(el.getAttribute('max'))
  const minVal = Number(el.getAttribute('min'))
  if (el.value > maxVal) {
    el.value = maxVal
  } else if (el.value < minVal) {
    el.value = minVal
  }
}

function setInputAndSlider(input, slider) {
  input.addEventListener('change', () => {
    setInputMinMax(input)
    slider.value = input.value
  })
  slider.addEventListener('change', () => {
    input.value = slider.value
  })
}

function setup() {
  const myCanvas = createCanvas(
    document.body.clientWidth,
    document.body.clientHeight
  )
  myCanvas.parent('canvasContainer')
  frameRate(frames)
  background(180)

  spring = new Spring()
  block = new Block()
}

function draw() {
  fill(180)
  rect(0, 0, width, height)
  translate(width / 2, 0)

  spring.display()
  block.display()

  if (!focused) {
    pauseBtn.innerText = 'Fortfahren'
    noLoop()
  }
}

// Animation stoppen und wieder anstellen
document.addEventListener('keypress', (e) => {
  if (e.key === ' ') {
    e.preventDefault()
    handleLoop()
  }
})

pauseBtn.addEventListener('click', (e) => {
  e.preventDefault()
  handleLoop()
})

function handleLoop() {
  if (isLooping()) {
    pauseBtn.innerText = 'Fortfahren'
    noLoop()
  } else {
    loop()
    pauseBtn.innerText = 'Pausieren'
  }
}

function windowResized() {
  resizeCanvas(document.body.clientWidth, document.body.clientHeight)
}

class Spring {
  constructor() {
    this.strokeWidth = 2
    this.waveCount = 15
    this.frequency = 0
    this.springLength = Number(springLengthSlider.value) * springScale
    this.originalLength = this.springLength
    this.lastLength = this.originalLength
    this.extension = 0
    this.waveLength = this.length / this.waveCount
    this.amplitude = 30
    this.offset = 0
    this.springConstant = Number(springConstantSlider.value)
    this.springAcceleration = 0
    this.gravityAcceleration = 0
    this.acceleration = 0
    this.velocity = 0
  }

  update() {
    this.originalLength = Number(springLengthSlider.value) * springScale
    this.springConstant = Number(springConstantSlider.value)

    if (block.mass !== 0) {
      this.springForce = -this.springConstant * this.extension
      this.springAcceleration = this.springForce / block.mass / frames ** 2
      this.gravityAcceleration = localGravity / frames ** 2
    }
    this.velocity += this.springAcceleration + this.gravityAcceleration

    this.velocity *= 0.95
    this.springLength += this.velocity * springScale
    if (this.springLength <= 0) {
      this.springLength = 0
      this.velocity *= -1
    }
    this.extension = (this.springLength - this.originalLength) / springScale
    console.log(this.springConstant)
    console.log(this.springLength)
    this.waveLength = this.springLength / this.waveCount
  }

  display() {
    this.update()

    stroke('black')
    noFill()
    beginShape()
    for (let i = 0; i < this.springLength; i++) {
      vertex(
        this.amplitude *
          sin((TWO_PI / this.waveLength) * (i + 1) + this.offset),
        i + 1
      )
    }
    endShape()
  }
}

class Block {
  constructor() {
    this.mass = Number(massSlider.value)
    this.dimensions = pow(this.mass, 1 / 3) * springScale
    this.y = spring.springLength
  }
  update() {
    this.mass = Number(massSlider.value)
    this.dimensions = pow(this.mass, 1 / 3) * springScale
    this.y = spring.springLength
  }
  display() {
    this.update()
    fill('#f08d54')
    rect(-this.dimensions / 2, this.y + 1, this.dimensions, this.dimensions)
  }
}

*/
