// const canvas = document.getElementById("gameCanvas");
// const ctx = canvas.getContext("2d");
// const restartBtn = document.getElementById("restartBtn");

// canvas.width = 600;
// canvas.height = 600;

// let snake, direction, fruit, gameOver;

// function initializeGame() {
//     snake = [{ x: 300, y: 300 }];
//     direction = "RIGHT";
//     fruit = generateFruit();
//     gameOver = false;
//     gameLoop();
// }

// document.addEventListener("keydown", changeDirection);

// restartBtn.addEventListener("click", initializeGame); // חידוש המשחק בלחיצה על כפתור

// function changeDirection(event) {
//     const key = event.keyCode;
//     if (key === 37 && direction !== "RIGHT") direction = "LEFT";
//     else if (key === 38 && direction !== "DOWN") direction = "UP";
//     else if (key === 39 && direction !== "LEFT") direction = "RIGHT";
//     else if (key === 40 && direction !== "UP") direction = "DOWN";
// }

// function generateFruit() {
//     return {
//         x: Math.floor(Math.random() * 60) * 10,
//         y: Math.floor(Math.random() * 60) * 10
//     };
// }

// function gameLoop() {
//     if (gameOver) {
//         ctx.clearRect(0, 0, canvas.width, canvas.height);
//         ctx.font = "30px Arial";
//         ctx.fillText("Game Over!", 200, 300);
//         return;
//     }

//     ctx.clearRect(0, 0, canvas.width, canvas.height);
    
//     // Move the snake
//     const head = { ...snake[0] };
//     if (direction === "LEFT") head.x -= 5.5;
//     else if (direction === "UP") head.y -= 5.5;
//     else if (direction === "RIGHT") head.x += 5.5;
//     else if (direction === "DOWN") head.y += 5.5;
    
//     snake.unshift(head);
    
//     // Check if the snake ate the fruit
//     if (head.x === fruit.x && head.y === fruit.y) {
//         fruit = generateFruit();
//     } else {
//         snake.pop(); 
//     }
    
//     // Draw the snake
//     ctx.fillStyle = "white";
//     snake.forEach(segment => ctx.fillRect(segment.x, segment.y, 10, 10));
    
//     // Draw the fruit
//     ctx.fillStyle = "red";
//     ctx.fillRect(fruit.x, fruit.y, 10, 10);
    
//     // Check for collisions
//     if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height || snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)) {
//         gameOver = true;
//     }
    
//     requestAnimationFrame(gameLoop);
// }

// initializeGame(); // התחל את המשחק בהתחלה

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const restartBtn = document.getElementById("restartBtn");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");

canvas.width = 400;
canvas.height = 400;

let snake, direction, fruit, gameOver, gameInterval, isPaused = false, gameStarted = false;

function initializeGame() {
    snake = [{ x: 200, y: 200 }];
    direction = "RIGHT";
    fruit = generateFruit();
    gameOver = false;
    isPaused = false;
    gameStarted = true;
    clearInterval(gameInterval);
    gameInterval = setInterval(gameLoop, 85);
    if (startBtn) startBtn.style.display = "none";
    if (pauseBtn) { pauseBtn.style.display = "inline-block"; pauseBtn.textContent = "השהה"; }
}

function pauseGame() {
    if (!gameStarted || gameOver) return;
    isPaused = !isPaused;
    if (isPaused) {
        clearInterval(gameInterval);
        if (pauseBtn) pauseBtn.textContent = "המשך";
    } else {
        gameInterval = setInterval(gameLoop, 85);
        if (pauseBtn) pauseBtn.textContent = "השהה";
    }
}

document.addEventListener("keydown", function(e) {
    if (e.keyCode === 32) { e.preventDefault(); pauseGame(); return; }
    changeDirection(e);
});
restartBtn.addEventListener("click", function() { initializeGame(); });
if (startBtn) startBtn.addEventListener("click", initializeGame);
if (pauseBtn) pauseBtn.addEventListener("click", pauseGame);

function setDirection(newDir) {
    if (newDir === "LEFT" && direction !== "RIGHT") direction = "LEFT";
    else if (newDir === "UP" && direction !== "DOWN") direction = "UP";
    else if (newDir === "RIGHT" && direction !== "LEFT") direction = "RIGHT";
    else if (newDir === "DOWN" && direction !== "UP") direction = "DOWN";
}

function changeDirection(event) {
    const key = event.keyCode;
    if (key === 37) setDirection("LEFT");
    else if (key === 38) setDirection("UP");
    else if (key === 39) setDirection("RIGHT");
    else if (key === 40) setDirection("DOWN");
}

document.querySelectorAll(".dpad-btn").forEach(function(btn) {
    btn.addEventListener("click", function() { setDirection(this.getAttribute("data-dir")); });
    btn.addEventListener("touchstart", function(e) {
        e.preventDefault();
        setDirection(this.getAttribute("data-dir"));
    }, { passive: false });
});

function generateFruit() {
    return {
        x: Math.floor(Math.random() * 40) * 10,  // כמות התאים שהפירות יופיעו בהם
        y: Math.floor(Math.random() * 40) * 10   // עדכון הגודל בהתאם
    };
}

function drawStartScreen() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "bold 22px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "white";
    ctx.fillText("לחץ 'התחל משחק' כדי להתחיל", canvas.width / 2, canvas.height / 2);
}

function gameLoop() {
    if (!gameStarted) { drawStartScreen(); return; }
    if (isPaused) return;
    if (gameOver) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = "bold 28px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "white";
        ctx.fillText("Game Over!", canvas.width / 2, canvas.height / 2 - 20);
        ctx.font = "16px Arial";
        ctx.fillText("לחץ חידוש משחק להמשך", canvas.width / 2, canvas.height / 2 + 20);
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Move the snake
    const head = { ...snake[0] };
    if (direction === "LEFT") head.x -= 10;
    else if (direction === "UP") head.y -= 10;
    else if (direction === "RIGHT") head.x += 10;
    else if (direction === "DOWN") head.y += 10;
    
    snake.unshift(head);
    
    // Check if the snake ate the fruit
    if (head.x === fruit.x && head.y === fruit.y) {
        fruit = generateFruit();  // Create a new fruit
    } else {
        snake.pop();  // Remove the last segment if not eating fruit
    }
    
    // Draw the snake
    ctx.fillStyle = "white";
    snake.forEach(segment => ctx.fillRect(segment.x, segment.y, 10, 10));
    
    // Draw the fruit
    ctx.fillStyle = "red";
    ctx.fillRect(fruit.x, fruit.y, 10, 10);
    
    // Check for collisions
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height || snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)) {
        gameOver = true;
    }
}

drawStartScreen();


