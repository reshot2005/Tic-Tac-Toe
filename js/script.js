// Game State
let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let isGameOver = false;

// DOM references
const cells = document.querySelectorAll(".cell");
const playerTurnText = document.getElementById("playerTurn");
const resultText = document.getElementById("result");
const resetBtn = document.getElementById("resetBtn");

// Win combinations
const winCombos = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

// Cell click handler
function handleCellClick(e) {
  const idx = e.target.dataset.index;

  if (gameBoard[idx] !== "" || isGameOver) return;

  gameBoard[idx] = currentPlayer;
  e.target.textContent = currentPlayer;
  
  if (checkWin(currentPlayer)) {
    resultText.textContent = `${currentPlayer} Wins! 🎉`;
    isGameOver = true;
    highlightWin(currentPlayer);
    return;
  }

  if (gameBoard.every(cell => cell !== "")) {
    resultText.textContent = "It's a Tie!";
    isGameOver = true;
    return;
  }

  // Switch player
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  playerTurnText.textContent = `Player ${currentPlayer}'s Turn`;
}

// Check for win condition
function checkWin(player) {
  return winCombos.some(combo => combo.every(i => gameBoard[i] === player));
}

// Highlight the winning cells
function highlightWin(player) {
  winCombos.forEach(combo => {
    if (combo.every(i => gameBoard[i] === player)) {
      combo.forEach(i => cells[i].classList.add("win"));
    }
  });
}

// Reset the game
function resetGame() {
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  isGameOver = false;
  playerTurnText.textContent = `Player ${currentPlayer}'s Turn`;
  resultText.textContent = "";
  
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("win");
  });
}

// Event Listeners
cells.forEach(cell => cell.addEventListener("click", handleCellClick));
resetBtn.addEventListener("click", resetGame);
