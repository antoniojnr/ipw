var x, y;
var margem = 20;
var nave = {
  x: 0,
  y: 0,
  h: 30,
  l: 30,
  speed: 5,
  bullets: []
};
var pontos = 0;
var r1 = 25, r2 = 10, rb = 2;

function setup() {
  createCanvas(640, 480);
  redefinirBola();
  nave.x = width/2;
  nave.y = height - nave.h - margem;
}

function redefinirBola() {
  x = random(width - 25);
  y = random(r1, height - r1 - nave.h - margem);
}

function draw() {
  background('#bad4ff');
  ellipse(x, y, r1*2, r1*2);
  text(pontos, 10, height - margem);
  
  var x1 = nave.x - nave.l/2;
  var x2 = nave.x + nave.l/2;

  triangle(nave.x, nave.y, x1, nave.y + nave.h, x2, nave.y + nave.h);
  for (var i = nave.bullets.length - 1; i >= 0 ; i--) {
    var b = nave.bullets[i];
    ellipse(b.x, b.y, rb * 2, rb * 2);

    if (r1 + rb >= dist(b.x, b.y, x, y)) {
      redefinirBola();
      nave.bullets.splice(i, 1);
      pontos += 1;
    }

    if (b.y < -rb) {
      nave.bullets.splice(i, 1);
    } else {
      b.y -= 5;
    }
  }

  if (keyIsDown(37)) { // esquerda
    if (nave.x > nave.l/2 + margem) {
      nave.x -= nave.speed;
    }
  } else if (keyIsDown(39)) { // direita
    if (nave.x < width - nave.l/2 - margem) {
      nave.x += nave.speed;
    }
  }
}

function keyPressed() {
  if (keyCode == 32) {
    nave.bullets.push({
      x: nave.x,
      y: nave.y
    });
  }
  console.log(nave.bullets.length);
}
