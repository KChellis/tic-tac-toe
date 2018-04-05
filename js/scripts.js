var player1, player2;
var board;
var cell;
var activePlayer;
var passivePlayer;
var tieCount = 0;

function Board () { //creates a board object with array values of 0
  this.a = [" ", " ", " "];
  this.b = [" ", " ", " "];
  this.c = [" ", " ", " "];

} //end of board

function Player (name, mark, mark2) {  //creates a player object with a name and a mark type
  this.name = name;
  this.mark = mark;
  this.mark2 = mark2
  this.count = 0;
} //end of player
Board.prototype.markBoard = function(){  //Marks the board in the correct cell with the active player's mark
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
Board.prototype.checkWin = function() { //Checks the board to see if the win condition has been met
  for (var i = 0; i < 3; i++) {
    if (this.a[i] === this.b[i] && this.a[i] === this.c[i] && /[XO]/.test(this.a[i])) {
      return true;
    }
  }
  if (this.a[0] === this.a[1] && this.a[0] === this.a[2] && /[XO]/.test(this.a[0])) {
    return true;
  }else if (this.b[0] === this.b[1] && this.b[0] === this.b[2] && /[XO]/.test(this.b[0])) {
    return true;
  }else if (this.c[0] === this.c[1] && this.c[0] === this.c[2] && /[XO]/.test(this.c[0])) {
    return true;
  }else if (this.a[0] === this.b[1] && this.a[0] === this.c[2] && /[XO]/.test(this.a[0])) {
    return true;
  }else if (this.a[2] === this.b[1] && this.a[2] === this.c[0] && /[XO]/.test(this.a[2])) {
    return true;
  }else {
    return false;
  }
}  //end checkWin
Board.prototype.xoTest = function(num) {
  if (/[^XO]/.test(this.a[num]) || /[^XO]/.test(this.b[num]) || /[^XO]/.test(this.c[num])) {
    return false;
  } else{
    return true;
  }
}
Board.prototype.checkTie = function() { //checks to see if game is a tie
  var test;
  for (var i = 0; i < 3; i++) {
    test= board.xoTest(i);
    if (!test) {
      return test
    }
  }
  return test;
}
function nextPlayer() {   //changes the active player
  var temp = activePlayer;
  activePlayer= passivePlayer;
  passivePlayer = temp;
}
$(function() {
  $('#names').submit(function (event){ //takes in values for name from user and makes 2 player objects
    event.preventDefault();
    player1 = new Player($('#player1').val(), 'X', '<img src="img/X.png" alt="X">');
    player2 = new Player($('#player2').val(), 'O', '<img src="img/oh.png" alt="O">');
    board = new Board();
    activePlayer = player1;
    passivePlayer = player2;
    $("#board").show();
    $("#counter").show();
    $("#names").hide();
    $(".active").text(activePlayer.name);
    $("#p1").text(player1.name);
    $("#p2").text(player2.name);
  });

  $('.cells').click(function(event){ //marks board and checks for win
    this.setAttribute("disabled", "disabled");
    cell = $(this).val().split("");
    board.markBoard();
    $(this).append(activePlayer.mark2);
    if (board.checkWin()) {
      $("#win").show();
      $("#board").hide();
      activePlayer.count += 1;
      $("#count1").text(player1.count);
      $("#count2").text(player2.count);
    }else if(board.checkTie()){
      $("#tie").show();
      $("#board").hide();
      tieCount += 1;
      $("#countT").text(tieCount);
    }else {
      nextPlayer();
      $(".active").text(activePlayer.name);
    }
  });

  $(".newgame").click(function() {
    $(".cells").removeAttr("disabled");
    $(".cells").text("");
    board = new Board();
    nextPlayer();
    $(".active").text(activePlayer.name);
    $("#board").show();
    $("#tie").hide();
    $("#win").hide();
  });
});
