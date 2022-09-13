import Sketch from 'react-p5'

export default function CollisionSketch() {
  const frames = 60
  const scale = 25
  const textSize = 16

  let trainLeft
  let trainRight

  const setup = (p, canvasParentRef) => {
    p.createCanvas(800, 500).parent(canvasParentRef)
    p.frameRate(frames)
    p.background(180)

    trainLeft = new Train(p, 0, 3, 1000)
    trainRight = new Train(p, 0, -3, 2000)
  }
  const draw = (p) => {
    p.background(180)

    trainLeft.display()
    trainRight.display()

    p.fill(0)
    p.textAlign(p.LEFT, p.TOP)
    p.textSize(textSize)
    p.text(trainLeft.vel, 10, 10)
  }

  class Train {
    constructor(p, startingAcc, startingVel, mass) {
      this.p = p
      this.mass = mass
      this.h = 50
      this.l = 100
      this.wheelRadius = 7
      this.wheelY = this.p.height - this.wheelRadius

      this.acc = startingAcc * scale
      this.vel = startingVel
      this.x = this.p.width / 2 - this.l / 2
      this.right = this.x + this.l
      this.y = this.p.height - this.h - 2 * this.wheelRadius
      this.momentum = this.mass * this.vel
    }

    collide(other) {}

    update() {
      this.vel += this.acc / frames ** 2
      this.scaledVel = (this.vel / frames) * scale
      if (this.x + this.l + this.scaledVel > this.p.width) {
        // Teil der Geschwindigkeit bei Aufprall mit der Seite speichern, damit immer die ganze Strecke genutzt wird.
        const partvel = this.scaledVel - (this.p.width - this.x - this.l)
        this.x = this.p.width - this.l - partvel
        this.vel *= -1
      } else if (this.x + this.scaledVel < 0) {
        const partvel = -this.scaledVel - this.x
        this.x = partvel
        this.vel *= -1
      } else {
        this.x += this.scaledVel
      }
      this.right = this.x + this.l
    }

    display() {
      this.update()

      this.p.fill('#f08d54')
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
