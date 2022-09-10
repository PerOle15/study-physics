export default class Train {
  constructor(p, startingAcc, startingVel, scale, frames) {
    this.p = p
    this.frames = frames
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
    this.vel += this.acc / this.frames ** 2
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

    this.p.fill('#f08d54')
    this.p.rect(this.x, this.y, this.l, this.h)
    this.p.circle(this.x + this.wheelRadius, this.wheelY, this.wheelRadius * 2)
    this.p.circle(this.x + this.l / 2, this.wheelY, this.wheelRadius * 2)
    this.p.circle(
      this.x + this.l - this.wheelRadius,
      this.wheelY,
      this.wheelRadius * 2
    )
  }
}
