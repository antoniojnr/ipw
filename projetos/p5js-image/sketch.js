var img, bg, tempo, posx;

function preload() {
  img = loadImage('mario.png');
  bg = loadImage('bg-beach-ocean.png');
}

function setup() {
  createCanvas(500, 500);
  tempo = new Date();
  posx = 0;
}

function draw() {
  var agora = new Date();

  background(0);
  image(bg, 0, 0, 500, 500, 518, 5, 500, 470);
  image(img, posx, 0, img.width * 0.2, img.height * 0.2);
  if (agora - tempo >= 1000) {
    tempo = agora;

    posx += 5;
  }
}
