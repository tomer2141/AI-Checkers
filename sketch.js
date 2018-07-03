var focusedCell;
var turnText = 'Select your coin';
var userCoin;
var aiCoin;
var turn;
var userCoinsLeft = 12;
var aiCoinsLeft = 2;
var gameStart = false;
var winner = false;
// Creating the game array
function gridLayout(cols, rows){
  var gridArr = new Array(cols);
  for (var i = 0; i < gridArr.length; i++) {
    gridArr[i] = new Array(rows);
  }
  return gridArr;
}


var grid;
var divTurn;

function coinClicked(coin){
  //Set the coin color to the user and the ai.
  userCoin = coin;
  if (coin === 'red') {
      aiCoin = 'green';
  }else{
    aiCoin = 'red';
  }
  //Generate a random number to decied who will start.
  var turnGen = floor((Math.random() * 10) + 1);
  //If turnGen is less or equal to 5 red will start else green start.
  if (turnGen <= 5) {
      turn = 'red'
  }else{
    turn = 'green'
  }
  gameStart = true;
  //divTurn.html(["<p> Its <b class="+turn+">"+turn+"</b> turn</p><p>AI: <b class="+aiCoin+">"+aiCoin+"</b> - coins left: "+aiCoinsLeft+"</p><p>You: <b class="+userCoin+">"+userCoin+"</b> - coins left: "+userCoinsLeft+"</p>"])
}

function setup(restartSetup) {
createCanvas(644, 644);
if (restartSetup) {
  divTurn.html(['<p>'+turnText+'</p> <button class="selectCoin redCoin" onclick=coinClicked("red")></button><button onclick=coinClicked("green") class="selectCoin greenCoin"></button>']);
}else{
  divTurn = createDiv(['<p>'+turnText+'</p> <button class="selectCoin redCoin" onclick=coinClicked("red")></button><button onclick=coinClicked("green") class="selectCoin greenCoin"></button>']).id('turn-style');
}
grid = gridLayout(8, 8);
for (var i = 0; i < 8; i++) {
    for (var j = 0; j < 8; j++) {
      if (i % 2 === 1 && j % 2 === 1 || i % 2 === 0 && j % 2 === 0) {
          var color = 'black';
      }else{
        var color = 'white';
      }
      grid[i][j] = new Cell(i * 80, j * 80, color);
      if (!(j === 3 || j === 4)) {
        if (j < 3) {
          if ((i + 1) % 2 === 1 && (j + 1) % 2 === 1 || (i + 1) % 2 === 0 && (j + 1) % 2 === 0) {
            grid[i][j].hasCoin = true;
            grid[i][j].coinColor = 'red';
          }
        }
        if (j > 3) {
          if ((i + 1) % 2 === 1 && (j + 1) % 2 === 1 || (i + 1) % 2 === 0 && (j + 1) % 2 === 0) {
            grid[i][j].hasCoin = true;
            grid[i][j].coinColor = 'green';
          }
        }
      }
    }
}
}

//Detect press.
function mousePressed() {
  //if (turn === userCoin) {
  for (var i = 0; i < 8; i++) {
      for (var j = 0; j < 8; j++) {
        //Check if the press is to show possible moves or to move a coin.
        if(grid[i][j].clicked(mouseX, mouseY)){
          if (grid[i][j].hasCoin && grid[i][j].coinColor === turn) {
              focusedCell = grid[i][j];
              grid[i][j].possibleMoves();
          }else{
            if (grid[i][j].possible) {
                grid[i][j].moveToIt(focusedCell);
            }
          }
        }
      }
  }
//}
}

function eat (eaten){
  eaten.hasCoin = false;
  if (eaten.coinColor === aiCoin) {
      aiCoinsLeft--;
  }else{
    userCoinsLeft--;
  }
  eaten.coinColor = null;
}

function draw() {
 	background(0);
  for (var i = 0; i < 8; i++) {
      for (var j = 0; j < 8; j++) {
        grid[i][j].show();
      }
  }
  if (gameStart) {
  divTurn.html(["<p> Its <b class="+turn+">"+turn+"</b> turn</p><p>AI: <b class="+aiCoin+">"+aiCoin+"</b> - coins left: "+aiCoinsLeft+"</p><p>You: <b class="+userCoin+">"+userCoin+"</b> - coins left: "+userCoinsLeft+"</p>"])
}
}

function containsObject(obj) {
    for (var i = 0; i < grid.length; i++) {
        for (var j = 0; j < grid[i].length; j++) {
            if (grid[i][j] === obj) {
                return true
            }
        }
    }

    return false;
}

function restart(){
   focusedCell;
   turnText = 'Select your coin';
   userCoin;
   aiCoin;
   turn;
   userCoinsLeft = 12;
   aiCoinsLeft = 2;
   gameStart = false;
   winner = false;
   setup(true);
   //divTurn.html(['<p>'+turnText+'</p> <button class="selectCoin redCoin" onclick=coinClicked("red")></button><button onclick=coinClicked("green") class="selectCoin greenCoin"></button>']);
}

function checkWin(){
  if (userCoinsLeft < 1 || aiCoinsLeft < 1) {
    if (userCoinsLeft < 1) {
        var winnerName = 'AI';
    }
    if (aiCoinsLeft < 1) {
        var winnerName = 'User'
    }
    divTurn.html(["<p>"+winnerName+" Won!</p><button onclick=restart()>Restart</button>"]);
    gameStart = false;
  }
}
