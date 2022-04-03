/*----- constants -----*/
// The colors that will be used as the choices
// Use an object like we did with tic tac toe, holding the players color 
const lookup = {
    '1': 'cyan',
    '-1': 'magenta',
    'null': 'gray'
  };
const player1Win = 4;
const player2Win = -4;

/*----- app's state (variables) -----*/
let gameBoard; // array of arrays? board that will show the connect4 game
// let turn; // Object to handle whos turn it is, alternate between player1 and player2
let winner; // string set to null while the game is in play 

/*----- cached element references -----*/
// circles on the gameBoard
// message on the screen about winning/losing
// message and coin to show who's turn it is
const rows = document.querySelectorAll('tr');
const slots = document.querySelectorAll('td');
const game = [...document.querySelectorAll('td')];

/*----- event listeners -----*/
document.querySelector('table').addEventListener('click', handleMove);


/*----- functions -----*/
init();
function init() {
    let turn = 1;
    gameBoard = [
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        
    ];
}

// checkBoard();
let turn = 1;
function handleMove(evt) {
    let location = []
    let cell = evt.target.cellIndex;
    //console.log(cell);
    let row = evt.target.parentElement.rowIndex; // rowIndex checks tr in relation to others
    //console.log(row);
    console.log(row * cell);
    if (cell === undefined && row === undefined) return; // so they can't click the background and change the color 
    for (let i = 5; i > -1; i--) {
        if (gameBoard[i][cell] === null) {
            console.log('Initial Array: ' + location.length);
            location.push(rows[i].children[cell]);
            console.log('Array after push: ' + location.length);
            // location[0].style.backgroundColor = lookup[turn]; change color of cell at bottom (moved to render)
            render(location);
            // evt.target.style.backgroundColor = lookup[turn]; //changes where they click 
            gameBoard[i][cell]= turn;
            turn *= -1;
            // render(i, cell);
            console.log(`Row: ${row} Cell: ${cell}`);
            return;
        }
    }
}


function render(arr) {
    arr[0].style.backgroundColor = lookup[turn];
    
}

    //gameBoard[row][cell]= turn;

// use the min to find the first spot to start checking for a win
// relative to the last played move
const min = num => Math.max(num - 3, 0);
const max = (num, max) => Math.min(num + 3, max);

// const { row: focalRow, col: focalCol } = lastChecker;
// const minCol = min(focalCol);
// const maxCol = max(focalCol, this.colCount-1);
// const minRow = min(focalRow);
// const maxRow = max(focalRow, this.rowCount-1);







/*----- event listeners -----*/
// listener for clicking the gameBoard 
// listener for clicking the replay button 

/*----- functions -----*/
// init();
// function init() {
//     gameBoard = [

//     ];
// }
 
