/*----- constants -----*/
// The colors that will be used as the choices
// Use an object like we did with tic tac toe, holding the players color 
const lookup = {
    '1': "url('https://static.wikia.nocookie.net/naruto/images/8/89/Uzumaki_Symbol.svg/revision/latest/scale-to-width-down/200?cb=20180407232103')",
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
        [null, null, null, null, null, null, null]
    ];

   
    tieArray = [];
    resetBtn.style.visibility = 'hidden';
    winner = false;
    renderTurn();
}

function handleMove(evt) {
    if (winner === true) return; // disallow moves if someone won
    renderTurn();
    // let location = [];
    let col = evt.target.cellIndex; //index of the col within the row
    let row = evt.target.parentElement.rowIndex; // rowIndex checks tr in relation to others
    for (let i = gameBoard.length - 1; i > -1; i--) { // start at the bottom of the rows
        if (gameBoard[i][col] === null) {
            // location.push(rows[i].children[col]);
            gameBoard[i][col]= turn; // gameBoard[i] col] is the location of the last move played on the array of arrays
            render();
            // tieArray.push('pls'); //.includes
            const minCol = min(col);
            console.log(`Row: ${i} Col: ${col}`);
            const maxCol = max(col, gameBoard[0].length - 1); // 7 - 1 = 6
            const minRow = min(i);
            const maxRow = max(i, gameBoard.length - 1);
            // checkHorzWin(gameBoard[i],gameBoard[i][col]);
            // checkVertWin(gameBoard[i],gameBoard[i][col]);
            checkHorzWin(i, col);
            checkVertWin(i, col);
            checkForwardSlash(i, col);
            checkBackSlash(i, col);
            




            // horizontalWinCheck(i, minCol, maxCol);
            // verticalWinCheck(col, minRow, maxRow); // -1 does not work
            
            // leftDiagonalCheck(Math.max(i - col, 0), maxRow, Math.max(col - i, 0), col + (5 - i));
            // //                         minRow        maxRow            minCol           maxCol
            // rightDiagonalCheck(Math.max(i - col, 0), maxRow, Math.max(col - 3, 0), col + (5-i));
            tieArray.push('XO');
            tieCheck();
            return;
        }

    }
    message.innerHTML = (`Please select a valid move!`);
}


function render() {
    for (let i = gameBoard.length - 1; i > -1; i--)
        for (let j = gameBoard.length; j > -1; j--) {
        const SLOT = rows[i].children[j];
        SLOT.style.backgroundImage = lookup[gameBoard[i][j]];
    }
}
// function render() {
//     for (let i = gameBoard.length - 1; i > -1; i--)
//         for (let j = gameBoard.length; j > -1; j--) {
//         const SLOT = rows[i].parentElement[j];
//         SLOT.style.backgroundImage = lookup[gameBoard[i][j]];
//     }
// }



function renderTurn() {
    if (turn === 1) {
        message.innerHTML = `Naruto's turn! --------------->`;
        turn *= -1;
    } else {
        message.innerHTML = `<--------------- Sasuke's turn!`;
        turn *= -1;
    }
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
   
    if (tieArray.length === 42) {
        resetBtn.style.visibility = 'visible';
        message.innerHTML = `There has been a stalemate!`;
        // backgroundImg.style.backgroundImage = "url('https://i.pinimg.com/originals/88/d1/85/88d1854273d2638b7b4aeca97b27a861.jpg')";

    }
}


// function checkHorzWin(colIdx, rowIdx) {
//     const player = gameBoard[colIdx][rowIdx];
//     let count = 1; 
//     //count up
//     let idx = rowIdx + 1; // initialize to one above 
//     while (idx < gameBoard[idx].length && gameBoard[colIdx][idx] === player) {
//       count++;
//       idx++;
//     }
//     idx = rowIdx - 1; // initialize to one above 
//     while (idx >= 0 && gameBoard[colIdx][idx] === player) {
//       count++;
//       idx--;
//     }
//     return count === 4 ? renderWinner() : null; 
//   }
function checkHorzWin(colIdx, rowIdx) {
    const player = gameBoard[colIdx][rowIdx];
    let count = 1; 
    //count up
    let idx = rowIdx + 1; // initialize to one above 
    while (idx < gameBoard.length && gameBoard[colIdx][idx] === player) {
      count++;
      idx++;
    }
    idx = rowIdx - 1; // initialize to one above 
    while (idx >= 0 && gameBoard[colIdx][idx] === player) {
      count++;
      idx--;
    }
    return count === 4 ? renderWinner() : null; 
  }
  
  
  
  function checkVertWin(colIdx, rowIdx) {
    const player = gameBoard[colIdx][rowIdx];
    let count = 1; 
    //count right
    let idx = colIdx + 1; // initialize to one above 
    while (idx < gameBoard.length && gameBoard[idx][rowIdx] === player) {
      count++;
      idx++;
    }
    idx = colIdx - 1; // initialize to one above 
    while (idx >= 0 && gameBoard[idx][rowIdx] === player) {
      count++;
      idx--;
    }
    return count >= 4 ? renderWinner() : null;
  }

  function checkForwardSlash(colIdx, rowIdx) {
    const player = gameBoard[colIdx][rowIdx];
    let count = 1; 
    //count right
    let idx1 = colIdx - 1;// initialize to one above 
    let idx2 = rowIdx + 1;
    while (idx1 >= 0  && idx2 < gameBoard.length && gameBoard[idx1][idx2] === player) {
      count++;
      idx1--;
      idx2++;
    }
    idx1 = colIdx + 1; // initialize to one above 
    idx2 = rowIdx - 1
    while (idx1 < gameBoard.length && idx2 >= 0 && gameBoard[idx1][idx2] === player) {
      count++;
      idx1++;
      idx2--;
    }
    return count === 4 ? renderWinner() : null; 
  }

  function checkBackSlash(colIdx, rowIdx) {
    const player = gameBoard[colIdx][rowIdx];
    let count = 1; 
    //count right
    let idx1 = colIdx - 1;// initialize to one above 
    let idx2 = rowIdx - 1;
    while (idx1 >= 0  && idx2 <= 0 && gameBoard[idx1][idx2] === player) {
      count++;
      idx1--;
      idx2--;
    }
    idx1 = colIdx + 1; // initialize to one above 
    idx2 = rowIdx + 1
    while (idx1 < gameBoard.length && idx2 < gameBoard[0].length && gameBoard[idx1][idx2] === player) {
      count++;
      idx1++;
      idx2++;
    }
    return count === 4 ? renderWinner() : null; 
  }



