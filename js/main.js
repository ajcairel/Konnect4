/*----- constants -----*/
// The colors that will be used as the choices
// Use an object like we did with tic tac toe, holding the players color 
const lookup = {
    // '1': 'cyan',
    '1': "url('https://static.wikia.nocookie.net/naruto/images/8/89/Uzumaki_Symbol.svg/revision/latest/scale-to-width-down/200?cb=20180407232103')",
    // '-1': 'magenta',
    '-1': "url('https://static.wikia.nocookie.net/eroninja/images/2/23/UchihaWappen.png/revision/latest?cb=20180322234129')",
    'null': "url('https://media0.giphy.com/media/K9AnZe1fuZb68/200.gif')"
  };

const names = {
    '1': 'Naruto',
    '-1': 'Sasuke'
};

/*----- app's state (variables) -----*/
let gameBoard; // array of arrays? board that will show the connect4 game
let turn; // Object to handle whos turn it is, alternate between player1 and player2
let winner; // string set to null while the game is in play 
let tieArray; // Array to cheese the way to handle a tie 

/*----- cached element references -----*/
// circles on the gameBoard
// message on the screen about winning/losing
// message and coin to show who's turn it is
const rows = document.querySelectorAll('tr');
const slots = document.querySelectorAll('td');
const resetBtn = document.getElementById('reset');
const message = document.querySelector('h3');
const backgroundImg = document.querySelector('div');
const min = num => Math.max(num - 3, 0);
const max = (num, max) => Math.min(num + 3, max);


/*----- event listeners -----*/
document.querySelector('table').addEventListener('click', handleMove);
document.querySelector('button').addEventListener('click', resetGame);


/*----- functions -----*/
init();
function init() {
    turn = 1;
    gameBoard = [
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
    ];
    tieArray = [];
    resetBtn.style.visibility = 'hidden';
    winner = null;
    handleTurn();
}
// let turn = 1;
function handleMove(evt) {
    let location = [];
    let cell = evt.target.cellIndex; //index of the cell within the row
    //console.log(cell);
    let row = evt.target.parentElement.rowIndex; // rowIndex checks tr in relation to others
    //console.log(row);
    //console.log(row * cell);
    if (winner !== null) return; // disallow moves if someone won
    if (cell === undefined && row === undefined) return; // so they can't click the background and change the color 
    for (let i = gameBoard.length - 1; i > -1; i--) { // start at the bottom of the rows
        if (gameBoard[i][cell] === null) {
            //console.log('Initial Array: ' + location.length);
            location.push(rows[i].children[cell]);
            // rows[i].children[cell].style.backgroundImage = lookup[turn]; //change image (moved to render)
            // location[0].style.backgroundColor = lookup[turn]; change color of cell at bottom (moved to render)
            // evt.target.style.backgroundColor = lookup[turn]; //changes where they click 
            gameBoard[i][cell]= turn; // gameBoard[i][cell] is the location of the last move played on the array of arrays
            handleTurn();
            renderMove(location); // render the move
            tieArray.push('pls');
            const minCol = min(cell);
            const maxCol = max(i, gameBoard[0].length - 1); // 7 - 1 = 6
            const minRow = min(cell);
            const maxRow = max(cell, gameBoard.length - 1);
            horizontalWinCheck(i, cell, minCol, maxCol);
            tieCheck();
            // render(i, cell);
            console.log(`Row: ${row} Col: ${cell}`);
            return;
        }
    }
}

// function render(arr) {
//     if (lookup[turn] !== null) {}
//     arr[0].style.backgroundColor = lookup[turn];
// }

function handleTurn() {
    if (turn === 1) {
        message.innerHTML = `Naruto's turn!`;
        turn *= -1;
    } else {
        message.innerHTML = `Sasuke's turn!`;
        turn *= -1;
    }
}
function renderMove(arr) {
    arr[0].style.backgroundImage = lookup[turn];
}


function resetGame() {
    for (let i = gameBoard.length - 1; i > -1; i--) {
        for (let j = 0; j < 7; j++) {
            rows[i].children[j].style.backgroundImage = lookup.null;
        }
    }
   init();

}

function tieCheck() {
    // if (!gameBoard.includes(null)) {
    //     resetBtn.style.visibility = 'visible';
    // }
    if (tieArray.length === 42) {
        resetBtn.style.visibility = 'visible';
        message.innerHTML = `There has been a stalemate!`;
        // backgroundImg.style.backgroundImage = "url('https://i.pinimg.com/originals/88/d1/85/88d1854273d2638b7b4aeca97b27a861.jpg')";

    }
}

    //gameBoard[row][cell]= turn;

// use the min to find the first spot to start checking for a win
// relative to the last played move

// row, column, minimumColumn, maximumColumn
function horizontalWinCheck(r, c, minC, maxC) { 
    console.log('MinC: ' + minC + ' maxC: ' + maxC);
    for (let x = r, c = minC; c <= maxC; c++) {
        console.log('x: ' + r + ' c: ' +c  + ' minC: ' + minC + ' minR: ' + maxC);
        if (Math.abs(gameBoard[x][c] + gameBoard[x][c+1] + 
            gameBoard[x][c+2] + gameBoard[x][c+3] === 4)) {
            announceWinner();
        }
    }
}

function announceWinner() {
    message.innerHTML = `The winner is ${names[turn]}!`;
    resetBtn.style.visibility = 'visible';

}
    


   




// const { row: focalRow, col: focalCol } = lastChecker;
// const minCol = min(focalCol);
// const maxCol = max(focalCol, this.colCount-1);
// const minRow = min(focalRow);
// const maxRow = max(focalRow, this.rowCount-1);
// function checkHorizontal() {
//     for (let r = 0; i < rows.length; r++) {
//         for(let c = 0; )
//     }
// }






/*----- event listeners -----*/
// listener for clicking the gameBoard 
// listener for clicking the replay button 

/*----- functions -----*/
// init();
// function init() {
//     gameBoard = [

//     ];
// }
 
