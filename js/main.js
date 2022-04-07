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

// let arraycheck = [];
// console.log(slots);
// let firstRow = slots.splice(0,6);
// let secondRow = slots.splice(0,6);
// let thirdRow = slots.splice(0,6);
// let fourthRow = slots.splice(0,6);
// let fifthRow = slots.splice(0,6);
// let sixthRow = slots.splice(0,6);
// console.log(firstRow);
// console.log(secondRow);
// console.log(thirdRow);
// console.log(fourthRow);
// console.log(fifthRow);
// console.log(slots);

// arraycheck.push(firstRow);
// arraycheck.push(secondRow);
// console.log(arraycheck);

// slots[1].style.backgroundImage = lookup['-1']; can change render 


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
        // [0, 0, 0, 0, 0, 0, 0],
        // [0, 0, 0, 0, 0, 0, 0],
        // [0, 0, 0, 0, 0, 0, 0],
        // [0, 0, 0, 0, 0, 0, 0],
        // [0, 0, 0, 0, 0, 0, 0],
        // [0, 0, 0, 0, 0, 0, 0]
    ];
    tieArray = [];
    resetBtn.style.visibility = 'hidden';
    winner = false;
    renderTurn();
}
// let turn = 1;
function handleMove(evt) {
    //renderTurn();
    let location = [];
    let col = evt.target.cellIndex; //index of the col within the row
    // console.log("COL:" + col);
    //console.log col);
    let row = evt.target.parentElement.rowIndex; // rowIndex checks tr in relation to others
    //console.log(row);
    //console.log(row * col);
    if (winner === true) return; // disallow moves if someone won
    // if  (col === undefined && row === undefined) return; // so they can't click the background and change the color 
    for (let i = gameBoard.length - 1; i > -1; i--) { // start at the bottom of the rows
        if (gameBoard[i][col] === null) {
            //console.log('Initial Array: ' + location.length);
            location.push(rows[i].children[col]);
            // rows[i].children col].style.backgroundImage = lookup[turn]; //change image (moved to render)
            // location[0].style.backgroundColor = lookup[turn]; change color of col at bottom (moved to render)
            // evt.target.style.backgroundColor = lookup[turn]; //changes where they click 
            gameBoard[i][col] = turn; // gameBoard[i] col] is the location of the last move played on the array of arrays
            renderTurn();
            renderMove(location); // render the move
            tieArray.push('pls'); //.includes
            const minCol = min(col);
            // console.log( col: ' + col);
            // console.log(`Row: ${row} Col: ${col}`); FIRST
            console.log(`Row: ${i} Col: ${col}`);
            //getWinner();
            //console.log(cells[
            // console.log(minCol);
            const maxCol = max(col, gameBoard[0].length - 1); // 7 - 1 = 6
            // console.log(maxCol);
            const minRow = min(i);
            console.log('CONSTMINROW: ' + minRow);
            const maxRow = max(i, gameBoard.length - 1);
            console.log('COMSTMAXROW: ' + maxRow);
            console.log('CONSTMINCOL: ' + minCol);
            console.log('CONSTMAXCOL: ' + maxCol);
           horizontalWinCheck(i, minCol, maxCol);
           verticalWinCheck(col, minRow, maxRow); // -1 does not work
            // leftDiagonalCheck(i,col, Math.max(i-col, 0), maxRow, Math.max(col-i, 0), col+(5-i));
            // rightDiagonalCheck();
            tieCheck();
            console.log('-----------------------');
            console.log('i: ' + i);
            console.log('col: ' + col);
            console.log('LeftDMinRow: max of i - col, 0 = ' + Math.max(i - col, 0));
            console.log('LeftDMaxRow = ' + maxRow);
            console.log('LeftDMinCol: max of i - col, 0 = ' + Math.max(col - i, 0));
            console.log('LeftDMaxCol: col + (5 - i) = ' + (col + (5 - i)));
            console.log('-----------------------');
            leftDiagonalCheck(Math.max(i - col, 0), maxRow, Math.max(col - i, 0), col + (5 - i));
            rightDiagonalCheck(Math.max(i - col, 0), maxRow, Math.max(col - i, 0), col + (5-i));
            // rightDiagonalCheck(Math.max(i - col, 0), maxRow, Math.max(col - i, 0), col + (5-i));
           // tieCheck();
            
            // render(i, col);
            return;
        }

    }
    message.innerHTML = (`Please select a valid move!`);
}

