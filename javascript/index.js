const instructionsModalButton = document.querySelector(".instructions-modal-button");
const instructionsModal = document.querySelector(".instructions-modal");
const gameInstructionsLink = document.querySelector(".game-instructions-link");
const scoresModalButton = document.querySelector(".scores-modal-button");
const scoresModal = document.querySelector(".scores-modal");
const gameScoresLink = document.querySelector(".game-scores-link");
const playButton = document.querySelector(".play-button");
const gamecontainer = document.querySelector(".game-container");
const mobileGamecontainer = document.querySelector(".mobile-game-container");
const gameTable = document.querySelector(".game-table");

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
  // mobileGamecontainer.classList.remove("hidden-delay");
  gamecontainer.classList.add("fade-in");
  // mobileGamecontainer.classList.add("fade-in");
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
}
