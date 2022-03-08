const canvas = document.getElementById('three-body-problem-canvas')
const c = canvas.getContext('2d')

const constants = {
  gravitationalConstant: 6.67408 * Math.pow(10, -11),
  // Average density of the body (kg/m^3). Used for calculating body's radius form its mass
  averageDensity: 1410,
}

let state = {
  u: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
}
let initialConditions = {
  bodies: 3,
}

// Runge-Kutta numerical integration
const rungeKutta = (function () {
  // h: timestep
  // u: variables
  // derivative: function that calculates the derivatives
  function calculate(h, u, derivative) {
    var a = [h / 2, h / 2, h, 0]
    var b = [h / 6, h / 3, h / 3, h / 6]
    var u0 = []
    var ut = []
    var dimension = u.length

    for (var i = 0; i < dimension; i++) {
      u0.push(u[i])
      ut.push(0)
    }

    for (var j = 0; j < 4; j++) {
      var du = derivative()

      for (i = 0; i < dimension; i++) {
        u[i] = u0[i] + a[j] * du[i]
        ut[i] = ut[i] + b[j] * du[i]
      }
    }

    for (i = 0; i < dimension; i++) {
      u[i] = u0[i] + ut[i]
    }
  }

  return {
    calculate,
  }
})()

function acceleration(iFromBody, coordinate) {
  let result = 0
  // Starting index for the body in the u array
  let iFromBodyStart = iFromBody * 4

  // Loop through the bodies
  for (let iToBody = 0; iToBody < initialConditions.bodies; iToBody++) {
    if (iFromBody === iToBody) {
      continue
    }
    //starting index for the body in the u array
    let iToBodyStart = iToBody * 4

    // Distance between the two bodies
    let distanceX = state.u[iToBodyStart + 0] - state.u[iFromBodyStart + 0]

    let distanceY = state.u[iToBodyStart + 1] - state.u[iFromBodyStart + 1]

    let distance = Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2))

    result +=
      (constants.gravitationalConstant *
        initialConditions.masses[iToBody] *
        (state.u[iToBodyStart + coordinate] -
          state.u[iFromBodyStart + coordinate])) /
      Math.pow(distance, 3)
  }

  return result
}

function derivative() {
  let du = new Array(initialConditions.bodies * 4)
  return du
  for (let iBody = 0; iBody < initialConditions.bodies; iBody++) {
    let bodyStart = iBody * 4
    du[bodyStart + 0] = state.u[bodyStart + 0 + 2] // velocity x
    du[bodyStart + 1] = state.u[bodyStart + 0 + 3] // velocity y
    du[bodyStart + 2] = acceleration(iBody, 0) // acceleration x
    du[bodyStart + 3] = acceleration(iBody, 1) // acceleration y
  }
}

console.log(derivative())
