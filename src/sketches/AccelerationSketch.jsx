import Sketch from 'react-p5'

function AccelerationSketch() {
  const frames = 60
  const scale = 5

  let train

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

    train = new Train(p)

    const controlContainer = p
      .createDiv()
      .parent(canvasParentRef)
      .class('sketch-control highlight-box')

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
        train.acc = accSlider.value() * scale
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
        train.x = p.width / 2 - train.l / 2
        train.vel = velSlider.value()
      })
    velLabel.html(`Anfangsgeschwindigkeit: ${velSlider.value().toFixed(2)} m/s`)
  }

  const draw = (p) => {
    p.fill(180)
    p.rect(0, 0, p.width, p.height)

    train.display()
  }

  class Train {
    constructor(p) {
      this.p = p
      this.h = 50
      this.l = 100
      this.wheelRadius = 7
      this.wheelY = this.p.height - this.wheelRadius

      this.acc = startingAcc * scale
      this.vel = startingVel
      this.x = this.p.width / 2 - this.l / 2
      this.y = this.p.height - this.h - 2 * this.wheelRadius
    }

    update() {
      this.vel += this.acc / frames ** 2
      if (this.x + this.l + this.vel > this.p.width) {
        // Teil der Geschwindigkeit bei Aufprall mit der Seite speichern, damit immer die ganze Strecke genutzt wird.
        const partVel = this.vel - (this.p.width - this.x - this.l)
        this.x = this.p.width - this.l - partVel
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

      this.p.fill('salmon')
      this.p.rect(this.x, this.y, this.l, this.h)
      this.p.circle(
        this.x + this.wheelRadius,
        this.wheelY,
        this.wheelRadius * 2
      )
      this.p.circle(this.x + this.l / 2, this.wheelY, this.wheelRadius * 2)
      this.p.circle(
        this.x + this.l - this.wheelRadius,
        this.wheelY,
        this.wheelRadius * 2
      )
    }
  }

  return <Sketch setup={setup} draw={draw} />
}

export default AccelerationSketch
