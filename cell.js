// Cell object
function Cell(x, y, color){
  //console.log(x+', '+y + ', ' + color);
  this.x = x;
  this.y = y;
  this.hasCoin = false;
  this.coinColor = null;
  this.r = 80;
  this.color = color;
  this.possible = false;
  this.isEaten = false;
}

Cell.prototype.show = function() {
  if (this.color === 'black') {
      fill(0);
  }if (this.color === 'white') {
    fill(255);
  }if (this.possible) {
    fill('blue');
  }
   rect(this.x, this.y, this.r, this.r);
   if (this.hasCoin) {
      this.showCoin();
   }
}

Cell.prototype.clicked = function(x, y){
  return (x > this.x && x < this.x + this.r && y > this.y && y < this.y + this.r);
}

Cell.prototype.showCoin = function() {
  if (this.coinColor === 'red') {
      fill('red');
  }else{
      fill('green');
  }
  ellipseMode()
   ellipse(this.x + this.r / 2, this.y + this.r / 2, this.r / 2);
}

Cell.prototype.possibleMoves = function(){
  if (this.hasCoin && gameStart) {
  var currI = this.x / 80;
  var currJ = this.y / 80;
  for (var i = 0; i < grid.length; i++) {
      for (var j = 0; j < grid[i].length; j++) {
        grid[i][j].possible = false;
          if (!grid[i][j].hasCoin) {
              if ((currI - 1 === i && (currJ - 1 === j || currJ + 1 === j)) ||
                 (currI + 1 === i && (currJ - 1 === j || currJ + 1 === j))) {
                  grid[i][j].possible = true;
              }
              if (currI - 2 === i && currJ - 2 === j && typeof(grid[i+1][j+1]) !== 'undefined') {
                  if (grid[i+1][j+1].hasCoin && grid[i+1][j+1].coinColor !== this.coinColor) {
                      grid[i][j].possible = true;
                      grid[i+1][j+1].isEaten = true;
                  }
              }
              if (currI - 2 === i && currJ + 2 === j && typeof(grid[i+1][j-1]) !== 'undefined') {
                  if (grid[i+1][j-1].hasCoin && grid[i+1][j-1].coinColor !== this.coinColor) {
                      grid[i][j].possible = true;
                      grid[i+1][j-1].isEaten = true;
                  }
              }
              if (currI + 2 === i && currJ - 2 === j && typeof(grid[i-1][j+1]) !== 'undefined') {
                  if (grid[i-1][j+1].hasCoin && grid[i-1][j+1].coinColor !== this.coinColor) {
                      grid[i][j].possible = true;
                      grid[i-1][j+1].isEaten = true;
                  }
              }
              if (currI + 2 === i && currJ + 2 === j && typeof(grid[i-1][j-1]) !== 'undefined') {
                  if (grid[i-1][j-1].hasCoin && grid[i-1][j-1].coinColor !== this.coinColor) {
                      grid[i][j].possible = true;
                      grid[i-1][j-1].isEaten = true;
                  }
              }
          }
      }
  }
}
}

Cell.prototype.moveToIt = function(from){
  var fromI = from.x / 80;
  var fromJ = from.y / 80;
  grid[fromI][fromJ].hasCoin = false;
  this.hasCoin = true;
  this.coinColor = from.coinColor;
  var i = this.x / 80;
  var j = this.y / 80;
    console.log("heloo")
    if (i+1 === 8) {

    }
  if (!(i-1 === -1 || j+1 === 8)) {
      if (grid[i-1][j+1].isEaten) {
        try {
            eat(grid[i-1][j+1]);
        } catch (e) {
            console.log("error");
        }
        //grid[i-1][j+1].hasCoin = false;
      }
  }
  if (!(i-1 === -1 || j-1 === -1)) {
      if (grid[i-1][j-1].isEaten) {
        try {
          eat(grid[i-1][j-1]);
        } catch (e) {
            console.log("error")
        }
        //grid[i-1][j-1].hasCoin = false;
      }
  }
  if (!(i+1 === 8 || j+1 === 8)) {
      if (grid[i+1][j+1].isEaten) {
        try {
          eat(grid[i+1][j+1]);
        } catch (e) {
          console.log("error");
        }
        //grid[i+1][j+1].hasCoin = false;
      }
  }
  if (!(i+1 === 8 || j-1 === -1)) {
      if (grid[i+1][j-1].isEaten) {
        try {
          eat(grid[i+1][j-1]);
        } catch (e) {
          console.log("error");
        }
        //  grid[i+1][j-1].hasCoin = false;
      }
  }
//}//
  for (var i = 0; i < grid.length; i++) {
      for (var j = 0; j < grid[i].length; j++) {
          grid[i][j].possible = false;
          grid[i][j].isEaten = false;
      }
  }
  if (turn === aiCoin) {
      turn = userCoin;
  }else{
    turn = aiCoin;
  }
  checkWin();
}
