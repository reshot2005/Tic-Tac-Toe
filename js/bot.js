const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const moveSound = document.getElementById('move-sound');
const winSound = document.getElementById('win-sound');
const playerScoreEl = document.getElementById('player-score');
const botScoreEl = document.getElementById('bot-score');

let board = ['', '', '', '', '', '', '', '', ''];
let player = 'X';
let bot = 'O';
let currentPlayer = player;
let gameActive = true;

let playerScore = 0;
let botScore = 0;

const winConditions = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

cells.forEach(cell => {
  cell.addEventListener('click', () => {
    if (!gameActive || cell.textContent !== '') return;

    const index = cell.dataset.index;
    if (board[index] === '') {
      board[index] = player;
      cell.textContent = player;
      playSound(moveSound);
      checkWinner();

      if (gameActive) {
        setTimeout(() => {
          botMove();
          checkWinner();
        }, 500);
      }
    }
  });
});

function botMove() {
  let bestScore = -Infinity;
  let move;
  for (let i = 0; i < 9; i++) {
    if (board[i] === '') {
      board[i] = bot;
      let score = minimax(board, 0, false);
      board[i] = '';
      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  }
  board[move] = bot;
  cells[move].textContent = bot;
  playSound(moveSound);
}

function minimax(newBoard, depth, isMaximizing) {
  let result = evaluate(newBoard);
  if (result !== null) return result;

  if (isMaximizing) {
    let best = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (newBoard[i] === '') {
        newBoard[i] = bot;
        best = Math.max(best, minimax(newBoard, depth + 1, false));
        newBoard[i] = '';
      }
    }
    return best;
  } else {
    let best = Infinity;
    for (let i = 0; i < 9; i++) {
      if (newBoard[i] === '') {
        newBoard[i] = player;
        best = Math.min(best, minimax(newBoard, depth + 1, true));
        newBoard[i] = '';
      }
    }
    return best;
  }
}

function evaluate(b) {
  for (let condition of winConditions) {
    const [a, b1, c] = condition;
    if (b[a] && b[a] === b[b1] && b[a] === b[c]) {
      return b[a] === bot ? 1 : -1;
    }
  }
  if (!b.includes('')) return 0;
  return null;
}

function checkWinner() {
  for (let condition of winConditions) {
    const [a, b1, c] = condition;
    if (board[a] && board[a] === board[b1] && board[a] === board[c]) {
      gameActive = false;
      playSound(winSound);
      if (board[a] === player) {
        statusText.textContent = "👤 You win!";
        playerScore++;
      } else {
        statusText.textContent = "🤖 Bot wins!";
        botScore++;
      }
      updateScore();
      return;
    }
  }

  if (!board.includes('')) {
    gameActive = false;
    statusText.textContent = "It's a tie!";
  }
}

function resetGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  statusText.textContent = "Your turn!";
  cells.forEach(cell => cell.textContent = '');
}

function playSound(sound) {
  try {
    const cloned = sound.cloneNode(); // Create a fresh instance
    cloned.play();
  } catch (err) {
    console.error("Sound error:", err);
  }
}

function updateScore() {
  playerScoreEl.textContent = playerScore;
  botScoreEl.textContent = botScore;
}
