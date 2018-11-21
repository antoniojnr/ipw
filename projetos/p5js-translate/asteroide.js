function Asteroide(pos, r, g, b, diam, vel) {
  this.pos = pos;
  this.r = r;
  this.g = g;
  this.b = b;
  this.diam = diam;
  this.vel = vel;

  this.colidiu = function(pos) {
    if (dist(pos.x, pos.y, this.pos.x, this.pos.y) <= this.diam/2) {
      return true;
    } else {
      return false;
    }
  }

  this.desenhar = function() {
    stroke(this.r, this.g, this.b);
    noFill();
    ellipse(this.pos.x, this.pos.y, this.diam, this.diam);
    this.tratarBordas();
  }

  this.mover = function() {
    this.pos.add(this.vel);
  }

  this.tratarBordas = function() {
    if (this.pos.x >= width + this.diam) {
      this.pos.x = -this.diam;
    } else if (this.pos.x <= -this.diam) {
      this.pos.x = width + this.diam;
    }

    if (this.pos.y >= height + this.diam) {
      this.pos.y = -this.diam;
    } else if (this.pos.y <= -this.diam) {
      this.pos.y = height + this.diam;
    }
  }
}
