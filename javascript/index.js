const instructionsModalButton = document.querySelector(".instructions-modal-button");
const instructionsModal = document.querySelector(".instructions-modal");
const gameInstructionsLink = document.querySelector(".game-instructions-link");

gameInstructionsLink.addEventListener("click", () => {
  instructionsModal.classList.remove("hidden");
})

instructionsModalButton.addEventListener("click", () => {
  instructionsModal.classList.add("hidden");
})
