const cellBtn = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");


cellBtn.forEach(cell => {

    cell.addEventListener('click', function (event) {
    cell.textContent = "X";
    if (cell.textContent !==""){
        return;
    }
})});

let currentPlayer = "X";

function changePlayer(){
    currentPlayer =
    (currentPlayer == "X")
    ? "O"
    : "X";

    statusText.textContent =
    `${currentPlayer}'s turn`;
}

let board = [
 "", "", "",
 "", "", "",
 "", "", ""
];

