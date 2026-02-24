const WIN_LINES = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
const SYM_X = "X";
const SYM_O = "O";

let turn = true;
let btnClicked = 0;
let vsComputer = false;
let difficulty = 'normal';
let isComputerThinking = false;
let score = { X: 0, O: 0, tie: 0 };
let moveHistory = [];
let soundOn = true;

function loadScore() {
    try {
        const s = JSON.parse(localStorage.getItem('ttt-score') || '{}');
        score = { X: s.X || 0, O: s.O || 0, tie: s.tie || 0 };
    } catch (_) {}
    updateScoreDisplay();
}
function saveScore() {
    localStorage.setItem('ttt-score', JSON.stringify(score));
    updateScoreDisplay();
}
function updateScoreDisplay() {
    document.getElementById('scoreX').textContent = score.X;
    document.getElementById('scoreO').textContent = score.O;
    document.getElementById('scoreTie').textContent = score.tie;
}

const btns = document.querySelectorAll(".btn");
const statusEl = document.getElementById('gameStatus');
const tictactoeEl = document.querySelector('.tictactoe');

document.getElementById('gameMode').addEventListener('change', function() {
    vsComputer = this.value === 'pvc';
    const diffWrap = document.getElementById('diffWrap');
    if (diffWrap) diffWrap.classList.toggle('visible', vsComputer);
    reset();
});
document.getElementById('difficulty').addEventListener('change', function() {
    difficulty = this.value;
});

btns.forEach((b, i) => {
    b.setAttribute('data-index', i);
    b.setAttribute('aria-label', `תא ${i + 1}`);
    b.addEventListener("click", btnClick);
});

function updateStatus(msg) {
    if (statusEl) statusEl.textContent = msg;
}

function setBoardInteractive(active) {
    tictactoeEl?.classList.toggle('disabled', !active);
    btns.forEach(b => {
        b.disabled = !active;
        b.setAttribute('aria-disabled', !active);
    });
}

function getBoard() {
    return Array.from(btns).map(x => (x.textContent || "").trim());
}

function checkWin() {
    const obj = { win: false, isTie: false, pos: [] };
    for (const [a, b, c] of WIN_LINES) {
        const va = (btns[a].textContent || "").trim();
        const vb = (btns[b].textContent || "").trim();
        const vc = (btns[c].textContent || "").trim();
        if (va && va === vb && vb === vc) {
            obj.win = true;
            obj.pos = [a, b, c];
            return obj;
        }
    }
    if (btnClicked === 9) obj.isTie = true;
    return obj;
}

function highlightWinningLine(pos) {
    pos.forEach(i => btns[i].classList.add('winning'));
}

function showResult(msg) {
    updateStatus(msg);
    showModal(msg);
}

function showModal(msg) {
    const overlay = document.getElementById('resultOverlay');
    const textEl = document.getElementById('resultText');
    const closeBtn = document.getElementById('resultCloseBtn');
    if (overlay && textEl) {
        textEl.textContent = msg;
        overlay.classList.add('visible');
        closeBtn?.focus();
    } else {
        setTimeout(() => { alert(msg); reset(); }, 150);
    }
}

function closeModal() {
    reset();
}

function playWinSound() {
    if (!soundOn) return;
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.setValueAtTime(523, ctx.currentTime);
        osc.frequency.setValueAtTime(659, ctx.currentTime + 0.1);
        osc.frequency.setValueAtTime(784, ctx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.3);
    } catch (_) {}
}

function endTurn(result) {
    if (result.win) {
        highlightWinningLine(result.pos);
        const winner = turn ? SYM_X : SYM_O;
        score[winner]++;
        saveScore();
        document.body.classList.add('win-flash');
        setTimeout(() => document.body.classList.remove('win-flash'), 400);
        playWinSound();
        showResult(vsComputer && !turn ? "המחשב ניצח!" : winner + " ניצח!");
        return true;
    }
    if (result.isTie) {
        score.tie++;
        saveScore();
        showResult("תיקו!");
        return true;
    }
    return false;
}

function btnClick() {
    if ((this.textContent || "").trim() !== "" || isComputerThinking) return;
    const idx = Array.from(btns).indexOf(this);
    btnClicked++;
    this.textContent = turn ? SYM_X : SYM_O;
    this.classList.add('played');
    moveHistory.push(idx);

    const result = checkWin();
    if (endTurn(result)) return;

    turn = !turn;
    updateStatus(turn ? "תור X" : "תור O");
    if (vsComputer && !turn) {
        isComputerThinking = true;
        setBoardInteractive(false);
        updateStatus("המחשב חושב...");
        setTimeout(computerMove, 400);
    }
}

