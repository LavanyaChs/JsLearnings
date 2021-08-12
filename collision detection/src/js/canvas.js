import utils from './utils'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

// Event Listeners
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX
  mouse.y = event.clientY
})

addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight

  init()
})
const getDistance = (x1, y1, x2, y2) => {
  let xDis = x2 - x1;
  let yDis = y2 - y1;

  return Math.sqrt(Math.pow(xDis, 2) + Math.pow(yDis, 2));
}



/**
 * Rotates coordinate system for velocities
 *
 * Takes velocities and alters them as if the coordinate system they're on was rotated
 *
 * @param  Object | velocity | The velocity of an individual particle
 * @param  Float  | angle    | The angle of collision between two objects in radians
 * @return Object | The altered x and y velocities after the coordinate system has been rotated
 */

function rotate(velocity, angle) {
  const rotatedVelocities = {
    x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
    y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
  };

  return rotatedVelocities;
}

/**
 * Swaps out two colliding particles' x and y velocities after running through
 * an elastic collision reaction equation
 *
 * @param  Object | particle      | A particle object with x and y coordinates, plus velocity
 * @param  Object | otherParticle | A particle object with x and y coordinates, plus velocity
 * @return Null | Does not return a value
 */

function resolveCollision(particle, otherParticle) {
  const xVelocityDiff = particle.velocity.x - otherParticle.velocity.x;
  const yVelocityDiff = particle.velocity.y - otherParticle.velocity.y;

  const xDist = otherParticle.x - particle.x;
  const yDist = otherParticle.y - particle.y;

  // Prevent accidental overlap of particles
  if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {

    // Grab angle between the two colliding particles
    const angle = -Math.atan2(otherParticle.y - particle.y, otherParticle.x - particle.x);

    // Store mass in var for better readability in collision equation
    const m1 = particle.mass;
    const m2 = otherParticle.mass;

    // Velocity before equation
    const u1 = rotate(particle.velocity, angle);
    const u2 = rotate(otherParticle.velocity, angle);

    // Velocity after 1d collision equation
    const v1 = { x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y };
    const v2 = { x: u2.x * (m2 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2), y: u2.y };

    // Final velocity after rotating axis back to original location
    const vFinal1 = rotate(v1, -angle);
    const vFinal2 = rotate(v2, -angle);

    // Swap particle velocities for realistic bounce effect
    particle.velocity.x = vFinal1.x;
    particle.velocity.y = vFinal1.y;

    otherParticle.velocity.x = vFinal2.x;
    otherParticle.velocity.y = vFinal2.y;
  }
}

// Objects
class Object {
  constructor(x, y, radius, color) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
    this.velocity = {
      x: (Math.random() - 0.5) * 5,
      y: (Math.random() - 0.5) * 7
    }
    this.mass = 10;
    this.opacity = 0;

  }

  draw() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.save();
    c.fillStyle = this.color;
    c.globalAlpha = this.opacity;
    c.fill();
    c.restore();
    c.strokeStyle = this.color
    c.stroke()
    c.closePath()
  }

  update(objects) {
    this.draw();
    if (this.x - this.radius < 0 || this.x + this.radius >= innerWidth) {
      this.velocity.x = -this.velocity.x;
    }
    if (this.y - this.radius < 0 || this.y + this.radius >= innerHeight) {
      this.velocity.y = -this.velocity.y;
    }
    if (getDistance(mouse.x, mouse.y, this.x, this.y) < 120 && this.opacity < 0.2) {
      this.opacity += 0.02;
    } else if (this.opacity > 0) {
      this.opacity -= 0.02;;
      this.opacity = Math.max(0, this.opacity);
    }
    // if (this.radius < 100) {
    //   this.radius = this.radius + 1;
    // } else if (this.radius > 0) {
    //   this.radius = this.radius - 1;
    //   this.radius = Math.min(40, this.radius);
    // }
    this.x = this.x + this.velocity.x;
    this.y = this.y + this.velocity.y;
    for (let i = 0; i < objects.length; i++) {
      if (this == objects[i]) return;
      if (getDistance(this.x, this.y, objects[i].x, objects[i].y) - 2 * this.radius < 0) {
        resolveCollision(this, objects[i])
      }
    }

  }
}

// Implementation
let objects;

function init() {
  objects = [];
  // circleObj = new Object(300,300,100,'black');
  // circle2=new Object(undefined,undefined,30,'red');

  for (let i = 0; i < 300; i++) {
    let radius = 20;
    let x = utils.randomIntFromRange(radius, innerWidth - radius);
    let y = utils.randomIntFromRange(radius, innerHeight - radius);
    let color = utils.randomColor(colors)
    if (i != 0) {
      for (let j = 0; j < objects.length; j++) {
        let dist = getDistance(x, y, objects[j].x, objects[j].y);
        if (dist - 2 * radius < 0) {
          x = utils.randomIntFromRange(radius, innerWidth - radius);
          y = utils.randomIntFromRange(radius, innerHeight - radius);
          j = -1;
        }

      }
    }
    objects.push(new Object(x, y, radius, color))
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate)
  c.clearRect(0, 0, canvas.width, canvas.height)

  // c.fillText('HTML CANVAS BOILERPLATE', mouse.x, mouse.y)
  objects.forEach(object => {
    object.update(objects)
  })

}

init()
animate()
