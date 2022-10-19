import Sketch from 'react-p5'
import Arrow from '../utils/Vector'

export default function CollisionSketch() {
  const frames = 60
  const scale = 60
  const trainHeight = 50 / scale
  const trainLength = 100 / scale
  const elastic = true

  const trainLeftColor = '#f08d54'
  const trainRightColor = '#607d84'

  let controller
  let trainLeft
  let trainRight
  let diagram

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
    diagram = new Diagram(p)

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
    const elasticLabel = p
      .createDiv()
      .parent(elasticContainer)
      .html('Vollkommen Elastisch')
    // checkbox
    const checkBox = p
      .createCheckbox('', elastic)
      .parent(elasticContainer)
      .class('switch')
      .changed(() => {
        controller.elastic = checkBox.checked()
        if (checkBox.checked()) {
          controller.collided = false
          elasticLabel.html('Vollkommen Elastisch')
        } else {
          elasticLabel.html('Vollkommen Inelastisch')
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
        trainLeft.vpf = newVel / frames
        controller.resetCanvas()
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
        trainRight.vpf = newVel / frames
        controller.resetCanvas()
      })
    v2Label.html(`Startgeschwindigkeit 2: ${v2Slider.value().toFixed(2)} m/s`)
  }

  const draw = (p) => {
    controller.display()
  }

  class Controller {
    constructor(p) {
      this.p = p
      this.width = this.p.width / scale
      this.elastic = elastic
      this.collided = false
    }
    display(displayOnly = false) {
      this.p.background(180)

      if (!displayOnly) {
        this.collision()
      }
      trainLeft.display()
      trainRight.display()
      diagram.display()
    }
    collision() {
      const hitLeftWall = trainLeft.x + trainLeft.vpf < 0
      const hitRightWall = trainRight.right + trainRight.vpf > this.width
      // Check if left train hits a wall
      if (hitLeftWall) {
        // Hit left wall
        trainLeft.x = 0
        trainLeft.vpf *= -1
        if (this.collided) {
          trainRight.x = trainLeft.x + trainLeft.l
          trainRight.vpf *= -1
          return
        }
      } else {
        trainLeft.x += trainLeft.vpf
      }

      // Check if right train hits a wall
      if (hitRightWall) {
        // Hit right wall
        trainRight.x = trainRight.width - trainRight.l
        trainRight.vpf *= -1
        if (this.collided) {
          trainLeft.x = trainRight.x - trainLeft.l
          trainLeft.vpf *= -1
          return
        }
      } else {
        trainRight.x += trainRight.vpf
      }

      // Check collision between trains
      // This train is left, the other one comes from the right
      if (!this.collided) {
        const collision =
          trainLeft.right + trainLeft.vpf > trainRight.x + trainRight.vpf &&
          trainLeft.x < trainRight.right
        if (collision) {
          const mediumV =
            (trainLeft.mass * trainLeft.vpf +
              trainRight.mass * trainRight.vpf) /
            (trainLeft.mass + trainRight.mass)

          if (this.elastic) {
            // If elastic collision
            trainLeft.vpf = 2 * mediumV - trainLeft.vpf
            trainRight.vpf = 2 * mediumV - trainRight.vpf
          } else {
            // If inelastic collision
            this.collided = true
            trainLeft.vpf = mediumV
            trainRight.vpf = mediumV

            trainRight.x = trainLeft.x + trainLeft.l
          }
        }
      }
    }
    resetCanvas() {
      this.collided = false
      trainLeft.x = 0
      trainRight.x = this.p.width / scale - trainLength
      trainLeft.vpf = v1Slider.value() / frames
      trainRight.vpf = v2Slider.value() / frames
      controller.display(true)
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

      // vpf = velocity per frame
      this.vpf = startingVel / frames
      this.x = x
      this.right = this.x + this.l
      this.y = this.height - this.h - 2 * this.wheelRadius
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

      this.maxHeight = 20

      this.scale = this.h / this.maxHeight

      this.v1Array = []
      this.v2Array = []
      this.v1Color = trainLeftColor
      this.v2Color = trainRightColor
      this.textSize = 16
      this.textGap = 8
      for (let i = 0; i < this.w; i++) {
        this.v1Array.push(startv1)
        this.v2Array.push(startv2)
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
      this.v1Array.push(trainLeft.vpf * frames)
      this.v1Array.shift()
      this.v2Array.push(trainRight.vpf * frames)
      this.v2Array.shift()
    }

    display() {
      this.update()
      this.xAxis.display()
      this.yAxis.display()
      // Potentielle Energie
      this.p.strokeWeight(2)
      this.p.noFill()
      this.drawGraph(this.v1Array, this.v1Color)
      this.drawGraph(this.v2Array, this.v2Color)
      this.p.strokeWeight(1)

      this.p.textAlign(this.p.RIGHT, this.p.TOP)
      this.p.textSize(this.textSize)
      this.p.noStroke()
      this.p.fill(this.v1Color)
      this.p.text(
        `Geschwindigkeit 1: ${this.v1Array[this.v1Array.length - 1].toFixed(
          2
        )} m/s`,
        this.p.width - this.textGap,
        this.textGap
      )
      this.p.fill(this.v2Color)
      this.p.text(
        `Geschwindigkeit 2: ${this.v2Array[this.v2Array.length - 1].toFixed(
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
