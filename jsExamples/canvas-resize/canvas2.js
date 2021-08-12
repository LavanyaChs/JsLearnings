var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext('2d');

// c.fillStyle = 'rgba(255,0,0,0.3)'
// c.fillRect(100, 100, 100, 100);
// c.fillStyle = 'rgba(0,0,255,0.3)'
// c.fillRect(400, 100, 100, 100);
// c.fillStyle = 'rgba(0,255,0,0.3)'
// c.fillRect(200, 400, 100, 100);
// console.log(canvas);

// //Line
// c.beginPath();
// c.moveTo(50, 300);
// c.lineTo(300, 100);
// c.lineTo(400, 300);
// c.strokeStyle = "red"
// c.stroke();

// //arc / circle
// c.beginPath();
// c.arc(300, 300, 30, 0, Math.PI * 2, false)
// c.strokeStyle = "green"
// c.stroke();

// for (let i = 0; i < 3; i++) {
//     let x = Math.random() * window.innerWidth;
//     let y = Math.random() *window.innerHeight;
//     c.beginPath();
//     c.arc(x, y, 30, 0, Math.PI * 2, false)
//     c.strokeStyle = "blue"
//     c.stroke();
// }

let maxRadius = 50;
let minRadius = 2;
let mouse = {
    x: undefined,
    y: undefined
}
let colorArray = [
    '#970FF2', '#0597F2', '#49D907', '#EAF205', '#F24607','#BF0615','#A904BF','#3B0273','#EBF20C','#F2B90C'
]
window.addEventListener('mousemove', (event) => {
    console.log(event);
    mouse.x = event.x;
    mouse.y = event.y;
})
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init()
}
)

function Circle(x, y, dx, dy, radius) {
    this.x = x
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        // c.strokeStyle = "green"
        // c.stroke();
        c.fill();
        c.fillStyle = this.color;
    }
    this.update = function () {
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;

        if (mouse.x - this.x < 50 && mouse.x - this.x > -50
            && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            if (this.radius < maxRadius) {
                this.radius += 1;
            }
        } else if (this.radius > this.minRadius) {
            this.radius -= 1;
        }

        this.draw()
    }

}



// let circle = new Circle(200, 200, 3, 3, 30);

// let x = Math.random() * innerWidth;
// let y = Math.random() * innerHeight;
// let dx = (Math.random() - 0.5) * 8;
// let dy = (Math.random() - 0.5) * 7;
// let radius = 30;
let circleArray = []
    
function init() {
    circleArray=[];
    for (let p = 0; p < 500; p++) {
        let radius = (Math.random() * 3) + 1;
        //let radius = 30;
        let x = Math.random() * (innerWidth - radius * 2) + radius;
        let y = Math.random() * (innerHeight - radius * 2) + radius;
        let dx = (Math.random() - 0.5);
        let dy = (Math.random() - 0.5);
        circleArray.push(new Circle(x, y, dx, dy, radius));
        console.log(circleArray);
    }
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);

    //circle.update();
    for (let i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }

    

    // c.beginPath();
    // c.arc(x, y, radius, 0, Math.PI * 2, false)
    // c.strokeStyle = "blue"
    // c.stroke();

    //c.lineWidth = '5'

    // if (x + radius > innerWidth || x - radius < 0) {
    //     dx = -dx;
    // }
    // if (y + radius > innerHeight || y - radius < 0) {
    //     dy = -dy;
    // }
    // x += dx;
    // y += dy;
}
animate()
init();