function findBestMove(board, sym) {
    for (const [a, b, c] of WIN_LINES) {
        const count = (board[a] === sym ? 1 : 0) + (board[b] === sym ? 1 : 0) + (board[c] === sym ? 1 : 0);
        let empty = -1;
        if (board[a] === "") empty = a; else if (board[b] === "") empty = b; else if (board[c] === "") empty = c;
        if (count === 2 && empty >= 0) return empty;
    }
    return -1;
}

function evalBoard(board) {
    for (const [a, b, c] of WIN_LINES) {
        if (board[a] && board[a] === board[b] && board[b] === board[c])
            return board[a] === SYM_O ? 1 : -1;
    }
    return 0;
}

function minimax(board, depth, isMax) {
    const evalScore = evalBoard(board);
    if (evalScore !== 0) return evalScore;
    const empty = board.map((v, i) => v === "" ? i : -1).filter(i => i >= 0);
    if (empty.length === 0) return 0;
    if (isMax) {
        let best = -Infinity;
        for (const i of empty) {
            board[i] = SYM_O;
            best = Math.max(best, minimax(board, depth + 1, false));
            board[i] = "";
        }
        return best;
    } else {
        let best = Infinity;
        for (const i of empty) {
            board[i] = SYM_X;
            best = Math.min(best, minimax(board, depth + 1, true));
            board[i] = "";
        }
        return best;
    }
}

function getMinimaxMove(board) {
    const empty = board.map((v, i) => v === "" ? i : -1).filter(i => i >= 0);
    let bestMove = -1, bestScore = -Infinity;
    for (const i of empty) {
        board[i] = SYM_O;
        const score = minimax(board, 0, false);
        board[i] = "";
        if (score > bestScore) { bestScore = score; bestMove = i; }
    }
    return bestMove;
}

function computerMove() {
    const board = getBoard();
    const empty = board.map((v, i) => v === "" ? i : -1).filter(i => i >= 0);
    if (empty.length === 0) {
        isComputerThinking = false;
        setBoardInteractive(true);
        return;
    }

    let move = -1;
    if (difficulty === 'hard') {
        move = getMinimaxMove([...board]);
    } else if (difficulty === 'normal') {
        move = findBestMove(board, SYM_O);
        if (move < 0) move = findBestMove(board, SYM_X);
        if (move < 0 && board[4] === "") move = 4;
    }
    if (difficulty === 'easy' || move < 0) {
        move = empty[Math.floor(Math.random() * empty.length)];
    }

    if (move >= 0 && (btns[move].textContent || "").trim() === "") {
        btns[move].textContent = SYM_O;
        btns[move].classList.add('played');
        btnClicked++;
        moveHistory.push(move);

        const result = checkWin();
        if (endTurn(result)) {
            isComputerThinking = false;
            setBoardInteractive(true);
            return;
        }
        turn = true;
        updateStatus("תור X");
    }
    isComputerThinking = false;
    setBoardInteractive(true);
}

function reset() {
    turn = true;
    btnClicked = 0;
    moveHistory = [];
    isComputerThinking = false;
    setBoardInteractive(true);
    document.getElementById('resultOverlay')?.classList.remove('visible');
    btns.forEach(b => {
        b.textContent = "";
        b.classList.remove('played', 'winning');
    });
    updateStatus("תור X");
}

function resetScore() {
    score = { X: 0, O: 0, tie: 0 };
    saveScore();
}

function undo() {
    if (moveHistory.length === 0 || isComputerThinking) return;
    const idx = moveHistory.pop();
    btns[idx].textContent = "";
    btns[idx].classList.remove('played', 'winning');
    btnClicked--;
    turn = !turn;
    updateStatus(turn ? "תור X" : "תור O");
}

document.getElementById("homeButton")?.addEventListener("click", () => {
    window.location.href = "/index.html";
});
document.getElementById("restartButton")?.addEventListener("click", reset);
document.getElementById("resetScoreBtn")?.addEventListener("click", resetScore);
document.getElementById("undoBtn")?.addEventListener("click", undo);

document.getElementById("soundOn")?.addEventListener("change", (e) => {
    soundOn = e.target.checked;
    try { localStorage.setItem('ttt-sound', soundOn); } catch (_) {}
});

document.addEventListener("keydown", (e) => {
    if (e.key === "r" || e.key === "R") { e.preventDefault(); reset(); }
    if (e.key === "z" && e.ctrlKey) { e.preventDefault(); undo(); }
});

(function initSound() {
    try { soundOn = localStorage.getItem('ttt-sound') !== 'false'; } catch (_) {}
    const cb = document.getElementById("soundOn");
    if (cb) cb.checked = soundOn;
})();

document.getElementById("resultCloseBtn")?.addEventListener("click", closeModal);
document.getElementById("resultOverlay")?.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
});
document.getElementById("resultOverlay")?.addEventListener("click", (e) => {
    if (e.target.id === "resultOverlay") closeModal();
});

loadScore();
