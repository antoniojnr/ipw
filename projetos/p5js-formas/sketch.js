var x = 0;
var y = 0;
var xVel = 0;
var yVel = 0;
var lado = 80;

function setup() {
  createCanvas(600, 400);
  background('#a7d8f9');
  x = random(0, width - lado);
  y = random(0, height - lado);
}

function draw() {
  background('#a7d8f9');
  rect(x, y, lado, lado);

  x += xVel;
  y += yVel;

  if (x > width) {
    x = -lado;
  } else if (x < -lado) {
    x = width;
  }

  if (y > height) {
    y = -lado;
  } else if (y < -lado) {
    y = height;
  }
}

function keyPressed() {
  if (keyCode == RIGHT_ARROW) {
    xVel = 5;
  } else if (keyCode == LEFT_ARROW) {
    xVel = -5;
  } else if (keyCode == UP_ARROW) {
    yVel = -5;
  } else if (keyCode == DOWN_ARROW) {
    yVel = 5;
  }
}
