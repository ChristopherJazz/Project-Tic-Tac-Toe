// ================================
//  TIC TAC TOE - script.js
// ================================

// Grab all the HTML elements we need
const setupScreen  = document.getElementById("setupScreen");
const gameScreen   = document.getElementById("gameScreen");
const player1Input = document.getElementById("player1Input");
const player2Input = document.getElementById("player2Input");
const startBtn     = document.getElementById("startBtn");
const statusMsg    = document.getElementById("statusMsg");
const cells        = document.querySelectorAll(".cell");
const resetBtn     = document.getElementById("resetBtn");
const quitBtn      = document.getElementById("quitBtn");
const score1El     = document.getElementById("score1");
const score2El     = document.getElementById("score2");
const score1Name   = document.getElementById("score1Name");
const score2Name   = document.getElementById("score2Name");
const score1Card   = document.getElementById("score1Card");
const score2Card   = document.getElementById("score2Card");r

// All winning combinations (indexes on the board)
const WIN_COMBOS = [
  [0, 1, 2], // top row
  [3, 4, 5], // middle row
  [6, 7, 8], // bottom row
  [0, 3, 6], // left column
  [1, 4, 7], // middle column
  [2, 5, 8], // right column
  [0, 4, 8], // diagonal top-left to bottom-right
  [2, 4, 6], // diagonal top-right to bottom-left
];

// Game state — everything lives here
let board = [];           // the 9 cells, "" means empty
let currentPlayer = null; // which player object is currently active
let gameOver = false;     // stops clicks once someone wins or draws

// Player objects (filled in when game starts)
let player1 = {};
let player2 = {};

// Track scores across rounds
let scores = { player1: 0, player2: 0 };


// ================================
//  1. START GAME
// ================================

startBtn.addEventListener("click", function () {
  // Read names from inputs, fall back to defaults if empty
  let name1 = player1Input.value.trim() || "Player 1";
  let name2 = player2Input.value.trim() || "Player 2";

  // Build the player objects
  player1 = { name: name1, mark: "X" };
  player2 = { name: name2, mark: "O" };

  // Update the scoreboard names
  score1Name.textContent = player1.name;
  score2Name.textContent = player2.name;

  // Reset scores for a fresh session
  scores.player1 = 0;
  scores.player2 = 0;
  updateScoreboard();

  // Switch screens
  setupScreen.classList.add("hidden");
  gameScreen.classList.remove("hidden");

  initBoard();
});


// ================================
//  2. INITIALIZE BOARD
// ================================

function initBoard() {
  // Create a fresh array with 9 empty slots
  board = ["", "", "", "", "", "", "", "", ""];

  // Player 1 always goes first
  currentPlayer = player1;
  gameOver = false;

  // Clear all cells visually
  cells.forEach(function (cell) {
    cell.textContent = "";
    cell.className = "cell"; // wipe any x / o / winner / taken classes
  });

  updateStatus();
  highlightActivePlayer();
}


// ================================
//  3. CELL CLICK
// ================================

cells.forEach(function (cell) {
  cell.addEventListener("click", function () {
    let index = parseInt(cell.getAttribute("data-index"));

    // If game is over or cell is already taken, do nothing
    if (gameOver) return;
    if (board[index] !== "") return;

    // Place the mark in our board array
    board[index] = currentPlayer.mark;

    // Show the mark on screen + add pop animation
    cell.textContent = currentPlayer.mark;
    cell.classList.add(currentPlayer.mark.toLowerCase(), "taken", "pop");

    // Check if this move won or drew the game
    let winningCombo = checkWin();

    if (winningCombo) {
      handleWin(winningCombo);
    } else if (checkDraw()) {
      handleDraw();
    } else {
      // No win, no draw — switch to next player
      switchPlayer();
    }
  });
});


// ================================
//  4. WIN CHECKER
// ================================

function checkWin() {
  // Go through every winning combo
  for (let i = 0; i < WIN_COMBOS.length; i++) {
    let combo = WIN_COMBOS[i];
    let a = combo[0];
    let b = combo[1];
    let c = combo[2];

    // Check if all three spots have the same mark (and aren't empty)
    if (board[a] !== "" && board[a] === board[b] && board[b] === board[c]) {
      return combo; // return the winning combo so we can highlight it
    }
  }

  return null; // no winner yet
}

function handleWin(winningCombo) {
  gameOver = true;

  // Highlight the winning cells
  winningCombo.forEach(function (index) {
    cells[index].classList.add("winner");
  });

  // Update status message
  statusMsg.textContent = "🎉 " + currentPlayer.name + " wins!";

  // Update score
  if (currentPlayer === player1) {
    scores.player1++;
  } else {
    scores.player2++;
  }

  updateScoreboard();
}


// ================================
//  5. DRAW CHECKER
// ================================

function checkDraw() {
  // If every cell is filled and there's no winner, it's a draw
  return board.every(function (cell) {
    return cell !== "";
  });
}

function handleDraw() {
  gameOver = true;
  statusMsg.textContent = "🤝 It's a draw!";
}


// ================================
//  6. SWITCH PLAYER
// ================================

function switchPlayer() {
  // Flip between player 1 and player 2
  if (currentPlayer === player1) {
    currentPlayer = player2;
  } else {
    currentPlayer = player1;
  }

  updateStatus();
  highlightActivePlayer();
}


// ================================
//  7. RESET GAME (new round)
// ================================

resetBtn.addEventListener("click", function () {
  initBoard(); // same names, same scores — just clear the board
});


// ================================
//  QUIT — go back to name entry
// ================================

quitBtn.addEventListener("click", function () {
  gameScreen.classList.add("hidden");
  setupScreen.classList.remove("hidden");
});


// ================================
//  HELPERS
// ================================

// Update the "whose turn" message
function updateStatus() {
  statusMsg.textContent = currentPlayer.name + "'s turn (" + currentPlayer.mark + ")";
}

// Highlight whose score card is active
function highlightActivePlayer() {
  score1Card.classList.remove("active");
  score2Card.classList.remove("active");

  if (currentPlayer === player1) {
    score1Card.classList.add("active");
  } else {
    score2Card.classList.add("active");
  }
}

// Push score numbers into the DOM
function updateScoreboard() {
  score1El.textContent = scores.player1;
  score2El.textContent = scores.player2;
}