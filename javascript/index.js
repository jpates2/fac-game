const instructionsModalButton = document.querySelector(".instructions-modal-button");
const instructionsModal = document.querySelector(".instructions-modal");
const gameInstructionsLink = document.querySelector(".game-instructions-link");
const scoresModalButton = document.querySelector(".scores-modal-button");
const scoresModal = document.querySelector(".scores-modal");
const gameScoresLink = document.querySelector(".game-scores-link");
const playButton = document.querySelector(".play-button");
const gamecontainer = document.querySelector(".game-container");
const gameTable = document.querySelector(".game-table");
const gameScoreCounter = document.querySelector(".game-score-counter");
const playAgainButtom = document.querySelector(".play-again-button");
const endModal = document.querySelector(".end-modal");
const endModalHeader = document.querySelector(".end-modal-header");
const gameMainHeader = document.querySelector(".game-main-header");
const endScoreCounter = document.querySelector(".end-score-counter");
const saveButton = document.querySelector(".save-button");
const username = document.getElementById("user-name");
const gameTimerClock = document.querySelector(".game-timer-clock");
const scoresEmpty = document.querySelector(".scores-empty");
const scoresTable = document.querySelector(".scores-table");

const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;

let gamePlaying, bug, bugCurrent, score, timer, timerCountdown, clickTimer;
let bugs = [];

gameInstructionsLink.addEventListener("click", () => {
  instructionsModal.classList.remove("hidden");
})

instructionsModalButton.addEventListener("click", () => {
  instructionsModal.classList.add("hidden");
})

gameScoresLink.addEventListener("click", () => {
  populateTopScores();
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
  score = 0;
  gameScoreCounter.textContent = score;
  timer = 300;
  bugs = [];
  buildTable();
  let minsTimer = `${Math.floor(timer / 60)}:${String(timer % 60).padStart(2, '0')}`;
  gameTimerClock.textContent = minsTimer;

  timerCountdown = setInterval(function() {
    if(timer <= 1) {
      clearInterval(timerCountdown);
      timeUp();
      endGame();
    }
    timer--;
    minsTimer = `${Math.floor(timer / 60)}:${String(timer % 60).padStart(2, '0')}`;
    gameTimerClock.textContent = minsTimer;
  }, 1000);
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

    if (isTouchDevice) {
      bugCurrent.addEventListener("touchstart", function(e) {
        e.preventDefault();
        clickTimer = setTimeout(function() {
          markBugCell(e);
          clearTimeout(clickTimer);
          clickTimer = undefined;
        }, 1000);
      });

      bugCurrent.addEventListener("touchend", function(e) {
        e.preventDefault();
        if (clickTimer !== undefined) {
          clearTimeout(clickTimer);
          revealBugCell(e);
        }
      });
    } else {
      bugCurrent.addEventListener("contextmenu", function(e) {
        e.preventDefault();
        markBugCell(e);
      });

      bugCurrent.addEventListener("click", function(e) {
        clearTimeout(clickTimer);
        revealBugCell(e);
      });
    }
  }
}

let currentBug;

const placeBug = function() {
  for (let i = 0; i <= 15; i++) {
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
      loseGame();
      endGame();
    } else {
      if (bugCell.textContent !== "") { return };
      bugCell.classList.add("revealed-cell");
      score++;
      gameScoreCounter.textContent = score;
      if (score === 85) {
        winGame();
        endGame();
      }

      let numBugs = 0;

      adjCells.forEach((cell) => {
        if (!cell.includes("--") && !cell.includes("10")) {
          if (document.getElementById(cell).classList.contains("bug-cell")) {
            numBugs++;
          }
        }
      })

      bugCell.textContent = numBugs;
      bugCell.style.fontSize = "1rem";
      bugCell.classList.add("number-cell-colour");
      bugCell.removeEventListener("click", revealBugCell);
    }
  }
}

function markBugCell(e) {
  e.preventDefault();
  let flagCell;
  if (e.currentTarget) {
    flagCell = e.currentTarget;
  } else {
    flagCell = e.target;
  }
  if (gamePlaying && !flagCell.classList.contains("revealed-cell")) {
    if (flagCell.textContent === "") {
      flagCell.textContent = "🚩";
      if (window.innerWidth <= 600) {
        flagCell.style.fontSize = "0.5rem";
      }
    } else {
      flagCell.textContent = "";
      flagCell.style.fontSize = "";
    }
  }
}

function endGame() {
  clearInterval(timerCountdown);
  gamePlaying = false;
  endScoreCounter.innerText = score;
  endModal.classList.remove("hidden-delay");
  endModal.classList.add("fade-in");
}

function winGame() {
  gameMainHeader.innerText = "YOU WIN!";
}

function loseGame() {
  gameMainHeader.innerText = "BAD LUCK!";
}

function timeUp() {
  gameMainHeader.innerText = "TIME'S UP!";
}

function saveScore(e) {
  submitScore();

  endModal.classList.add("hidden-delay");
  endModal.classList.remove("fade-in");
  populateTopScores();
  scoresModal.classList.remove("hidden");
  playAgain();
}

async function submitScore() {
  await fetch("https://bugsweeper-f4752-default-rtdb.europe-west1.firebasedatabase.app/scores.json", {
    method: "POST",
    body: JSON.stringify({username: username.value, score: score})
  })
}

saveButton.addEventListener("click", saveScore);

function playAgain() {
  playButton.classList.remove("fade-hide");
  gamecontainer.classList.add("hidden-delay");
  gamecontainer.classList.remove("fade-in");
  endModal.classList.add("hidden-delay");
  gameMainHeader.innerText = "BUGSWEEPER";
  gameTable.textContent = "";
  username.value = "";
}

playAgainButtom.addEventListener("click", playAgain);

async function populateTopScores() {
  const topScores = await getScores();

  if (topScores.length === 0) {
    scoresEmpty.textContent = "Play now to get the first top score!";
  } else {
    scoresEmpty.textContent = "";
    scoresTable.textContent = "";
    const sortedScores = (topScores.sort((a,b) => b[1] - a[1]).slice(0, 10));
    let rank = 1;
    sortedScores.forEach((score) => {
      const scoreItem = document.createElement("tr");
      scoreItem.setAttribute("class", "scores-table-item");
      const usersRank = document.createElement("td");
      usersRank.setAttribute("class", "scores-table-rank");
      const usersName = document.createElement("td");
      usersName.setAttribute("class", "scores-table-name");
      const usersScore = document.createElement("td");
      usersScore.setAttribute("class", "scores-table-score");

      usersRank.textContent = `${rank}.`;
      usersName.textContent = score[0];
      usersScore.textContent = score[1];

      scoreItem.appendChild(usersRank);
      scoreItem.appendChild(usersName);
      scoreItem.appendChild(usersScore);

      scoresTable.appendChild(scoreItem);

      rank++;
    })
  }
}

async function getScores() {
  const response = await fetch("https://bugsweeper-f4752-default-rtdb.europe-west1.firebasedatabase.app/scores.json");

  if (!response.ok) { throw new Error("Failed to load data.") }

  const scoresData = await response.json();
  let scores = [];

  for (const score in scoresData) {
      scores.push([scoresData[score].username, scoresData[score].score])
  }

  return scores;
}
