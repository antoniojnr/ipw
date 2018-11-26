var grid = [];

function setup() {
  createCanvas(501, 501);
  for (var i = 0; i < 10; i++) {
    for (var j = 0; j < 10; j++) {
      grid.push(createVector(i * 50, j * 50));
    }
  }
}

function draw() {
  background(0);
  for (var sq of grid) {
    rect(sq.x, sq.y, 50, 50);
  }
}

function mouseClicked() {
  for (var i = grid.length - 1; i >= 0; i--) {
    var sq = grid[i];
    if (sq.x <= mouseX && mouseX <= sq.x + 50
        && sq.y <= mouseY && mouseY <= sq.y + 50) {
      grid.splice(i, 1);
    }
  }
}
