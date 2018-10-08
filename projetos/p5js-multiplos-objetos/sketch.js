var itens = [];

function setup() {
  createCanvas(640, 480);
  // Adicionamos os objetos à lista. Neste
  // exemplo, isso deve acontecer somente
  // uma vez e, por isso, está na função
  // setup()
  for (var i = 0; i < 100; i++) {
    itens.push({
      x: random(0, width),
      y: random(0, height),
      r: 5
    });
  }
}

function draw() {
  for (var i = 0; i < itens.length; i++) {
    var item = itens[i];
    ellipse(item.x, item.y, item.r, item.r);
  }
}
