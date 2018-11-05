var nave, a, d = 15, vel;
var turb = [];
var bullets = [];
var n;

function setup() {
  createCanvas(500, 500);
  var pos = createVector(250, 250);
  n = new Nave(pos);
  a = 0;
  vel = createVector(0, 0);
  noStroke();
}

function draw() {
  background(0);

  for (var i = bullets.length - 1; i >= 0; i--) {
    var b = bullets[i];

    ellipse(b.pos.x, b.pos.y, 4, 4);
    b.pos.add(b.vel);

    if (b.pos.x < 0 || b.pos.x > width
      || b.pos.y < 0 || b.pos.y > height) {
        bullets.splice(i, 1);
    }
  }

  for (var i = turb.length - 1; i >= 0; i--) {
    var b = turb[i];

    // A cor começa amarela e vai ficando vermelha
    fill(255, b.color, 0);
    b.color -= 3;

    ellipse(b.pos.x, b.pos.y, 4, 4);
    b.pos.add(b.vel);

    // Use para fazer com que a bala desapareça
    // ao ultrapassar os limites da tela
    // if (b.pos.x < 0 || b.pos.x > width
    //   || b.pos.y < 0 || b.pos.y > height) {

    // Use para fazer com que a bala desapareça
    // ao atingir uma distância aleatória da nave
    // entre 70 e 149.99
    if (b.pos.x < 0 || b.pos.x > width
      || b.pos.y < 0 || b.pos.y > height
      || dist(b.pos.x, b.pos.y, nave.x, nave.y) > random(70, 150)) {
      turb.splice(i, 1);
    }
  }

  n.desenhar();
  n.mover();

  if (keyIsDown(37)) {
    n.girar(-10);
  } else if (keyIsDown(38)) {
    n.acelerar();
    // t_angle = random(-20, 20);
    // turb.push({
    //   pos: createVector(nave.x, nave.y),
    //   vel: p5.Vector.fromAngle(radians(a - 90 + t_angle)).mult(-2),
    //   color: 255
    // });
  } else if (keyIsDown(39)) {
    n.girar(10);
  }
}

function keyPressed() {
  if (keyCode == 32) {
    bullets.push({
      pos: createVector(nave.x, nave.y),
      vel: p5.Vector.fromAngle(radians(a - 90)).mult(2)
    });
  }
}
