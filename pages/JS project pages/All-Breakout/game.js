// Breakout | © 2025 MP — Michael Papismedov
(function() {
    'use strict';

    var canvas = document.getElementById('gameCanvas');
    var ctx = canvas.getContext('2d');
    var overlay = document.getElementById('overlay');
    var overlayTitle = document.getElementById('overlayTitle');
    var overlayText = document.getElementById('overlayText');
    var overlayBtn = document.getElementById('overlayBtn');
    var scoreEl = document.getElementById('score');
    var livesEl = document.getElementById('lives');
    var levelEl = document.getElementById('level');

    var W, H, scale;
    var paddle = { x: 0, w: 100, h: 12, speed: 8 };
    var ball = { x: 0, y: 0, r: 6, dx: 0, dy: 0, speed: 5 };
    var bricks = [];
    var score = 0, lives = 3, level = 1;
    var running = false;
    var mouseX = 0;
    var BRICK_COLS = 9, BRICK_ROWS = 5;
    var BRICK_W = 0, BRICK_H = 0, BRICK_GAP = 3;
    var COLORS = ['#ef4444', '#f59e0b', '#22c55e', '#3b82f6', '#8b5cf6'];

    function resize() {
        var rect = canvas.getBoundingClientRect();
        var dpr = window.devicePixelRatio || 1;
        W = rect.width;
        H = rect.height;
        canvas.width = W * dpr;
        canvas.height = H * dpr;
        ctx.scale(dpr, dpr);
        canvas.style.width = W + 'px';
        canvas.style.height = H + 'px';
        scale = W / 700;
        BRICK_W = (W - (BRICK_GAP * (BRICK_COLS + 1))) / BRICK_COLS;
        BRICK_H = 22 * scale;
        if (running) initLevel();
        else resetBall();
    }

    function createBricks() {
        bricks = [];
        for (var row = 0; row < BRICK_ROWS; row++) {
            for (var col = 0; col < BRICK_COLS; col++) {
                bricks.push({
                    x: BRICK_GAP + col * (BRICK_W + BRICK_GAP),
                    y: 50 + row * (BRICK_H + BRICK_GAP),
                    w: BRICK_W,
                    h: BRICK_H,
                    color: COLORS[row % COLORS.length],
                    alive: true
                });
            }
        }
    }

    function resetBall() {
        ball.x = W / 2;
        ball.y = H - 80;
        var angle = (Math.random() - 0.5) * 0.8;
        ball.dx = Math.sin(angle) * ball.speed;
        ball.dy = -Math.cos(angle) * ball.speed;
    }

    function initLevel() {
        createBricks();
        paddle.w = Math.max(80, 120 - level * 8);
        paddle.x = (W - paddle.w) / 2;
        resetBall();
        ball.speed = 5 + level * 0.5;
    }

    function drawPaddle() {
        ctx.fillStyle = '#38bdf8';
        ctx.beginPath();
        var x = paddle.x, y = H - paddle.h - 20, w = paddle.w, h = paddle.h, r = 6;
        ctx.moveTo(x + r, y);
        ctx.lineTo(x + w - r, y);
        ctx.quadraticCurveTo(x + w, y, x + w, y + r);
        ctx.lineTo(x + w, y + h - r);
        ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
        ctx.lineTo(x + r, y + h);
        ctx.quadraticCurveTo(x, y + h, x, y + h - r);
        ctx.lineTo(x, y + r);
        ctx.quadraticCurveTo(x, y, x + r, y);
        ctx.fill();
    }

    function drawBall() {
        ctx.fillStyle = '#fbbf24';
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
        ctx.fill();
    }

    function drawBricks() {
        bricks.forEach(function(b) {
            if (!b.alive) return;
            ctx.fillStyle = b.color;
            ctx.fillRect(b.x, b.y, b.w, b.h);
            ctx.strokeStyle = 'rgba(0,0,0,0.2)';
            ctx.lineWidth = 1;
            ctx.strokeRect(b.x, b.y, b.w, b.h);
        });
    }

    function update() {
        if (!running) return;

        ball.x += ball.dx;
        ball.y += ball.dy;

        if (ball.x - ball.r <= 0 || ball.x + ball.r >= W) ball.dx *= -1;
        if (ball.y - ball.r <= 0) ball.dy *= -1;

        var paddleY = H - paddle.h - 20;
        if (ball.dy > 0 && ball.y + ball.r >= paddleY && ball.y - ball.r <= paddleY + paddle.h &&
            ball.x + ball.r >= paddle.x && ball.x - ball.r <= paddle.x + paddle.w) {
            var hitPos = (ball.x - paddle.x) / paddle.w;
            ball.dy = -Math.abs(ball.dy);
            ball.dx = (hitPos - 0.5) * 4;
        } else if (ball.y + ball.r >= H) {
            lives--;
            livesEl.textContent = lives;
            if (lives <= 0) {
                gameOver();
                return;
            }
            resetBall();
            return;
        }

        bricks.forEach(function(b) {
            if (!b.alive) return;
            if (ball.x + ball.r >= b.x && ball.x - ball.r <= b.x + b.w &&
                ball.y + ball.r >= b.y && ball.y - ball.r <= b.y + b.h) {
                b.alive = false;
                score += 10;
                scoreEl.textContent = score;
                ball.dy *= -1;
            }
        });

        var allDead = bricks.every(function(b) { return !b.alive; });
        if (allDead) {
            level++;
            levelEl.textContent = level;
            initLevel();
        }

        var targetX = (mouseX > 0 || mouseX < 0) ? mouseX : W / 2;
        paddle.x = targetX - paddle.w / 2;
        paddle.x = Math.max(0, Math.min(W - paddle.w, paddle.x));
    }

    function draw() {
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(0, 0, W, H);

        drawBricks();
        drawPaddle();
        drawBall();
    }

    function gameLoop() {
        update();
        draw();
        requestAnimationFrame(gameLoop);
    }

    function startGame() {
        score = 0;
        lives = 3;
        level = 1;
        scoreEl.textContent = score;
        livesEl.textContent = lives;
        levelEl.textContent = level;
        overlay.classList.add('hidden');
        running = true;
        initLevel();
    }

    function gameOver() {
        running = false;
        overlay.classList.remove('hidden');
        overlayTitle.textContent = 'המשחק נגמר';
        overlayText.textContent = 'ניקוד סופי: ' + score;
        overlayBtn.textContent = 'שחק שוב';
    }

    function winGame() {
        running = false;
        overlay.classList.remove('hidden');
        overlayTitle.textContent = 'כל הכבוד!';
        overlayText.textContent = 'סיימת את כל השלבים! ניקוד: ' + score;
        overlayBtn.textContent = 'שחק שוב';
    }

    overlayBtn.addEventListener('click', startGame);

    canvas.addEventListener('mousemove', function(e) {
        var rect = canvas.getBoundingClientRect();
        if (rect.width > 0) mouseX = (e.clientX - rect.left) * (W / rect.width);
    });

    canvas.addEventListener('touchmove', function(e) {
        e.preventDefault();
        var rect = canvas.getBoundingClientRect();
        mouseX = (e.touches[0].clientX - rect.left) * (W / rect.width);
    }, { passive: false });

    window.addEventListener('resize', resize);
    resize();
    gameLoop();
})();
