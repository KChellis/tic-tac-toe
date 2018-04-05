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

    nextPlayer();
  });
});
