const canvas = document.getElementById("canvas"),
  ctx = canvas.getContext("2d");

const w = (canvas.width = window.innerWidth);
const h = (canvas.height = window.innerHeight);

const property = {
  number: 700,
  arrParticle: new Array(),
};
const property1 = {
    number: 0,
  arrBlackHole: new Array(),
};
class Particle {
  static mouseX = new Array();
  static mousey = new Array();
  static isDown = false;

  constructor(x, y, rad, color) {
    this.x = x;
    this.y = y;
    this.oraginX = x;
    this.oraginY = y;
    this.rad = rad;
    this.color = color;
    this.dictance = 0;
    this.dx = 0;
    this.dy = 0;
    this.force = 0;
    this.raduies = (w + h) * 130;
    this.angle = 0;
    this.vx = 0;
    this.vy = 0;
    this.fraction = 0.9;
    this.ease = 0.1;
  }
  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.rad, 2 * Math.PI, false);
    ctx.fill();
  }
  update() {
    this.draw();

    for (let i = 0; i < property1.arrBlackHole.length; i++) {
      this.dx = Particle.mouseX[i] - this.x;
      this.dy = Particle.mousey[i] - this.y;

      this.dictance = this.dx * this.dx + this.dy * this.dy;

      if (Particle.isDown == true) {
        this.force = this.raduies / this.dictance;
      } else {
        this.force = -this.raduies / this.dictance;
      }

      this.angle = Math.atan2(this.dx, this.dy);

      this.vx += (Math.sin(this.angle) + Math.cos(this.angle)) * this.force;
      this.vy += (Math.cos(this.angle) - Math.sin(this.angle)) * this.force;

      this.x +=
        (this.vx *= this.fraction) + (this.oraginX - this.x) * this.ease;
      this.y +=
        (this.vy *= this.fraction) + (this.oraginY - this.y) * this.ease;
    }
  }
}

class BlackHole {
  constructor(x, y, rad, color) {
    this.x = x;
    this.y = y;
    this.arr = [1, -1];
    this.rand = this.arr[(Math.random() * (this.arr.length - 1)).toFixed("")];
    this.step = 3;
    this.dx = Math.random() * this.step;
    this.dy = Math.random() * this.step;
    this.rad = rad;
    this.color = color;
  }
  draw() {
    ctx.beginPath();
    ctx.fillStyle = `rgb(${this.x / (w / 255)}, ${this.y / (h / 255)}, ${
      255 - this.y / (h / 255)
    })`;
    ctx.arc(this.x, this.y, this.rad, 2 * Math.PI, false);
    ctx.fill();
  }
  update() {
    this.draw();
    this.i += 0.1;
    this.x += this.dx * this.rand;
    this.y += this.dy * this.rand;

    if (this.x + this.rad > w || this.x < this.rad) {
      this.dx = -this.dx;
    }
    if (this.y + this.rad > h || this.y < this.rad) {
      this.dy = -this.dy;
    }
  }
}
function init() {
  Particle.mouseX[0] = w / 2;
  Particle.mousey[0] = h / 2;
  property1.arrBlackHole.push(
    new BlackHole(Particle.mouseX[0], Particle.mousey[0], 10, "#f00", 0)
  );

for (let i = 0; i < property1.number; i++) {
    let rad = 10;
    let x = Math.random() * (w - (rad * 2)) + rad;
    let y = Math.random() * (h - (rad * 2)) + rad;
    Particle.mouseX.push(x);
    Particle.mousey.push(y);
    property1.arrBlackHole.push(
      new BlackHole(x, y, rad, "#f00", 1)
    );
}
  for (let i = 0; i < property.number; i++) {
    let rad = 3;
    let x = Math.random() * (w - rad * 2) + rad;
    let y = Math.random() * ((h - (h / 2)) - rad * 2) + rad + (h / 2);
    let color = `rgb(${x / (w / 255)}, ${y / (h / 255)}, ${
      255 - y / (h / 255)
    })`;

    property.arrParticle.push(new Particle(x, y, rad, color));
  }
//   window.addEventListener("mousemove", (e) => {
//     Particle.mouseX[0] = e.clientX;
//     Particle.mousey[0] = e.clientY;
//   });
  window.addEventListener("mousedown", (e) => {
    Particle.isDown = true;
  });
  window.addEventListener("mouseup", (e) => {
    Particle.isDown = false;
  });
}
function animate() {
  ctx.clearRect(0, 0, w, h);
  requestAnimationFrame(animate);
  for (let i = 0; i < property.arrParticle.length; i++) {
    property.arrParticle[i].update();
  }
  for (let i = 0; i < property1.arrBlackHole.length; i++) {
    property1.arrBlackHole[i].update();
    Particle.mouseX[i] = property1.arrBlackHole[i].x;
    Particle.mousey[i] = property1.arrBlackHole[i].y;
  }
}

init();
animate();
