import Sketch from 'react-p5'

function AccelerationSketch() {
  const frames = 60
  const scale = 75
  const localGravity = 20

  let fallingBlock

  const setup = (p, canvasParentRef) => {
    p.createCanvas(800, 500).parent(canvasParentRef)
    p.frameRate(frames)
    p.background(180)

    fallingBlock = new FallingBlock(p)
  }

  const draw = (p) => {
    p.fill(180)
    p.rect(0, 0, p.width, p.height)

    fallingBlock.display()
  }

  class FallingBlock {
    constructor(p) {
      this.p = p
      this.mass = 1
      this.dim = Math.pow(this.mass, 1 / 3)
      this.displayDim = this.dim * scale

      this.acc = localGravity / frames
      this.vel = 0
      this.x = this.p.width / 2 - this.displayDim / 2
      this.y = 0
    }

    update() {
      this.vel += this.acc
      if (this.y + this.displayDim + this.vel < this.p.height) {
        this.y += this.vel
      } else {
        this.y = this.p.height - this.displayDim
      }
    }

    display() {
      this.update()

      this.p.fill('salmon')
      this.p.rect(this.x, this.y, this.displayDim, this.displayDim)
    }
  }

  return <Sketch setup={setup} draw={draw} />
}

export default AccelerationSketch
