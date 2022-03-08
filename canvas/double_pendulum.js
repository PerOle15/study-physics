const canvas = document.getElementById('double-pendulum-canvas')
const c = canvas.getContext('2d')
c.fillStyle = '#f3f3f3'
c.fillRect(0, 0, canvas.width, canvas.height)

c.translate(canvas.width / 2, canvas.height / 2)

const g = 9.81 / (60 * 60)

function DoublePendulum(l1, l2, angle1, angle2) {
  this.l1 = l1
  this.l2 = l2
  this.angle1 = (angle1 / 360) * Math.PI * 2
  this.angle2 = (angle2 / 360) * Math.PI * 2
  this.x1 = this.l1 * Math.sin(this.angle1)
  this.y1 = this.l1 * Math.cos(this.angle1)
  this.x2 = this.x1 + this.l2 * Math.sin(this.angle2)
  this.y2 = this.y1 + this.l2 * Math.cos(this.angle2)
  this.a1_v = 0
  this.a2_v = 0
  this.a1_a = 0
  this.a2_a = 0
  this.m1 = 0.2
  this.m2 = 0.2
  this.radius = 10
  this.scale = 100

  this.update = function () {
    this.a1_a =
      (-g * (2 * this.m1 + this.m2) * Math.sin(this.angle1) -
        this.m2 * g * Math.sin(this.angle1 - 2 * this.angle2) -
        2 *
          Math.sin(this.angle1 - this.angle2) *
          this.m2 *
          (this.a2_v * this.a2_v * this.l2 +
            this.a1_v *
              this.a1_v *
              this.l1 *
              Math.cos(this.angle1 - this.angle2))) /
      (this.l1 *
        (2 * this.m1 +
          this.m2 -
          this.m2 * Math.cos(2 * this.angle1 - 2 * this.angle2)))
    this.a2_a =
      (2 *
        Math.sin(this.angle1 - this.angle2) *
        (this.a1_v * this.a1_v * this.l1 * (this.m1 + this.m2) +
          g * (this.m1 + this.m2) * Math.cos(this.angle1) +
          this.a2_v *
            this.a2_v *
            this.l2 *
            this.m2 *
            Math.cos(this.angle1 - this.angle2))) /
      (this.l1 *
        (2 * this.m1 +
          this.m2 -
          this.m2 * Math.cos(2 * this.angle1 - 2 * this.angle2)))

    this.a1_v += this.a1_a
    this.a2_v += this.a2_a
    this.angle1 += this.a1_v
    this.angle2 += this.a2_v

    this.x1 = this.l1 * Math.sin(this.angle1)
    this.y1 = this.l1 * Math.cos(this.angle1)
    this.x2 = this.x1 + this.l2 * Math.sin(this.angle2)
    this.y2 = this.y1 + this.l2 * Math.cos(this.angle2)

    this.x1 *= this.scale
    this.y1 *= this.scale
    this.x2 *= this.scale
    this.y2 *= this.scale
  }

  this.draw = function () {
    this.update()

    c.fillStyle = 'black'
    c.beginPath()
    c.moveTo(0, 0)
    c.lineTo(this.x1, this.y1)
    c.lineTo(this.x2, this.y2)
    c.stroke()
    c.closePath()
    c.beginPath()
    c.arc(this.x1, this.y1, this.radius, 0, Math.PI * 2)
    c.arc(this.x2, this.y2, this.radius, 0, Math.PI * 2)
    c.fill()
    c.closePath()
  }
}

const pendulum1 = new DoublePendulum(1.5, 1, 170, 130)

function animate() {
  requestAnimationFrame(animate)
  c.fillStyle = '#f3f3f3'
  c.fillRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height)
  pendulum1.draw()
}

animate()
