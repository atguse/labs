function gamerun() {
  init();
}

function step(){
  update();
  draw();
}

function update() {
  if (!movesnake()) {
    alert("Ai murit!");
    die();
  }
}

function draw() {
  screenclear();
  drawsnake();
  drawfood();
}