// הגדרת משתנים עבור הקנבס
const canvas = document.getElementById('pong');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 400;

// הגדרת מאפיינים לפדלים
const paddleWidth = 10, paddleHeight = 100, paddleSpeed = 6;
let leftPaddle = { x: 20, y: canvas.height / 2 - paddleHeight / 2, width: paddleWidth, height: paddleHeight, color: '#3498db' };
let rightPaddle = { x: canvas.width - 30, y: canvas.height / 2 - paddleHeight / 2, width: paddleWidth, height: paddleHeight, color: '#e74c3c' };

// הגדרת מאפיינים לכדור
var ballSpeedMultiplier = 1;
let ball = { x: canvas.width / 2, y: canvas.height / 2, radius: 10, speedX: 4, speedY: 4, color: '#ecf0f1' };

// הגדרת משתנים עבור הציונים
let leftScore = 0, rightScore = 0;
let gameStarted = false;
let keys = {};

// שמירת מצב מקשי החצים
document.addEventListener('keydown', (event) => keys[event.key.toLowerCase()] = true);
document.addEventListener('keyup', (event) => keys[event.key.toLowerCase()] = false);

// פונקציה לציור כדור
function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = ball.color;
    ctx.fill();
    ctx.closePath();
}

// פונקציה לציור פדל
function drawPaddle(paddle) {
    ctx.fillStyle = paddle.color;
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
}

// עדכון מיקום הכדור
function updateBall() {
    ball.x += ball.speedX * ballSpeedMultiplier;
    ball.y += ball.speedY * ballSpeedMultiplier;

    // שינוי כיוון כאשר הכדור פוגע בקירות
    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.speedY = -ball.speedY;
    }

    // שינוי כיוון כאשר הכדור פוגע בפדלים
    if (ball.x - ball.radius < leftPaddle.x + leftPaddle.width &&
        ball.y > leftPaddle.y && ball.y < leftPaddle.y + leftPaddle.height) {
        ball.speedX = -ball.speedX;
    }

    if (ball.x + ball.radius > rightPaddle.x &&
        ball.y > rightPaddle.y && ball.y < rightPaddle.y + rightPaddle.height) {
        ball.speedX = -ball.speedX;
    }

    // עדכון הציונים
    if (ball.x + ball.radius > canvas.width) {
        leftScore++;
        resetBall();
    } else if (ball.x - ball.radius < 0) {
        rightScore++;
        resetBall();
    }

    document.getElementById('leftScore').textContent = leftScore;
    document.getElementById('rightScore').textContent = rightScore;

    checkWinner();
}

// עדכון מיקום הפדלים
function updatePaddles() {
    if (keys['w'] && leftPaddle.y > 0) leftPaddle.y -= paddleSpeed;
    if (keys['s'] && leftPaddle.y + leftPaddle.height < canvas.height) leftPaddle.y += paddleSpeed;
    if (keys['arrowup'] && rightPaddle.y > 0) rightPaddle.y -= paddleSpeed;
    if (keys['arrowdown'] && rightPaddle.y + rightPaddle.height < canvas.height) rightPaddle.y += paddleSpeed;
}

// איפוס הכדור למרכז
function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.speedX = 4 * (Math.random() > 0.5 ? 1 : -1);
    ball.speedY = 4 * (Math.random() > 0.5 ? 1 : -1);
}

// בדיקת מנצח
function checkWinner() {
    if (leftScore >= 5) {
        alert('שחקן שמאל ניצח!');
        resetGame();
    } else if (rightScore >= 5) {
        alert('שחקן ימין ניצח!');
        resetGame();
    }
}

// איפוס המשחק
function resetGame() {
    leftScore = 0;
    rightScore = 0;
    document.getElementById('leftScore').textContent = leftScore;
    document.getElementById('rightScore').textContent = rightScore;
    resetBall();
}

// לולאת המשחק
function gameLoop() {
    if (!gameStarted) return;  
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle(leftPaddle);
    drawPaddle(rightPaddle);
    updateBall();
    updatePaddles();
    requestAnimationFrame(gameLoop);
}

// בחירת מהירות
document.querySelectorAll('input[name="ballSpeed"]').forEach(function(r) {
    r.addEventListener('change', function() {
        ballSpeedMultiplier = this.value === 'slow' ? 0.6 : this.value === 'fast' ? 1.5 : 1;
    });
});
var speedRadios = document.querySelector('input[name="ballSpeed"]:checked');
if (speedRadios) ballSpeedMultiplier = speedRadios.value === 'slow' ? 0.6 : speedRadios.value === 'fast' ? 1.5 : 1;

// התחלת המשחק
document.getElementById('startBtn').addEventListener('click', () => {
    if (!gameStarted) {
        var sel = document.querySelector('input[name="ballSpeed"]:checked');
        if (sel) ballSpeedMultiplier = sel.value === 'slow' ? 0.6 : sel.value === 'fast' ? 1.5 : 1;
        gameStarted = true;
        resetBall();
        gameLoop();
    }
});

// עצירת המשחק
document.getElementById('stopBtn').addEventListener('click', () => {
    gameStarted = false;
});
