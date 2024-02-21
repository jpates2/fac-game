const instructionsModalButton = document.querySelector(".instructions-modal-button");
const instructionsModal = document.querySelector(".instructions-modal");
const gameInstructionsLink = document.querySelector(".game-instructions-link");
const scoresModalButton = document.querySelector(".scores-modal-button");
const scoresModal = document.querySelector(".scores-modal");
const gameScoresLink = document.querySelector(".game-scores-link");
const playButton = document.querySelector(".play-button");
const gamecontainer = document.querySelector(".game-container");
const gameTable = document.querySelector(".game-table");

let gamePlaying, bug, bugCurrent;
let bugs = [];

gameInstructionsLink.addEventListener("click", () => {
  instructionsModal.classList.remove("hidden");
})

instructionsModalButton.addEventListener("click", () => {
  instructionsModal.classList.add("hidden");
})

gameScoresLink.addEventListener("click", () => {
  scoresModal.classList.remove("hidden");
})

scoresModalButton.addEventListener("click", () => {
  scoresModal.classList.add("hidden");
})

function startGame() {
  playButton.classList.add("fade-hide");
  gamecontainer.classList.remove("hidden-delay");
  gamecontainer.classList.add("fade-in");
  gamePlaying = true;
  buildTable();
}

playButton.addEventListener("click", startGame);

const cellID = function(i, j) {
  return 'cell-' + i + '-' + j;
}

function buildTable() {
  for (let i = 0; i < 10; i++) {
    let row = document.createElement("tr");
    for (let j = 0; j < 10; j++) {
      let column = document.createElement("td");
      column.setAttribute("class", "board-cell");
      column.id = cellID(i, j);
      row.appendChild(column);
    }
    gameTable.appendChild(row);
  }

  placeBug();

  const boardCell = document.querySelectorAll(".board-cell");

  for (let i = 0; i < boardCell.length; i++) {
    bugCurrent = boardCell[i];
    bugCurrent.addEventListener("click", revealBugCell);
  }
}

let currentBug;

const placeBug = function() {
  for (let i = 0; i < 10; i++) {
    bugs.push([Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)]);
  }

  bugs.forEach (function(bug) {
    currentBug = document.getElementById(`cell-${bug[0]}-${bug[1]}`);
    currentBug.classList.add("bug-cell");
  })
}

function revealBugCell(e) {
  if (gamePlaying) {
    const bugCell = e.currentTarget;
    const bugRow = bugCell.parentElement.rowIndex;
    const bugCol = bugCell.cellIndex;
    const adjCells = [
      `cell-${bugRow - 1}-${bugCol - 1}`,
      `cell-${bugRow}-${bugCol - 1}`,
      `cell-${bugRow + 1}-${bugCol - 1}`,
      `cell-${bugRow - 1}-${bugCol}`,
      `cell-${bugRow + 1}-${bugCol}`,
      `cell-${bugRow - 1}-${bugCol + 1}`,
      `cell-${bugRow}-${bugCol + 1}`,
      `cell-${bugRow + 1}-${bugCol + 1}`
    ]

    if (bugCell.classList.contains("bug-cell")) {
      bugCell.textContent = "🪲";
      bugCell.classList.add("bug-cell-colour");
    }
  }
}
