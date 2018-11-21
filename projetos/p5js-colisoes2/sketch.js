var pos;
var steps = 10;

function setup() {
  createCanvas(640, 480);
  pos = createVector(250, 250);
}

function draw() {
  background(255);
  noFill();
  beginShape();
  var a = 0;

  for (var i = 0; i < steps; i++) {
    var r = 50;
    var x = pos.x + cos(radians(a)) * r;
    var y = pos.y + sin(radians(a)) * r;
    a += 360/steps;
    vertex(x, y);
  }
  endShape(CLOSE);
  // pos.add(createVector(2, 2));
}

// function keyPressed() {
//   steps += 1;
// }
