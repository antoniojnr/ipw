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
var r1 = 25, r2 = 10;

function setup() {
  createCanvas(640, 480);
  x = random(width - 25);
  y = random(height - 25);
  nave.x = width/2;
  nave.y = height - nave.h - margem;
}

function draw() {
  background('#bad4ff');
  ellipse(x, y, r1*2, r1*2);

  var x1 = nave.x - nave.l/2;
  var x2 = nave.x + nave.l/2;

  triangle(nave.x, nave.y, x1, nave.y + nave.h, x2, nave.y + nave.h);
  for (var i = 0; i < nave.bullets.length; i++) {
    var b = nave.bullets[i];
    ellipse(b.x, b.y, 4, 4);
    b.y -= 5;
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
