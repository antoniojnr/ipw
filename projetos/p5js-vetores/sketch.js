

var v1, v2, vc, vb, ve, vd, a = 0;

function setup() {
  createCanvas(500, 500);
  v1 = createVector(random(width), random(height));
  v2 = createVector(random(width), random(height));

  vc = createVector(0, -5);
  vb = createVector(0, 5);
  ve = createVector(-5, 0);
  vd = createVector(5, 0);
  frameRate(10);
}

function draw() {
  background(255);
  fill("#FF0000");
  line(0, 0, v1.x, v1.y);
  ellipse(v1.x, v1.y, 10, 10);

  fill("#00FF00");
  line(0, 0, v2.x, v2.y);
  ellipse(v2.x, v2.y, 10, 10);

  fill("#0000FF");
  var vr = p5.Vector.add(v1, v2);
  line(0, 0, vr.x, vr.y);
  ellipse(vr.x, vr.y, 10, 10);
}

function keyPressed() {
  if (keyCode == 37) {
    v1.add(ve);
  } else if (keyCode == 38) {
    v1.add(vc);
  } else if (keyCode == 39) {
    v1.add(vd);
  } else if (keyCode == 40) {
    v1.add(vb);
  }
}

function mouseDragged() {
  if (dist(mouseX, mouseY, v1.x, v1.y) <= 5) {
    v1.x = mouseX;
    v1.y = mouseY;
  }

  if (dist(mouseX, mouseY, v2.x, v2.y) <= 5) {
    v2.x = mouseX;
    v2.y = mouseY;
  }
}
