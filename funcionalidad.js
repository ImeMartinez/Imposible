var size = 4;

var name;
var timer;
var seconds = 0;
var moves = 0;

var boardState = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [13, 14, 15, 0],
];

boardState = shuffleArray(boardState.flat()).reduce((acc, cur, i) => {
  if (i % 4 === 0) acc.push([]);
  acc[acc.length - 1].push(cur);
  return acc;
}, []);

function initGame() {
  name = prompt("Escribe tu nombre:");

  var num = 0;
  for (var i = 0; i < size; i++) {
    for (var j = 0; j < size; j++) {
      var piece = document.getElementById(num);
      piece.innerText = boardState[i][j] || "";
      piece.dataset.row = i;
      piece.dataset.col = j;
      piece.addEventListener("click", movePiece); // Si se hace click, se manda a llamar a la funcion movePiece
      num++;
    }
  }

  document.getElementsByClassName("name")[0].innerHTML = name;

  document.getElementsByClassName("moves")[0].innerHTML = moves;
  timer = window.setInterval(function () {
    seconds++;
    document.getElementsByClassName("time")[0].innerHTML = seconds;
  }, 1000);
}

function changeColor(i, j) {
  if (boardState[i][j] != 0) {
    document.getElementsByClassName("piece").style.backgroundColor = "pink";
  }
}

// Función para mover una pieza cuando se hace clic en ella
function movePiece() {
  var row = parseInt(this.dataset.row);
  var col = parseInt(this.dataset.col);

  // Comprobar si la pieza adyacente a la posición vacía se puede mover a esta posición
  if (row > 0 && boardState[row - 1][col] === 0) {
    // Comprobamos si es posible moverla en -X o bien, hacia atras
    boardState[row - 1][col] = boardState[row][col];
    boardState[row][col] = 0;
    moves++;
    document.getElementsByClassName("moves")[0].innerHTML = moves;
  } else if (row < 3 && boardState[row + 1][col] === 0) {
    // Comprobamos si es posible moverla en +X o bien, hacia adelante
    boardState[row + 1][col] = boardState[row][col];
    boardState[row][col] = 0;
    moves++;
    document.getElementsByClassName("moves")[0].innerHTML = moves;
  } else if (col > 0 && boardState[row][col - 1] === 0) {
    // Comprobamos si es posible moverla en -Y o bien, hacia abajo
    boardState[row][col - 1] = boardState[row][col];
    boardState[row][col] = 0;
    moves++;
    document.getElementsByClassName("moves")[0].innerHTML = moves;
  } else if (col < 3 && boardState[row][col + 1] === 0) {
    // Comprobamos si es posible moverla en +Y o bien, hacia arriba
    boardState[row][col + 1] = boardState[row][col];
    boardState[row][col] = 0;
    moves++;
    document.getElementsByClassName("moves")[0].innerHTML = moves;
  } else {
    return;
  }

  // Actualizar la visualización del tablero en la página
  var pieces = document.querySelectorAll(".piece");
  for (var i = 0; i < pieces.length; i++) {
    var piece = pieces[i];
    var row = parseInt(piece.dataset.row);
    var col = parseInt(piece.dataset.col);
    piece.innerText = boardState[row][col] || "";
  }

  // Comprobar si el jugador ha ganado el juego
  if (checkWin()) {
    alert("Ganaste en " + seconds + " segundos y " + moves + " movimientos");
    window.location.reload();
  }
}

function checkWin() {
  var num = 1;
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      if (boardState[i][j] !== num && (i !== 3 || j !== 3)) {
        return false;
      }
      num++;
    }
  }
  return true;
}

//Revolvemos el arreglo
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}
