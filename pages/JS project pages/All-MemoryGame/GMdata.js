const board = document.querySelector('.game-board');
const symbols = ['🍎', '🍊', '🍌', '🍇', '🍉', '🍒', '🍍', '🥝'];
let cards = [...symbols, ...symbols];
let flippedCards = [];
let matchedCards = 0;
let gameStartTime = null;
let timesList = [];
try { timesList = JSON.parse(localStorage.getItem('memoryTimes') || '[]'); } catch(e) {}

// פונקציה לערבוב הקלפים
function shuffleCards() {
  cards.sort(() => 0.5 - Math.random()); // ערבוב אקראי של הקלפים
};

function resetGame() {
  board.innerHTML = '';
  flippedCards = [];
  matchedCards = 0;
  gameStartTime = Date.now();
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
gameStartTime = Date.now();
renderTimesList();

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
      var elapsed = gameStartTime ? Math.round((Date.now() - gameStartTime) / 1000) : 0;
      timesList.push({ t: elapsed, d: new Date().toLocaleDateString('he-IL') });
      timesList.sort(function(a,b) { return a.t - b.t; });
      timesList = timesList.slice(0, 10);
      try { localStorage.setItem('memoryTimes', JSON.stringify(timesList)); } catch(e) {}
      setTimeout(function() { showVictoryScreen(elapsed); }, 400);
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

function showVictoryScreen(elapsed) {
  const overlay = document.createElement('div');
  overlay.className = 'victory-overlay';
  overlay.innerHTML = '<div class="victory-card"><div class="victory-emoji">🎉</div><h2>כל הכבוד!</h2><p>הצלחת להתאים את כל הזוגות!</p><p>' + (elapsed ? 'זמן: ' + elapsed + ' שניות' : '') + '</p><button class="victory-btn">שחק שוב</button></div>';
  overlay.querySelector('.victory-btn').addEventListener('click', function() {
    overlay.remove();
    resetGame();
    renderTimesList();
  });
  document.body.appendChild(overlay);
  renderTimesList();
}

function renderTimesList() {
  var el = document.getElementById('times-list');
  if (!el) return;
  el.innerHTML = timesList.length ? timesList.map(function(x, i) { return '<li>' + (i+1) + '. ' + x.t + ' שניות (' + x.d + ')</li>'; }).join('') : '<li>אין עדיין תוצאות</li>';
}

function showHint() {
  var unmatched = Array.from(board.querySelectorAll('.card')).filter(function(c) { return !c.classList.contains('matched'); });
  if (unmatched.length < 2) return;
  var pair = {};
  for (var i = 0; i < unmatched.length; i++) {
    var s = unmatched[i].dataset.symbol;
    if (!pair[s]) pair[s] = [];
    pair[s].push(unmatched[i]);
  }
  var hintCards = null;
  for (var k in pair) { if (pair[k].length >= 2) { hintCards = pair[k]; break; } }
  if (!hintCards) return;
  hintCards[0].classList.add('flipped');
  hintCards[1].classList.add('flipped');
  setTimeout(function() {
    hintCards[0].classList.remove('flipped');
    hintCards[1].classList.remove('flipped');
  }, 1500);
}

// הוספת אירוע לכפתור איפוס המשחק
const resetButton = document.querySelector('.reset-button');
resetButton.addEventListener('click', function() { resetGame(); renderTimesList(); });
var hintBtn = document.querySelector('.hint-button');
if (hintBtn) hintBtn.addEventListener('click', showHint);


