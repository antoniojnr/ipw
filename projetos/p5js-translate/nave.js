function Nave(pos) {
  this.d = 15;
  this.pos = pos;
  this.a = 0;
  this.vel = createVector(0, 0);
  this.bullets = [];
  this.turbina = [];

  this.acelerar = function() {
    this.vel = p5.Vector.fromAngle(radians(this.a - 90)).normalize().mult(1);

    var espalhamento = random(-20, 20);
    this.turbina.push({
      pos: createVector(this.pos.x, this.pos.y),
      vel: p5.Vector.fromAngle(radians(this.a - 90 + espalhamento)).mult(-2),
      color: 255
    });
  }

  this.girar = function(a) {
    this.a += a;
  }

  this.desenhar = function() {
    // Desenhando as balas
    for (var i = this.bullets.length - 1; i >= 0; i--) {
      var b = this.bullets[i];

      fill(255);
      ellipse(b.pos.x, b.pos.y, 4, 4);
      b.pos.add(b.vel);

      if (b.pos.x < 0 || b.pos.x > width
        || b.pos.y < 0 || b.pos.y > height) {
          this.bullets.splice(i, 1);
      }
    }

    // Desenhando a turbina
    for (var i = this.turbina.length - 1; i >= 0; i--) {
      var b = this.turbina[i];

      // A cor começa amarela e vai ficando vermelha
      fill(255, b.color, 0);
      b.color -= 3;

      ellipse(b.pos.x, b.pos.y, 4, 4);
      b.pos.add(b.vel);

      // Use para fazer com que a bala desapareça
      // ao ultrapassar os limites da tela
      // e para fazer com que a bala desapareça
      // ao atingir uma distância aleatória da nave
      // entre 70 e 149.99
      if (b.pos.x < 0 || b.pos.x > width
        || b.pos.y < 0 || b.pos.y > height
        || dist(b.pos.x, b.pos.y, this.pos.x, this.pos.y) > random(70, 150)) {
        this.turbina.splice(i, 1);
      }
    }

    push();
    translate(this.pos.x, this.pos.y);
    rotate(radians(this.a));

    // A nave é desenhada com topo do triângulo
    // isósceles na posição (0, -d). Centro no (0, 0)
    stroke(255);
    fill(0);
    triangle(0, -this.d, this.d, this.d, -this.d, this.d);
    pop();
    
    this.tratarBordas();
  }

  this.mover = function() {
    this.pos.add(this.vel);
    this.vel.mult(0.99);
  }

  this.atirar = function() {
    this.bullets.push({
      pos: createVector(this.pos.x, this.pos.y),
      vel: p5.Vector.fromAngle(radians(this.a - 90)).mult(2)
    });
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
