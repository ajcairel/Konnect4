/*----- constants -----*/
// The colors that will be used as the choices
// Use an object like we did with tic tac toe, holding the players color 
const lookup = {
  '1': "url('https://i.imgur.com/0digGXP.png')",
  '-1': "url('https://i.imgur.com/Ko4W3mX.jpg')",
  'null': "url('https://media0.giphy.com/media/K9AnZe1fuZb68/200.gif')"
};

const names = {
  '1': 'Naruto',
  '-1': 'Sasuke'
};

/*----- app's state (variables) -----*/
let gameBoard; 
let turn; 
let winner; 
let tieArray; 

/*----- cached element references -----*/

const rows = document.querySelectorAll('tr');
const slots = document.querySelectorAll('td');
const resetBtn = document.getElementById('reset');
const sasuke = document.getElementById('sasuke');
const naruto = document.getElementById('naruto');
const title = document.getElementById('title');
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
  render();
  renderOpacity();
  renderTurn();
}

function handleMove(evt) {
  if (winner === true) return; 
  renderOpacity();
  let col = evt.target.cellIndex; 
  for (let i = gameBoard.length - 1; i > -1; i--) { // start at the bottom of the rows
      if (gameBoard[i][col] === null) {
        renderTurn();
        // location.push(rows[i].children[col]);
        gameBoard[i][col]= turn; // gameBoard[i] col] is the location of the last move played on the array of arrays
        render();
        // tieArray.push('pls'); //.includes
        checkHorzWin(i, col);
        checkVertWin(i, col);
        checkForwardSlash(i, col);
        checkBackSlash(i, col);
        tieArray.push('XO');
        tieCheck();
        return;
      }

  }
  renderValidMove();
  // message.innerHTML = (`Please select a valid move!`);
}


function render() {
  for (let i = gameBoard.length - 1; i > -1; i--)
    for (let j = gameBoard.length; j > -1; j--) {
    const SLOT = rows[i].children[j];
    SLOT.style.backgroundImage = lookup[gameBoard[i][j]];
  } 
}

function renderValidMove() {
  message.innerHTML = (`Please select a valid move!`);
}

function renderOpacity() {
  for (let i = gameBoard.length - 1; i > -1; i--)
    for (let j = gameBoard.length; j > -1; j--) {
    const SLOT = rows[i].children[j];
    if (gameBoard[i][j] === turn) {
      SLOT.style.opacity = '1';
    } else {
      SLOT.style.opacity = '0.5';
    }
  }
}

function renderTurn() {
  if (winner === true && turn == 1) {
    naruto.style.visibility = 'visible';
    sasuke.style.visibility = 'hidden';
    message.style.color = 'yellow';
    
    return;
  }
  if (winner === true && turn == -1) {
    naruto.style.visibility = 'hidden';
    sasuke.style.visibility = 'visible';
    message.style.color = 'purple';
    
    return;
  }

  if (turn === 1) {
      message.innerHTML = `Naruto's turn! --------------->`;
      naruto.style.visibility = 'visible';
      sasuke.style.visibility = 'hidden';
      title.style.color = 'purple';
      message.style.color = 'yellow';
      turn *= -1;
    } else {
      message.innerHTML = `<--------------- Sasuke's turn!`;
      naruto.style.visibility = 'hidden';
      sasuke.style.visibility = 'visible';
      title.style.color = 'yellow';
      message.style.color = 'purple';
      turn *= -1;
  }
}

function resetGame() {
  for (let i = gameBoard.length - 1; i > -1; i--) {
      for (let j = 0; j < 7; j++) {
          rows[i].children[j].style.backgroundImage = lookup.null;
      }
  }
  for (let i = gameBoard.length - 1; i > -1; i--)
    for (let j = gameBoard.length; j > -1; j--) {
      const SLOT = rows[i].children[j];
      SLOT.style.opacity = '0.5';
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

function checkHorzWin(colIdx, rowIdx) {
  const player = gameBoard[colIdx][rowIdx];
  let count = 1; 
  let idx = rowIdx + 1; 
  while (idx < gameBoard[0].length && gameBoard[colIdx][idx] === player) {
    count++;
    idx++;
  }
  idx = rowIdx - 1;  
  while (idx >= 0 && gameBoard[colIdx][idx] === player) {
    count++;
    idx--;
  }
  return count === 4 ? renderWinner() : null; 
}


function checkVertWin(colIdx, rowIdx) {
  const player = gameBoard[colIdx][rowIdx];
  let count = 1; 
  let idx = colIdx + 1; 
  while (idx < gameBoard.length && gameBoard[idx][rowIdx] === player) {
    count++;
    idx++;
  }
  idx = colIdx - 1;  
  while (idx >= 0 && gameBoard[idx][rowIdx] === player) {
    count++;
    idx--;
  }
  return count >= 4 ? renderWinner() : null;
}

function checkForwardSlash(colIdx, rowIdx) {
  const player = gameBoard[colIdx][rowIdx];
  let count = 1; 
  let idx1 = colIdx - 1;
  let idx2 = rowIdx + 1;
  while (idx1 >= 0  && idx2 < gameBoard[0].length && gameBoard[idx1][idx2] === player) {
    count++;
    idx1--;
    idx2++;
  }
  idx1 = colIdx + 1;  
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
  let idx1 = colIdx - 1; 
  let idx2 = rowIdx - 1;
  while (idx1 >= 0  && idx2 <= 0 && gameBoard[idx1][idx2] === player) {
    count++;
    idx1--;
    idx2--;
  }
  idx1 = colIdx + 1; 
  idx2 = rowIdx + 1
  while (idx1 < gameBoard.length && idx2 < gameBoard[0].length && gameBoard[idx1][idx2] === player) {
    count++;
    idx1++;
    idx2++;
  }
  return count === 4 ? renderWinner() : null; 
}

function renderWinner() {
  message.innerHTML = `The winner is ${names[turn]}!`;
  resetBtn.style.visibility = 'visible';
  winner = true;
  renderTurn();
  renderOpacity();

  
}

