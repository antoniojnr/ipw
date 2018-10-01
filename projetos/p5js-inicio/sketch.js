var x = 50;
var y = 50;
var vel = 5;

function setup() {
  createCanvas(600, 400);
  background('#a7d8f9');
}

function draw() {
  background('#a7d8f9');
  ellipse(x, y, 80, 80);
  x += vel;

  if (x > width || x < 0) {
    vel = -vel;
  }
}
