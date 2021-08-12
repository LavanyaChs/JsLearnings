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
const getDistance=(x1,y1,x2,y2)=>{
  let xDis = x2-x1;
  let yDis = y2-y1;
  
  return Math.sqrt(Math.pow(xDis,2)+Math.pow(yDis,2));
}
// Objects
class Object {
  constructor(x, y, radius, color) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
  }

  draw() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill()
    c.closePath()
  }

  update() {
    this.draw()
  }
}

// Implementation
let objects;
let circleObj;
let circle2;
function init() {
objects = [];
circleObj = new Object(300,300,100,'black');
circle2=new Object(undefined,undefined,30,'red');

  for (let i = 0; i < 400; i++) {
    // let x = Math.rand
     // objects.push()
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate)
  c.clearRect(0, 0, canvas.width, canvas.height)

 // c.fillText('HTML CANVAS BOILERPLATE', mouse.x, mouse.y)
  // objects.forEach(object => {
  //  object.update()
  // })
  circleObj.update()
  circle2.x=mouse.x;
  circle2.y=mouse.y;
  circle2.update();
  if(getDistance(circleObj.x,circleObj.y,circle2.x,circle2.y)<circleObj.radius+circle2.radius){
  circleObj.color='red';
  }else{
  circleObj.color='black'
  }
  // console.log(getDistance(circleObj.x,circleObj.y,circle2.x,circle2.y));
}

init()
animate()
