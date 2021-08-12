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
const gravity = 5;
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
addEventListener('click', () => {
  
  init()
})

// Objects
class Ball {
  constructor(x, y, dx, dy, radius, color) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
    this.dy = dy;
    this.dx = dx;
  }

  draw() {
    c.beginPath()
      // c.arc(this.x, this.y, this.radius, 0, 2*Math.PI, false);
    c.rect(this.x,this.y,this.radius,this.radius);
    c.moveTo(50,50);
    c.lineTo(this.x,this.y);
    c.moveTo(canvas.width-550,canvas.height- 550);
    c.lineTo(this.x,this.y);
    c.moveTo(50,canvas.height- 250);
    c.lineTo(this.x,this.y);
    c.moveTo(canvas.width-150,50);
    c.lineTo(this.x,this.y);
    c.strokeStyle=this.color
    // c.moveTo(this.x,this,y);
    // c.lineTo(this.x+this.radius,this.y+this.radius);
    // c.lineTo(this.x,this.y+(this.radius*2));
    // c.lineTo(this.x-this.radius,this.y-this.radius);
    // c.lineTo(this.x,this.y)
    // c.moveTo(55, 55);
    // c.lineTo(105, 55);
    // c.lineTo(55, 105);
    c.fill();
    c.fillStyle = this.color
    c.fill()
    c.stroke();
    c.closePath()
  }

  update() {
    if (this.y + this.radius + this.dy > canvas.height) {
      this.dy = -this.dy * 0.5;
    } else {
      this.dy += gravity;
    }
    if (this.x + this.radius + this.dx > canvas.width || this.x - this.radius <= 0) {
      this.dx = -this.dx;
    }
    this.x += this.dx;
    this.y += this.dy;
    this.draw()
  }
}

// Implementation
var ball;
let objects
function init() {
  objects = []
  // ball = new Ball(canvas.width / 2, canvas.height / 2, 2, 30, 'red');
  // console.log(ball);
  // let radius = 30
  for (let i = 0; i < 200; i++) {
    let radius = utils.randomIntFromRange(8, 20);
    let x = utils.randomIntFromRange(30, canvas.width - radius);
    let y = utils.randomIntFromRange(30, canvas.height - radius);

    let dx = utils.randomIntFromRange(-2, 2);
    let dy = utils.randomIntFromRange(-2, 2);
    var color = utils.randomColor(colors);
    objects.push(new Ball(x, y, dx, dy, radius, color))

  }
  // console.log(objects);
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate)
  c.clearRect(0, 0, canvas.width, canvas.height)
  //ball.update();
  // c.fillText('HTML CANVAS BOILERPLATE', mouse.x, mouse.y)
  objects.forEach(object => {
    console.log(object);
    object.update()
  })
}

init()
animate()
