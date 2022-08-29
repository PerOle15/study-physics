/**
 * function to draw a vector arrow
 * @param p5 p5 library
 * @param {number} x x-coordinate of starting point
 * @param {number} y y-coordinate of starting point
 * @param {number} angle angle of the vector relative to y-axis
 * @param {number} length length of the vector arrow
 * @return {object} new vector arrow object
 *
 **/

class Arrow {
  constructor(p, x, y, angle, length) {
    this.p = p
    this.x1 = x
    this.y1 = y
    this.angle = angle
    this.length = length
    this.pointLength = 20
    this.pointAngle = Math.PI / 6
  }
  calc() {
    this.x2 = this.x1 + Math.sin(this.angle) * this.length
    this.y2 = this.y1 + Math.cos(this.angle) * this.length
    this.x3 =
      this.x2 -
      Math.cos(Math.PI / 2 - (this.angle + this.pointAngle)) * this.pointLength
    this.y3 =
      this.y2 -
      Math.sin(Math.PI / 2 - (this.angle + this.pointAngle)) * this.pointLength
    this.x4 =
      this.x2 + Math.sin(this.pointAngle - this.angle) * this.pointLength
    this.y4 =
      this.y2 - Math.cos(this.pointAngle - this.angle) * this.pointLength
  }
  update() {
    this.calc()
  }
  display() {
    this.update()
    this.p.stroke('black')
    this.p.strokeWeight(2)
    this.p.line(this.x1, this.y1, this.x2, this.y2)
    this.p.line(this.x2, this.y2, this.x3, this.y3)
    this.p.line(this.x2, this.y2, this.x4, this.y4)
  }
}

export default Arrow
