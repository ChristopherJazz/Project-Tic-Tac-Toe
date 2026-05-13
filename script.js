const cellBtn = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

initializeGame();


function initializeGame() {
    statusText.textContent = `${currentPlayer}'s turn`;

    cellBtn.forEach(cell => {
        cell.addEventListener("click", () => {
            if (cell.textContent !== "") {
                return;
            }
            cell.textContent = currentPlayer;
            changePlayer();
        });
    });
}


function changePlayer(){
    currentPlayer =
    (currentPlayer == "X") ? "O": "X";

    statusText.textContent = `${currentPlayer}'s turn`;
    
}

