function Nave(pos) {
  this.d = 15;
  this.pos = pos;
  this.a = 0;
  this.vel = createVector(0, 0);

  this.acelerar = function() {
    this.vel = p5.Vector.fromAngle(radians(this.a - 90)).normalize().mult(1);
  }

  this.girar = function(a) {
    this.a += a;
  }

  this.desenhar = function() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(radians(this.a));

    // A nave é desenhada com topo do triângulo
    // isósceles na posição (0, -d). Centro no (0, 0)
    fill(255);
    triangle(0, -this.d, this.d, this.d, -this.d, this.d);
    pop();
    this.tratarBordas();
  }

  this.mover = function() {
    this.pos.add(this.vel);
    this.vel.mult(0.99);
  }

  this.tratarBordas = function() {
    if (this.pos.x >= width + this.d) {
      this.pos.x = -this.d;
    } else if (this.pos.x <= -this.d) {
      this.pos.x = width + this.d;
    }

    if (this.pos.y >= height + this.d) {
      this.pos.y = -this.d;
    } else if (this.pos.y <= -this.d) {
      this.pos.y = height + this.d;
    }
  }
}
