var player1, player2;
var board;
var cell;
var activePlayer;
var passivePlayer;
//
// const EMPTY = 0;
// const LINE_SIDE = 1;
// const LINE_TOP = 2;
//
// newboard = [
//   0, 1, 0, 1, 0,
//   2, 2, 2, 2, 2,
//   0, 1, 0, 1, 0,
//   2, 2, 2, 2, 2,
//   0, 1, 0, 1, 0
// ]

function Board () { //creates a board object with array values of 0
  this.a = ["", "", ""];
  this.b = ["", "", ""];
  this.c = ["", "", ""];

} //end of board

function Player (name, mark) {  //creates a player object with a name and a mark type
  this.name = name;
  this.mark = mark;
} //end of player
Board.prototype.markBoard = function(){
  var row = cell[0];
  var col = parseInt(cell[1]);
  var mark = activePlayer.mark;
  if (row === "a") {
    this.a[col]= mark;
  }else if (row === "b") {
    this.b[col]= mark;
  }else {
    this.c[col]= mark;
  }
}
Board.prototype.checkWin = function() {
  for (var i = 0; i < 3; i++) {
    if (this.a[i] === this.b[i] && this.a[i] === this.c[i] && /[XO]/.test(this.a[i])) {
      return true;
    }
  }
  if (this.a[0] === this.a[2] && this.a[0] === this.a[2] && /[XO]/.test(this.a[0])) {
    return true;
  }else if (this.b[0] === this.b[2] && this.b[0] === this.b[2] && /[XO]/.test(this.b[0])) {
    return true;
  }else if (this.c[0] === this.c[2] && this.c[0] === this.c[2] && /[XO]/.test(this.c[0])) {
    return true;
  }else if (this.a[0] === this.b[1] && this.a[0] === this.c[2] && /[XO]/.test(this.a[0])) {
    return true;
  }else if (this.a[2] === this.b[1] && this.a[2] === this.c[0] && /[XO]/.test(this.a[2])) {
    return true;
  }else {
    return false;
  }
}
function nextPlayer() {
  var temp = activePlayer;
  activePlayer= passivePlayer;
  passivePlayer = temp;
}
$(function() {
  $('#names').submit(function (event){
    event.preventDefault();
    player1 = new Player($('#player1').val(), 'X');
    player2 = new Player($('#player2').val(), 'O');
    board = new Board();
    activePlayer = player1;
    passivePlayer = player2;
  });

  $('.cells').click(function(event){
    this.setAttribute("disabled", "disabled");
    cell = $(this).val().split("");
    board.markBoard();
    $(this).text(activePlayer.mark);
    win = board.checkWin();
    console.log(board.a);
    console.log(board.b);
    console.log(board.c);
    console.log(win);
    nextPlayer();
  });
});
