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
  velocidade: 10
};

var direita = { //barra da direita
  x: canvas.width - 40,
  y: canvas.height / 2 - 60,
  altura: 120,
  largura: 30,
  diry: 0,
  score: 0,
  velocidade: 10
};

var bola = { //bola
  x: canvas.width / 2 - 15,
  y: canvas.height / 2 - 15,
  altura: 30,
  largura: 30,
  dirx: -1,
  diry: 1,
  mod: 0,
  velocidade: 1
};

document.addEventListener("keydown", function(e) { //captura a tecla pressionada
  teclas[e.keyCode] = true;
}, false);

document.addEventListener("keyup", function(e) { //captura a tecla liberada
  delete teclas[e.keyCode];
}, false);

/*
*   Função para mover os blocos dos jogadores
*   Será chamada dentro da função dispatcher que
*   criará o canvas
*/


function moverBloco() {
    if(87 in teclas && esquerda.y > 0)
        esquerda.y -= esquerda.velocidade;

    else if(83 in teclas && esquerda.y + esquerda.altura < canvas.height)
        esquerda.y += esquerda.velocidade;

    if(38 in teclas && direita.y > 0)
        direita.y -= direita.velocidade;

    else if(40 in teclas && direita.y + direita.altura < canvas.height)
        direita.y += direita.velocidade;
};


/*
*   Função que move a bola dentro do jogo
*/
function moveBola() {
    if(bola.y + bola.altura >= esquerda.y && bola.y <= esquerda.y + esquerda.altura && bola.x <= esquerda.x + esquerda.largura) {
        bola.dirx = 1;
        bola.mod += 0.2;
    }

    else if(bola.y + bola.altura >= direita.y && bola.y <= direita.y + direita.altura && bola.x + bola.largura >= direita.x) {
        bola.dirx = -1;
        bola.mod += 0.2;
    }

    if(bola.y <= 0)
        bola.diry = 1;

    else if(bola.y + bola.altura >= canvas.height)
        bola.diry = -1;

    bola.x += (bola.velocidade + bola.mod) * bola.dirx;
    bola.y += (bola.velocidade + bola.mod) * bola.diry;

    if(bola.x < esquerda.x + esquerda.largura - 15)
        novoJogo("player 2");

    else if(bola.x + bola.largura > direita.x + 15)
        novoJogo("player 1");
};

/*
*   Função que inicia novo jogo e modifica o placar
*/
function novoJogo(winner) {
    if(winner == "player 1")
        ++esquerda.score;
    else
        ++direita.score;

    esquerda.y = canvas.height / 2 - esquerda.altura / 2;
    direita.y = esquerda.y;
    bola.y = canvas.height / 2 - bola.altura / 2;
    bola.x = canvas.width / 2 - bola.largura / 2;
    bola.mod = 0;
};

/*
*   Função que insere os elementos no canvas
*   Dispatcher para
*/
function desenha() {

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  moverBloco();
  moveBola();

  ctx.fillStyle = "#A2DED0";
  ctx.fillRect(bola.x, bola.y, bola.largura, bola.altura);
  //console.log(ctx);
  ctx.fillRect(esquerda.x, esquerda.y, esquerda.largura, esquerda.altura);
  ctx.fillRect(direita.x, direita.y, direita.largura, direita.altura);

  ctx.font = "20px Courier New";

  ctx.fillText("Jogador 1: " + esquerda.score, 40, 25);
  ctx.fillText("Jogador 2: " + direita.score, canvas.width - 190, 25);

};

/*
*   Chama a função recursivamente a cada 5 milissegundos
*/
setInterval(desenha, 5);
