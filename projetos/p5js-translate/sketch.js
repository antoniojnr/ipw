var nave;
var pontos = 0;
var asteroides = [];

function setup() {
  createCanvas(500, 500);
  nave = new Nave(createVector(250, 250));
}

function draw() {
  background(0);

  for (var i = asteroides.length - 1; i >= 0; i--) {
    var ast = asteroides[i];

    ast.desenhar();
    ast.mover();
    for (var j = nave.balas.length - 1; j >= 0; j--) {
      var b = nave.balas[j];

      if (ast.colidiu(b.pos)) {
        asteroides.splice(i, 1);
        nave.balas.splice(j, 1);

        if (ast.diam >= 20) {
          pontos += 2;
          asteroides.push(new Asteroide(
            createVector(ast.pos.x, ast.pos.y),
            Math.trunc(random(50, 200)),
            Math.trunc(random(50, 200)),
            Math.trunc(random(50, 200)),
            random(10, ast.diam/2),
            p5.Vector.fromAngle(radians(random(360))).mult(1)
          ));
          asteroides.push(new Asteroide(
            createVector(ast.pos.x, ast.pos.y),
            Math.trunc(random(50, 200)),
            Math.trunc(random(50, 200)),
            Math.trunc(random(50, 200)),
            random(10, ast.diam/2),
            p5.Vector.fromAngle(radians(random(360))).mult(1)
          ));
        } else {
          pontos += 1;
        }
      }
    }
  }

  nave.desenhar();
  nave.mover();

  if (keyIsDown(37)) {
    nave.girar(-5);
  } else if (keyIsDown(39)) {
    nave.girar(5);
  } else if (keyIsDown(38)) {
    nave.acelerar();
  }

  if (random(1) > 0.99) {
    asteroides.push(
      new Asteroide(
        createVector(random(width), random(height)),
        Math.trunc(random(50, 200)),
        Math.trunc(random(50, 200)),
        Math.trunc(random(50, 200)),
        random(20, 50),
        p5.Vector.fromAngle(radians(random(360))).mult(1)
      )
    );
  }

  textSize(20);
  fill(255);
  text(pontos, 20, height - 20);
}

function keyPressed() {
  if (keyCode == 32) {
    nave.atirar();
  }
}
