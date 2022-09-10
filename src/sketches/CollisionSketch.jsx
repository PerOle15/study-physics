import Sketch from 'react-p5'

function CollisionSketch() {
  const frames = 60
  const setup = (p, canvasParentRef) => {
    p.createCanvas(800, 500).parent(canvasParentRef)
    p.frameRate(frames)
    p.background(180)
  }
  const draw = (p) => {
    p.fill(180)
    p.rect(0, 0, p.width, p.height)
  }

  return <Sketch setup={setup} draw={draw} />
}

export default CollisionSketch
