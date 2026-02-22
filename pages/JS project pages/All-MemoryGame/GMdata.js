// משתנים גלובליים
const board = document.querySelector('.game-board');
const symbols = ['🍎', '🍊', '🍌', '🍇', '🍉', '🍒', '🍍', '🥝'];
let cards = [...symbols, ...symbols];
let flippedCards = [];
let matchedCards = 0;

// פונקציה לערבוב הקלפים
function shuffleCards() {
  cards.sort(() => 0.5 - Math.random()); // ערבוב אקראי של הקלפים
};

// פונקציה לאתחול המשחק
function resetGame() {
  board.innerHTML = ''; // ניקוי כל הקלפים בלוח
  flippedCards = []; // איפוס המערך של הקלפים ההפוכים
  matchedCards = 0; // איפוס ספירת הקלפים התואמים
  shuffleCards(); // ערבוב מחדש של הקלפים

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

// אירוע לחיצה על קלף
board.addEventListener('click', e => {
  const clickedCard = e.target;
  if (!clickedCard.classList.contains('card') || clickedCard.classList.contains('flipped')) return;
  clickedCard.classList.add('flipped');
  flippedCards.push(clickedCard);
  if (flippedCards.length === 2) {
    checkMatch();
  }
});

// אירוע לחיצה על קלף
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
    // בדיקה אם המשחק נגמר (כל הקלפים תואמים)
    if (matchedCards === cards.length) {
      setTimeout(() => alert('ניצחתם!'), 300); // הצגת הודעת ניצחון
    }
  } else {
    // אם אין התאמה בין הקלפים - הפיכת הקלפים חזרה
    setTimeout(() => {
      card1.classList.remove('flipped');
      card2.classList.remove('flipped');
    }, 1000); // המתנה של שנייה לפני הפיכת הקלפים חזרה
  }

  flippedCards = []; // ניקוי המערך של הקלפים שהתהפכו
}

// הוספת אירוע לכפתור איפוס המשחק
const resetButton = document.querySelector('.reset-button');
resetButton.addEventListener('click', resetGame);


