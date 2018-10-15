var itens = [];
var pontos = 0;
function setup() {
  createCanvas(640, 480);
  for (var i = 0; i < 100; i++) {
    spawn();
  }
}

function draw() {
  noStroke();
  background('#29A0FF');

  for (var i = itens.length - 1; i >= 0; i--) {
    var c = itens[i];

    fill(c.color, c.t);
    ellipse(c.x, c.y, c.r, c.r);
    if (c.y > height + c.r/2) {
      itens.splice(i, 1);
    } else {
      c.y += c.vel;
    }
  }
  fill(255);
  textSize(32);
  text(pontos, 10, height - 15);
}

function mouseReleased() {
  for (var i = itens.length - 1; i >= 0; i--) {
    var c = itens[i];
    if (dist(c.x, c.y, mouseX, mouseY) < c.r/2) {
      itens.splice(i, 1);
      pontos += Math.trunc(c.vel);
    }
  }
}

function spawn() {
  var num = random(1);
  if (num >= 0.5) {
    itens.push({
      x: random(width),
      y: -5,
      r: random(10, 60),
      vel: random(1, 5),
      t: random(40, 100),
      color: 255
    });
  }
}
