function Piece(x, y, size) {
  this.x = x;
  this.y = y;

  this.descer = function() {
    this.y += size;
  }

  this.desenhar = function() {
    rect(this.x, this .y, size, size);
  }
}
