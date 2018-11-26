var img, bg;

function preload() {
  img = loadImage('mario.png');
  bg = loadImage('bg-beach-ocean.png');
}

function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(0);
  image(bg, 0, 0, 500, 500, 518, 5, 500, 470);
  image(img, 0, 0, img.width * 0.1, img.height * 0.1);
}
