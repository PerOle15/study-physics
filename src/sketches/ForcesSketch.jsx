import Sketch from 'react-p5'
import Arrow from '../utils/Vector'

function ForcesSketch() {
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

  return <Sketch setup={setup} draw={draw} />
}

export default ForcesSketch
