var ball1, ball2;
var b1r = 30, b2r = 30;
var stopped;
var vel, acc;

function setup() {
  createCanvas(500, 500);
  ball1 = createVector(250, 250);
  vel = createVector(0, 0);
  acc = createVector(0, 0.9);
}

function applyForce() {
  acc.add(createVector(0, 1));
}

function update() {

  acc.mult(0);
}

function draw() {
  background(0);
  ellipse(ball1.x, ball1.y, b1r * 2, b1r * 2);

  if (!stopped) {
    vel.add(acc);
    ball1.add(vel);

    // se a bola atingir a parte inferior, quicar
    if (ball1.y >= height - b1r) {
      ball1.y = height - b1r;
      vel.mult(-0.9);
    }
  }
}

function mouseDragged() {
  if (dist(mouseX, mouseY, ball1.x, ball1.y) <= b1r) {
    ball1.x = mouseX;
    ball1.y = mouseY;
    stopped = true;
  }
}

function mouseReleased() {
  stopped = false;
}
