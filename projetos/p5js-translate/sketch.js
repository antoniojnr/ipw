var n;
var asteroides = [];

function setup() {
  createCanvas(500, 500);
  n = new Nave(createVector(250, 250));
}

function draw() {
  background(0);

  for (var i = asteroides.length - 1; i >= 0; i--) {
    var ast = asteroides[i];

    stroke(ast.r, ast.g, ast.b);
    noFill();
    ellipse(ast.pos.x, ast.pos.y, ast.diam, ast.diam);
    ast.pos.add(ast.vel);
  }

  n.desenhar();
  n.mover();

  if (keyIsDown(37)) {
    n.girar(-10);
  } else if (keyIsDown(39)) {
    n.girar(10);
  } else if (keyIsDown(38)) {
    n.acelerar();
  }

  if (random(1) > 0.995) {
    asteroides.push({
      pos: createVector(random(width), random(height)),
      diam: random(20, 50),
      r: Math.trunc(random(50, 200)),
      g: Math.trunc(random(50, 200)),
      b: Math.trunc(random(50, 200)),
      vel: p5.Vector.fromAngle(radians(random(360))).mult(1),
    })
  }
}

function keyPressed() {
  if (keyCode == 32) {
    n.atirar();
  }
}
