var tam = 4;
var tablero;

var nombre;
var timer;
var segundos = 0;

function inicio() {
  ///nombre = prompt("Escribe tu nombre:");

  tablero = new Array(tam);
  for (var i = 0; i < tam; i++) tablero[i] = new Array(tam);

  agregarNumeros();
  imprimeTablero();
  /*document.getElementsByClassName("nombre")[0].innerHTML = nombre;
  timer = window.setInterval(function () {
    segundos++;
    document.getElementsByClassName("tiempo")[0].innerHTML = segundos;
  }, 1000);*/
}

function getRandomNumber(min, max) {
  let step1 = max - min + 1;
  let step2 = Math.random() * step1;
  let result = Math.floor(step2) * min;
  return result;
}

function agregarNumeros() {
  var j = 0;

  for (var i = 0; i < tam; i++) {
    for (var j = 0; j < tam; j++) {
      tablero[i][j] = getRandomNumber(0, 15);
    }
  }
}

function imprimeTablero() {
  for (var i = 0; i < tam; i++)
    for (var j = 0; j < tam; j++) console.log(tablero[i]);
}
