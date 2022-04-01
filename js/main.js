/*----- constants -----*/
// The colors that will be used as the choices
// Use an object like we did with tic tac toe, holding the players color 

/*----- app's state (variables) -----*/
let gameBoard; // array of arrays? board that will show the connect4 game
let turn; // Object to handle whos turn it is, alternate between player1 and player2
let winner; // string set to null while the game is in play 

/*----- cached element references -----*/
// circles on the gameBoard
// message on the screen about winning/losing
// message and coin to show who's turn it is
const rows = document.querySelectorAll('tr');
const slots = document.querySelectorAll('td');
document.querySelector('table').addEventListener('click', checkIndex);



// function checkBoard() {
//     for (i = 0; i < slots.length; i++){
//         slots[i].addEventListener('click', (evt) =>{
//             console.log(`${evt.target.parentElement.rowIndex},${evt.target.cellIndex}`)
//         });
//     }

// }

// checkBoard();

function checkIndex(evt) {
    let cell = evt.target.cellIndex;
    //console.log(cell);
    let row = evt.target.parentElement.rowIndex; // rowIndex checks tr in relation to others
    //console.log(row);

    console.log(`Cell: ${cell} Row: ${row}`);
}







/*----- event listeners -----*/
// listener for clicking the gameBoard 
// listener for clicking the replay button 

/*----- functions -----*/
// init();
// function init() {
//     gameBoard = [

//     ];
// }
 
