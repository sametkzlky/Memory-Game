const cards = [
  "🍇",
  "🍈",
  "🍉",
  "🍊",
  "🍒",
  "🍓",
  "🥝",
  "🍏",
  "🍇",
  "🍈",
  "🍉",
  "🍊",
  "🍒",
  "🍓",
  "🥝",
  "🍏",
];
let flippedCards = [];
let matchedCards = [];
let gameStarted = false;
let timer;
let seconds = 0;
const timeElement = document.querySelector(".time");
const restartBtn = document.querySelector(".restart-btn");

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}

function createBoard() {
  const shuffledCards = shuffle(cards);
  const gameContainer = document.querySelector(".memory-game");
  shuffledCards.forEach(function (card, index) {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.dataset.card = card;
    cardElement.dataset.index = index;
    cardElement.innerHTML =
      '<span class="front">?</span><span class="back">' + card + "</span>";
    cardElement.addEventListener("click", flipCard);
    gameContainer.appendChild(cardElement);
  });
}

function startTimer() {
  if (!gameStarted) {
    timer = setInterval(function () {
      seconds++;
      timeElement.textContent = pad(seconds);
    }, 1000);
    gameStarted = true;
  }
}

function stopTimer() {
  clearInterval(timer);
}

function pad(val) {
  return val > 1000 ? val : "⏱️ : " + val + " Second";
}

function flipCard() {
  startTimer();
  const currentCard = this;
  if (flippedCards.length < 2 && !flippedCards.includes(currentCard)) {
    flippedCards.push(currentCard);
    currentCard.classList.add("flipped");
    if (flippedCards.length === 2) {
      setTimeout(checkMatch, 1000);
    }
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;
  if (card1.dataset.card === card2.dataset.card) {
    matchedCards.push(card1, card2);
    if (matchedCards.length === cards.length) {
      stopTimer();
      alert(
        "Congratulations! You won! Your time: " + pad(seconds) + " seconds"
      );
    }
  } else {
    card1.classList.remove("flipped");
    card2.classList.remove("flipped");
  }
  flippedCards = [];
}

function restartGame() {
  // Oyunu başlatmadan önce kartları temizle
  const gameContainer = document.querySelector(".memory-game");
  gameContainer.innerHTML = "";
  flippedCards = [];
  matchedCards = [];
  gameStarted = false;
  seconds = 0;
  timeElement.textContent = "00";
  createBoard();
}

document.addEventListener("DOMContentLoaded", function () {
  createBoard();
  // Restart butonunu oyun başladığında gizleme işlemi kaldırıldı
  // restartBtn.style.display = 'none';
});

function flipCard() {
  startTimer();
  const currentCard = this;
  if (flippedCards.length < 2 && !flippedCards.includes(currentCard)) {
    flippedCards.push(currentCard);
    currentCard.classList.toggle("flipped"); // 'flipped' sınıfını toggle et
    if (flippedCards.length === 2) {
      setTimeout(checkMatch, 1000);
    }
  }
}
