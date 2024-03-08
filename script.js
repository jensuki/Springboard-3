document.addEventListener("DOMContentLoaded", () => {
  const COLORS = [
    "red",
    "blue",
    "green",
    "orange",
    "purple",
    "red",
    "yellow",
    "blue",
    "green",
    "orange",
    "purple",
    "yellow"
  ];
  let flippedCards = [];
  let disableClick = false;
  let moveCounter = 0;

  const gameBoard = document.getElementById("game-board");
  const movesDisplay = document.getElementById("moves-display");

  // Shuffle the cards
  COLORS.sort(() => Math.random() - 0.5);

  // Create and display cards on the game board
  COLORS.forEach((color, index) => {
    const card = document.createElement("div");

    card.classList.add("card");
    card.dataset.index = index;
    card.dataset.color = color;
    // Set the background color to a default color
    card.style.backgroundColor = "gainsboro";

    card.addEventListener("click", flipCard);
    gameBoard.appendChild(card);
  });

  function flipCard(e) {

    const currentCard = e.target;
    const index = currentCard.dataset.index;
    if (currentCard.classList.contains("matched")) {
      return;
    }
    if (disableClick) {
      return;
    }
    if (!flippedCards.includes(index) && flippedCards.length < 2) {
      currentCard.classList.add("flipped");

      // Set the background color to the actual color only when flipped
      currentCard.style.backgroundColor = COLORS[index];
      flippedCards.push(index);

      if (flippedCards.length === 2) {
        // Increment the move counter when the second card is flipped
        moveCounter++;

        // Update the display of the move counter
        updateMovesDisplay();

        disableClick = true;
        setTimeout(checkMatch, 1000);
      }
    }
  }

  function checkMatch() {
    const [firstCard, secondCard] = flippedCards;
    const cards = document.querySelectorAll(".card");

    if (COLORS[firstCard] === COLORS[secondCard]) {
      // Matched
      cards[firstCard].classList.add("matched");
      cards[secondCard].classList.add("matched");
    } else {
      // Not matched
      cards[firstCard].classList.remove("flipped");
      cards[secondCard].classList.remove("flipped");

      // Reset the background color to the default color when not matched
      cards[firstCard].style.backgroundColor = "gainsboro";
      cards[secondCard].style.backgroundColor = "gainsboro";
    }

    flippedCards = [];
    disableClick = false;

    // Check if all pairs are matched
    const allMatched =
      document.querySelectorAll(".matched").length === COLORS.length;
    if (allMatched && COLORS.length) {
      setTimeout(() => {
        alert(`Congratulations! You matched all pairs in ${moveCounter} moves!`);
      }, 100);
    }
  }

  function updateMovesDisplay() {
    movesDisplay.textContent = `Moves: ${moveCounter}`;
  }
});