// row, column, minimumColumn, maximumColumn
// function horizontalWinCheck(r, minC, maxC) {
//     //console.log('MinC: ' + minC + ' maxC: ' + maxC);
//     for (let row = r, column = minC; column <= maxC; column++) {
//         const check = [gameBoard[row][column], gameBoard[row][column + 1], gameBoard[row][column + 2], gameBoard[row][column + 3]];
//         // console.log('first: ' + gameBoard[row][column]);
//         // console.log('second ' + gameBoard[row][column+1]);
//         // console.log('third ' + gameBoard[row][column+2]);
//         // console.log('fourth' + gameBoard[row][column+3]);
//         // console.log('---------');

//         let four = 0;
//         for (let i = 0; i < check.length; i++) {
//             four += check[i];
//         }
//         //console.log('horizontal: ' + four);
//         if (Math.abs(four) === 4) return renderWinner();
//     }
// }





// function verticalWinCheck(targetCol, minR, maxR) {
//     // debugger;
//     for (let column = targetCol, row = minR; row <= maxR; row++) { // maxR
//         if (row + 3 > maxR) return; // handle out of bounds
//         let check = [gameBoard[row][column], gameBoard[row + 1][column],
//         gameBoard[row + 2][column], gameBoard[row + 3][column]];
//         let four = 0;
//         for (let i = 0; i < check.length; i++) {
//             four += check[i];
//         }
//         // console.log('vertical: ' + four);
//         if (Math.abs(four) === 4) return renderWinner();
//     }
// }






// function leftDiagonalCheck(focalRow, focalCol, minR, maxR, minC, maxC) {
function leftDiagonalCheck(minR, maxR, minC, maxC) {
    for (let row = minR, column = minC; row <= maxR || column <= maxC; row++, column++) {
        if (column + 3 > maxC) return; // handle out of bounds
        const check = [gameBoard[row][column], gameBoard[row + 1][column + 1],
        gameBoard[row + 2][column + 2], gameBoard[row + 3][column + 3]];
        console.log(gameBoard[row][column]);
        console.log(gameBoard[row+1][column+1]);
        console.log(gameBoard[row+2][column+2]);
        console.log(gameBoard[row+3][column+3]);
        let four = 0;
        for (let i = 0; i < check.length; i++) {
            four += check[i];
        }
        if (Math.abs(four) === 4) return renderWinner();
    }
}
function rightDiagonalCheck(minR, maxR, minC, maxC) {
    for (let row = minR, column = minC; row <= maxR || column <= maxC; row++, column++) {
        if (row - 3 > minC) return; // handle out of bounds
        const check = [gameBoard[row][column], gameBoard[row - 1][column + 1],
        gameBoard[row - 2][column + 2], gameBoard[row - 3][column + 3]];
        console.log(gameBoard[row][column]);
        console.log(gameBoard[row+1][column+1]);
        console.log(gameBoard[row+2][column+2]);
        console.log(gameBoard[row+3][column+3]);
        let four = 0;
        for (let i = 0; i < check.length; i++) {
            four += check[i];
        }
        if (Math.abs(four) === 4) return renderWinner();
    }
}



function renderWinner() {
    message.innerHTML = `The winner is ${names[turn]}!`;
    resetBtn.style.visibility = 'visible';
    winner = true;
}

function checkWin() {
    for(let i=0; i < board.length - 4; i++) {
      for(let j=0; j < board[i].length - 4; j++) {
        if(board[i][j] === turn && board[i][j+1] === turn && board[i][j+2] && board[i][j+3]) {
          winner = true;
        } else if(board[i][j] === turn && board[i+1][j] === turn && board[i+2][j] === turn && board[i+3][j]) {
          winner = true;
        } else if(board[i][j] === turn && board[i+1][j+1] === turn && board[i+2][j+2] === turn && board[i+3][j+3]) {
          winner = true;
        } else if(board[i][j] === turn && board[i+1][j-1] === turn && board[i+2][j-2] === turn && board[i+3][j-3]) {
          winner = true;
        }
      }
    }
  };



