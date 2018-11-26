function fase0() {
  background(255, 255, 0);
  textAlign(CENTER);
  textSize(20);
  text("Aperte Enter para iniciar", 250, 250);
}

function fase1() {
  background(255, 0, 0);
  textAlign(CENTER);
  textSize(20);
  text("Fase 1", 250, 250);
}

function fase2() {
  background(0, 255, 0);
  textAlign(CENTER);
  textSize(20);
  text("Fase 2", 250, 250);
}

function fase3() {
  background(0, 0, 255);
  textAlign(CENTER);
  textSize(20);
  text("Fase 3", 250, 250);
}

function faseGO() {
  background(255, 0, 255);
  textAlign(CENTER);
  textSize(20);
  text("Game over", 250, 250);
}

var fase = 0;

function setup() {
  createCanvas(500, 500);
}

function draw() {
  switch(fase) {
    case 0:
      fase0();
      break;
    case 1:
      fase1();
      break;
    case 2:
      fase2();
      break;
    case 3:
      fase3();
      break;
    case 4:
      faseGO();
      break;
  }
}

function keyPressed() {
  if (keyCode === 13) {
    fase = 1;
  }

  if (fase >= 1 && fase <= 4) {
    if (keyCode === 32) {
      fase++;
    }
  }
}
