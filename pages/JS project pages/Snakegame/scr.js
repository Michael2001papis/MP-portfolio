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

canvas.width = 400;  // שים לב ששינית את הגודל ל-400x400
canvas.height = 400;

let snake, direction, fruit, gameOver, gameInterval;

function initializeGame() {
    snake = [{ x: 200, y: 200 }];  // שינויים למיקום ההתחלתי כדי להתאים ל-400x400
    direction = "RIGHT";
    fruit = generateFruit();
    gameOver = false;
    clearInterval(gameInterval); // עצור את הלולאה הישנה אם קיימת
    gameInterval = setInterval(gameLoop, 85); // הגדר מהירות (100ms בין כל שלב)
}

document.addEventListener("keydown", changeDirection);
restartBtn.addEventListener("click", initializeGame);

function changeDirection(event) {
    const key = event.keyCode;
    if (key === 37 && direction !== "RIGHT") direction = "LEFT";
    else if (key === 38 && direction !== "DOWN") direction = "UP";
    else if (key === 39 && direction !== "LEFT") direction = "RIGHT";
    else if (key === 40 && direction !== "UP") direction = "DOWN";
}

function generateFruit() {
    return {
        x: Math.floor(Math.random() * 40) * 10,  // כמות התאים שהפירות יופיעו בהם
        y: Math.floor(Math.random() * 40) * 10   // עדכון הגודל בהתאם
    };
}

function gameLoop() {
    if (gameOver) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = "30px Arial";
        ctx.fillText("Game Over!", 100, 200);  // עדכון מיקום הצגת "Game Over"
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

initializeGame();



