const board = document.querySelector('.game-board');
const symbols = ['🍎', '🍊', '🍌', '🍇', '🍉', '🍒', '🍍', '🥝'];
let cards = [...symbols, ...symbols];
let flippedCards = [];
let matchedCards = 0;

// פונקציה לערבוב הקלפים
function shuffleCards() {
  cards.sort(() => 0.5 - Math.random()); // ערבוב אקראי של הקלפים
};

function resetGame() {
  board.innerHTML = '';
  flippedCards = [];
  matchedCards = 0;
  shuffleCards();

  // יצירת הקלפים והצגתם מחדש
  cards.forEach(symbol => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.symbol = symbol;
    card.innerText = symbol;
    board.appendChild(card);
  });
};

// יצירת הקלפים והצגתם בהתחלה
resetGame();

board.addEventListener('click', e => {
  const clickedCard = e.target;
  if (!clickedCard.classList.contains('card') || clickedCard.classList.contains('flipped')) return;
  clickedCard.classList.add('flipped');
  flippedCards.push(clickedCard);
  if (flippedCards.length === 2) {
    checkMatch();
  }
});
// פונקציה לבדוק אם יש התאמה בין שני קלפים
// פונקציה לבדוק אם יש התאמה בין שני קלפים
function checkMatch() {
  const [card1, card2] = flippedCards;
  if (card1.dataset.symbol === card2.dataset.symbol) {
    // אם יש התאמה בין הקלפים
    card1.classList.add('matched');
    card2.classList.add('matched');
    matchedCards += 2;
    if (matchedCards === cards.length) {
      setTimeout(showVictoryScreen, 400);
    }
  } else {
    // אם אין התאמה בין הקלפים - הפיכת הקלפים חזרה
    setTimeout(() => {
      card1.classList.remove('flipped');
      card2.classList.remove('flipped');
    }, 1000); // המתנה של שנייה לפני הפיכת הקלפים חזרה
  }

  flippedCards = [];
}

function showVictoryScreen() {
  const overlay = document.createElement('div');
  overlay.className = 'victory-overlay';
  overlay.innerHTML = `
    <div class="victory-card">
      <div class="victory-emoji">🎉</div>
      <h2>כל הכבוד!</h2>
      <p>הצלחת להתאים את כל הזוגות!</p>
      <button class="victory-btn" onclick="this.closest('.victory-overlay').remove()">שחק שוב</button>
    </div>
  `;
  overlay.querySelector('.victory-btn').addEventListener('click', () => {
    overlay.remove();
    resetGame();
  });
  document.body.appendChild(overlay);
}

// הוספת אירוע לכפתור איפוס המשחק
const resetButton = document.querySelector('.reset-button');
resetButton.addEventListener('click', resetGame);


