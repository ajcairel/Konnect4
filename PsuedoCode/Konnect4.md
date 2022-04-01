Konnect4 PsuedoCode 

/*----- constants -----*/
// The colors that will be used as the choices
// Use an object like we did with tic tac toe, holding the players color 

/*----- app's state (variables) -----*/
let gameBoard // board that will show the connect4 game
let turn // handle whos turn it is, alternate between player1 and player2
let winner // set to null while the game is in play 

/*----- cached element references -----*/
circles on the gameBoard
message on the screen about winning/losing
message and coin to show who's turn it is


/*----- event listeners -----*/
listener for clicking the gameBoard 
listener for clicking the replay button 

/*----- functions -----*/

function initialize() {
	// set the gameBoard to 7x6 grid of nulls (42 nulls in an array)
	winner = null; // set winner to null
	turn = player1; // player1 starts (randomize this?)
	// hide the play again button
	// render everything 
	

}

gameplay functions: 
	handleMove // needs to handle the click, make sure it is a valid move on the board
		// should populate the position on the board they selected 
	getWinner // ran after each guess is submitted
	replay // offer a replay button after a win or tie  
	

functions for rendering:
	gameBoard // board that will represent the Connect 4 board
	who's turn message // message that will say who's turn it is, represented by a spinning coin 
	winner/tie message // message that tells which player won or if there is a tie 




PsuedoCode
-Render an empty game board 
	-Board is a 7x6 grid, empty slots to start 
-Show a message saying that it is player1's turn 
-For the first move of the game, player1 needs to only be able to place his coin in a slot that is on the bottom row of the board
	-Can do this with a loop over the array?, with logic to factor in NOT allowing anything but the bottom row
	-Red vs Blue (change these, would like them to be images of a coin?)
-Handle the player move 
	-Each move must be checked to be valid. Invalid moves: already taken slot, 'floating' placement
		-Address this by 'forcing' move to the bottom of the column, unless
		it is already taken 
	-Will be a click event
-Check for a winner
	-Winner is when someone gets 4 in a row (horizontal, vertical, or diagonal)
	-If board is full and no winner, return tie
	-Return if no winner and no tie 
-When there is a winner, show winner message where the player turn message was, make their coin spinning 
-Offer a replay button

Logic Needed 
How do we determine an invalid move? 
	-No floating allowed