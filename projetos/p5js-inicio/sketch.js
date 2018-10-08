var x = 50;
var y = 50;
var xVel = 5;
var yVel = 7;
var diametro = 80;
function setup() {
  createCanvas(600, 400);
  background('#a7d8f9');
}

function draw() {
  background('#a7d8f9');
  ellipse(x, y, diametro, diametro);
  x += xVel;
  y += yVel;

  if (x > width - diametro/2 || x < diametro/2) {
    xVel = -xVel;
  }

  if (y > height - diametro/2 || y < diametro/2) {
    yVel = -yVel;
  }
}
