var pieces = [];
var size;

function setup() {
  createCanvas(500, 500);
  size = 50;
  frameRate(10);
}

function draw() {
  background(0);
  if (random(1) >= 0.9) {
    spawn();
  }

  for (var i = pieces.length - 1; i >= 0; i--) {
    var p = pieces[i];

    p.desenhar();
    p.descer();
  }
}

function spawn() {
  var pos = Math.trunc(random(10));
  pieces.push(new Piece(pos * size, -size, size));
}
