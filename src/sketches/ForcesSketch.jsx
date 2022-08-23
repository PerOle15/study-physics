import Sketch from 'react-p5'

function DensitySketch() {
  const frames = 20
  const arrows = []
  let arrow
  const setup = (p, canvasParentRef) => {
    p.createCanvas(800, 500).parent(canvasParentRef)
    p.frameRate(frames)
    p.background(180)
    const controlContainer = p
      .createDiv()
      .parent(canvasParentRef)
      .class('sketch-control highlight-box')
    const angleSlider = p
      .createSlider(0, Math.PI * 2, 0.7, 0)
      .parent(controlContainer)
      .class('sketch-slider')
      .input(() => {
        arrow.angle = angleSlider.value()
      })
    arrows.push(new Arrow(p, 100, 100, 0.7, 200))
    arrow = new Arrow(p, p.width / 2, p.height / 2, 0.7, 200)
  }
  const draw = (p) => {
    p.fill(180)
    p.rect(0, 0, p.width, p.height)

    // arrows.forEach((arrow) => {
    //   arrow.display()
    // })

    arrow.display()
  }

  class Arrow {
    constructor(p, x, y, angle, length) {
      this.p = p
      this.x1 = x
      this.y1 = y
      this.angle = angle
      this.length = length
      this.pointLength = 30
      this.pointAngle = Math.PI / 7
    }
    update() {
      this.x2 = this.x1 + Math.sin(this.angle) * this.length
      this.y2 = this.y1 + Math.cos(this.angle) * this.length
      this.x3 =
        this.x2 -
        Math.cos(Math.PI / 2 - (this.angle + this.pointAngle)) *
          this.pointLength
      this.y3 =
        this.y2 -
        Math.sin(Math.PI / 2 - (this.angle + this.pointAngle)) *
          this.pointLength
      this.x4 =
        this.x2 + Math.sin(this.pointAngle - this.angle) * this.pointLength
      this.y4 =
        this.y2 - Math.cos(this.pointAngle - this.angle) * this.pointLength
    }
    display() {
      this.update()
      this.p.strokeWeight(3)
      this.p.line(this.x1, this.y1, this.x2, this.y2)
      this.p.line(this.x2, this.y2, this.x3, this.y3)
      this.p.line(this.x2, this.y2, this.x4, this.y4)
    }
  }

  return <Sketch setup={setup} draw={draw} />
}

export default DensitySketch