// function render(arr) {
//     if (lookup[turn] !== null) {}
//     arr[0].style.backgroundColor = lookup[turn];
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
function renderMove(arr) {
    arr[0].style.backgroundImage = lookup[turn];
    //console.log(arr[0]);
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

//gameBoard[row] col]= turn;

// use the min to find the first spot to start checking for a win
// relative to the last played move

// row, column, minimumColumn, maximumColumn
function horizontalWinCheck(r, minC, maxC) {
    //console.log('MinC: ' + minC + ' maxC: ' + maxC);
    for (let row = r, column = minC; column <= maxC; column++) {
        const check = [gameBoard[row][column], gameBoard[row][column + 1], gameBoard[row][column + 2], gameBoard[row][column + 3]];
        // console.log('first: ' + gameBoard[row][column]);
        // console.log('second ' + gameBoard[row][column+1]);
        // console.log('third ' + gameBoard[row][column+2]);
        // console.log('fourth' + gameBoard[row][column+3]);
        // console.log('---------');

        let four = 0;
        for (let i = 0; i < check.length; i++) {
            four += check[i];
        }
        //console.log('horizontal: ' + four);
        if (Math.abs(four) === 4) return renderWinner();
    }
}





function verticalWinCheck(targetCol, minR, maxR) {
    // debugger;
    for (let column = targetCol, row = minR; row <= maxR; row++) { // maxR
        if (row + 3 > maxR) return; // handle out of bounds
        let check = [gameBoard[row][column], gameBoard[row + 1][column],
        gameBoard[row + 2][column], gameBoard[row + 3][column]];
        let four = 0;
        for (let i = 0; i < check.length; i++) {
            four += check[i];
        }
        // console.log('vertical: ' + four);
        if (Math.abs(four) === 4) return renderWinner();
    }
}






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
    console.log('RDG minR = '  + minR);
    console.log('RDG maxR = ' + maxR);
    console.log('RDG minC = ' + minC);
    console.log('RDG maxC = ' + maxC);


    for (let row = minR, column = minC; row <= maxR || column <= maxC; row++, column++) {
        if (column + 3 > maxC || row  + 3 > maxR) return;
        const check = [gameBoard[row][column], gameBoard[row + 1][column + 1],
        gameBoard[row + 2][column + 2], gameBoard[row + 3][column + 3]];
        let four = 0;
        console.log('RDGCHECK: ' + check);
        for (let i = 0; i < check.length; i++) {
            four += check[i];
        }
        if (Math.abs(four) === 4) return announceWinner();
    }
}

function renderWinner() {
    message.innerHTML = `The winner is ${names[turn]}!`;
    resetBtn.style.visibility = 'visible';
    winner = true;


}


// function getWinner(){
//     for(let i=0; i < gameBoard.length -4; i++){
//         for(let j=0; j < gameBoard[i].length -4; j++){
//           if(gameBoard[i][j]=== turn && gameBoard[i][j+1] === turn && gameBoard[i][j+2] && gameBoard[i][j+3]){
//             renderWinner();
//           } else if(gameBoard[i][j]=== turn && gameBoard[i+1][j] === turn && gameBoard[i+2][j] === turn && gameBoard[i+3][j]){
//             renderWinner();
//           }else if(gameBoard[i][j]=== turn && gameBoard[i+1][j+1] === turn && gameBoard[i+2][j+2] === turn && gameBoard[i+3][j+3]){
//             renderWinner();
//           }else if(gameBoard[i][j]=== turn && gameBoard[i+1][j-1] === turn && gameBoard[i+2][j-2] === turn && gameBoard[i+3][j-3]){
//             renderWinner();
//         }
//       }
//     }
//   }



// function getWinner (row, col){
//     let rowIdx = row;
//     let colIdx = col;
//     let inARow = 0;

//     //horizontal
//     for (i = 0; rowIdx - i >= 0; i++) {
//         if (gameBoard[colIdx][rowIdx] == gameBoard[colIdx][rowIdx-i]) inARow++;
//         else break;
//     }
//     for (i = 1; rowIdx + i < gameBoard[colIdx].length; i++) {
//         if (gameBoard[colIdx][rowIdx] == gameBoard[colIdx][rowIdx+i]) inARow++;
//         else break;
//     }
//     if (inARow >= 4) {
//         winner = turn;
//     }

//     for (i = 0; colIdx - i >= 0; i++) {
//         if (gameBoard[colIdx][rowIdx] == gameBoard[colIdx-i][rowIdx]) inARow++;
//         else break;
//     }
//     for (i = 1; colIdx + i < gameBoard.length; i++) {
//         if (gameBoard[colIdx][rowIdx] == gameBoard[colIdx+i][rowIdx]) inARow++;
//         else break;
//     }
//     if (inARow >= 4) {
//         winner = turn;
//     }

//     // diago
//     for (i = 0; rowIdx - i >= 0 && colIdx - i >= 0; i++) {
//         if (gameBoard[colIdx][rowIdx] == gameBoard[colIdx-i][rowIdx-i]) inARow++;
//         else break;
//     }
//     for (i = 0; rowIdx + i < gameBoard[colIdx].length && colIdx + i > gameBoard.length; i++) {
//         if (gameBoard[colIdx][rowIdx] == gameBoard[colIdx+i][rowIdx+i]) inARow++;
//         else break;
//     }
//     if (inARow >= 4) {
//         winner = turn;
//     }
// }

