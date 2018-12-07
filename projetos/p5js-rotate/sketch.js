var quads = [];
var cont = 10;
var x = 0, y = 0;
function setup() {
  createCanvas(501, 501);
  for (var i = 0; i < 100; i++) {
    if (i == cont){
      y += 50
      x = 0
      cont += 10
    }
     quads.push({
       x: x,
       y: y,
       d: 50,
     });
    x += 50
   }
}

function draw() {
  background(0);
  for (var i = 0; i <= quads.length - 1; i++){
    var quad = quads[i]
    rect(quad.x, quad.y, quad.d, quad.d);
    if (mouseIsPressed) {
      if (quad.x + quad.d >= mouseX && quad.x <= mouseX){
        if (quad.y + quad.d >= mouseY && quad.y <= mouseY){
          quads.splice(i, 1);
        }
      }
    }
  }
}
