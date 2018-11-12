var ball1;
var b1r = 30;
var vel, acc;

function setup() {
  createCanvas(500, 500);
  ball1 = createVector(250, 0);
  vel = createVector(0, 0);
  acc = createVector(0.4, 0.9);
}

function draw() {
  background(0);
  ellipse(ball1.x, ball1.y, b1r * 2, b1r * 2);

  vel.add(acc);
  ball1.add(vel);

  if (ball1.x >= width - b1r) {
    vel.x *= -0.9;
    ball1.x = width - b1r
  }

  if (ball1.x <= b1r) {
    vel.x *= -0.9;
    ball1.x = b1r
  }

  if (ball1.y >= height - b1r) {
    vel.y *= -0.9;
    ball1.y = height - b1r
  }

  if (ball1.y <= b1r) {
    vel.y *= -0.9;
    ball1.y = b1r
  }
}

function mouseDragged() {
  if (dist(mouseX, mouseY, ball1.x, ball1.y) <= b1r) {
    ball1.x = mouseX;
    ball1.y = mouseY;
  }
}
