var canvas = document.getElementById("mycanvas"); //adquire o elemento canvas do html
var ctx = canvas.getContext("2d"); //define o contexto bidimensional do canvas

var teclas = {}; //teclas do teclado

var esquerda = { //barra da esquerda
  x: 10,
  y: canvas.height / 2 - 60,
  altura: 120,
  largura: 30,
  diry: 0,
  score: 0,
  speed: 10
};

var direita = { //barra da direita
  x: canvas.width - 40,
  y: canvas.height / 2 - 60,
  altura: 120,
  largura: 30,
  diry: 0,
  score: 0,
  speed: 10
};

var bola = { //bola
  x: canvas.width / 2 - 15,
  y: canvas.height / 2 - 15,
  altura: 30,
  largura: 30,
  dirx: -1,
  diry: 1,
  mod: 0,
  speed: 1
};

document.addEventListener("keydown", function(e) {
  teclas[e.keyCode] = true;
  //alert(e.keyCode);
}, false);

document.addEventListener("keyup", function(e) {
  delete teclas[e.keyCode];
}, false);
