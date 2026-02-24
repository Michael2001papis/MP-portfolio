
let turn = true;
let btnClicked = 0;
let btns = document.querySelectorAll(".btn");
let vsComputer = false;
let difficulty = 'normal';

document.getElementById('gameMode').addEventListener('change', function() {
    vsComputer = this.value === 'pvc';
    document.getElementById('diffWrap').style.display = vsComputer ? 'inline' : 'none';
});
document.getElementById('difficulty').addEventListener('change', function() { difficulty = this.value; });

btns.forEach(function(b) { b.addEventListener("click", btnClick); });

function btnClick() {
    if (this.textContent != "") return;
    btnClicked++;
    if (turn) this.textContent = "X";
    else this.textContent = "0";

    var obj = checkWin();
    if (obj.win) {
        var btnsArr = document.querySelectorAll(".btn");
        btnsArr[obj.pos[0]].style.color = "red";
        btnsArr[obj.pos[1]].style.color = "red";
        btnsArr[obj.pos[2]].style.color = "red";
        setTimeout(function() {
            alert((turn ? "X" : "0") + " ניצח!");
            reset();
        }, 100);
        return;
    } else if (obj.isTie) {
        setTimeout(function() {
            alert("תיקו!");
            reset();
        }, 100);
        return;
    }

    turn = !turn;
    if (vsComputer && !turn) setTimeout(computerMove, 300);
}

function getBoard() {
    var b = document.querySelectorAll(".btn");
    return Array.from(b).map(function(x) { return x.textContent; });
}

function computerMove() {
    var board = getBoard();
    var empty = [];
    for (var i = 0; i < 9; i++) if (board[i] === "") empty.push(i);
    if (empty.length === 0) return;

    var move = -1;
    if (difficulty === 'hard' || difficulty === 'normal') {
        move = findBestMove(board, "0");
        if (move < 0) move = findBestMove(board, "X");
        if (move < 0 && board[4] === "") move = 4;
    }
    if (difficulty === 'easy' || move < 0) {
        move = empty[Math.floor(Math.random() * empty.length)];
    }

    if (move >= 0) {
        var cell = document.querySelectorAll(".btn")[move];
        if (cell.textContent === "") {
            cell.textContent = "0";
            btnClicked++;
            var obj = checkWin();
            if (obj.win) {
                var btnsArr = document.querySelectorAll(".btn");
                btnsArr[obj.pos[0]].style.color = "red";
                btnsArr[obj.pos[1]].style.color = "red";
                btnsArr[obj.pos[2]].style.color = "red";
                setTimeout(function() { alert("המחשב ניצח!"); reset(); }, 100);
                return;
            } else if (obj.isTie) {
                setTimeout(function() { alert("תיקו!"); reset(); }, 100);
                return;
            }
            turn = true;
        }
    }
}

function findBestMove(board, sym) {
    var lines = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    for (var i = 0; i < lines.length; i++) {
        var a = lines[i][0], b = lines[i][1], c = lines[i][2];
        var count = (board[a] === sym ? 1 : 0) + (board[b] === sym ? 1 : 0) + (board[c] === sym ? 1 : 0);
        var empty = -1;
        if (board[a] === "") empty = a; else if (board[b] === "") empty = b; else if (board[c] === "") empty = c;
        if (count === 2 && empty >= 0) return empty;
    }
    return -1;
}

function reset() {
    var btnsArr = document.querySelectorAll(".btn");
    turn = true;
    btnClicked = 0;
    btnsArr.forEach(function(b) {
        b.textContent = "";
        b.style.color = "";
    });
}

function checkWin() {
    var btnsArr = document.querySelectorAll(".btn");
    var obj = { win: false, isTie: false, pos: [] };
    var lines = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    for (var i = 0; i < lines.length; i++) {
        var a = lines[i][0], b = lines[i][1], c = lines[i][2];
        if (btnsArr[a].textContent && btnsArr[a].textContent === btnsArr[b].textContent && btnsArr[b].textContent === btnsArr[c].textContent) {
            obj = { win: true, isTie: false, pos: [a, b, c] };
            return obj;
        }
    }
    if (btnClicked === 9) obj.isTie = true;
    return obj;
}

document.getElementById("homeButton").addEventListener("click", function() {
    window.location.href = "/index.html";
});
document.getElementById("restartButton").addEventListener("click", reset);
