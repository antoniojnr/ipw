var c1 = {
  r: 100
}
var c2 = {
  r: 80
}
var spacing = 5;

function setup() {
  createCanvas(640, 480);
  c1.coord = createVector(0, 0);
  c1.coord.x = width/2;
  c1.coord.y = height/2;
}

function draw() {
  background(255);
  drawEllipse(c1);
  c2.coord = createVector(mouseX, mouseY);
  drawEllipse(c2);
  var d = dist(c1.coord.x, c1.coord.y, c2.coord.x, c2.coord.y);

  if (d <= c1.r + c2.r) {
    stroke('#0000ff');
  } else {
    stroke('#ff0000');
  }

  line(c1.coord.x, c1.coord.y, c2.coord.x, c2.coord.y);
  stroke(255);
  fill(0);
  textAlign(CENTER);
  text('Dist.=' + d.toFixed(2), (c1.coord.x + c2.coord.x)/2, (c1.coord.y + c2.coord.y)/2 - spacing);
}

function drawEllipse(circle) {
  fill(150);
  strokeWeight(2);
  stroke(0);
  ellipse(circle.coord.x, circle.coord.y, circle.r * 2, circle.r * 2);
  var border = createVector(circle.coord.x + circle.r, circle.coord.y);
  stroke('#00FF00');
  line(circle.coord.x, circle.coord.y, border.x, border.y);
  stroke(255);
  fill(0);
  textAlign(CENTER);
  text('R=' + circle.r, circle.coord.x + circle.r/2, circle.coord.y - spacing);
}
