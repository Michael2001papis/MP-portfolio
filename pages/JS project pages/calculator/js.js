// איסוף כל הכפתורים
const Btns = document.querySelectorAll("button");

// הוספת מאזין לחיצה לכל כפתור (מלבד backspace, CA, %, =, נוסחאות)
Btns.forEach((btn) => {
    if (btn.id === "backspaceBtn" || btn.id === "cleanAll" || btn.id === "percent" || btn.id === "Equality" || btn.classList.contains("formula-btn")) return;
    btn.addEventListener("click", btnClick);
});

// משתנה לכפתור "ניקוי המסך"
const cleanAll = document.querySelector("#cleanAll");
cleanAll.removeEventListener("click", btnClick); // הסרת מאזין מיותר
cleanAll.addEventListener("click", clear);

// משתנה לכפתור "תוצאה"
const Equality = document.querySelector("#Equality");
Equality.removeEventListener("click", btnClick); // הסרת מאזין מיותר
Equality.addEventListener("click", calculate);

// משתנה לכפתור "אחוז"
const Percent = document.querySelector("#percent");
Percent.addEventListener("click", calculatePercent);

// כפתור מחיקת ספרה בודדת
const backspaceBtn = document.querySelector("#backspaceBtn");
if (backspaceBtn) backspaceBtn.addEventListener("click", backspace);

// נוסחאות מוכנות
document.querySelectorAll(".formula-btn").forEach(function(btn) {
    btn.addEventListener("click", function() {
        var v = document.querySelector(".value");
        var n = parseFloat(v.textContent);
        if (isNaN(n)) return;
        var f = this.getAttribute("data-formula");
        if (f === "*0.15") v.textContent = (n * 0.15).toString();
        else if (f === "*0.2") v.textContent = (n * 0.2).toString();
        else if (f === "*1.17") v.textContent = (n * 1.17).toString();
    });
});

// פונקציה לחישוב תוצאה (ללא eval - חישוב בטוח)
function safeCalculate(expr) {
    expr = expr.replace(/\s/g, '');
    if (!/^[\d.+\-*/()\s]+$/.test(expr)) return null;
    try {
        const tokens = expr.match(/(\d+\.?\d*|[+\-*/()])/g) || [];
        let i = 0;
        function parseExpr() {
            let left = parseTerm();
            while (tokens[i] === '+' || tokens[i] === '-') {
                const op = tokens[i++];
                const right = parseTerm();
                left = op === '+' ? left + right : left - right;
            }
            return left;
        }
        function parseTerm() {
            let left = parseFactor();
            while (tokens[i] === '*' || tokens[i] === '/') {
                const op = tokens[i++];
                const right = parseFactor();
                left = op === '*' ? left * right : left / right;
            }
            return left;
        }
        function parseFactor() {
            if (i >= tokens.length) return 0;
            if (tokens[i] === '(') {
                i++;
                const val = parseExpr();
                if (tokens[i] === ')') i++;
                return val;
            }
            const n = parseFloat(tokens[i++]);
            return isNaN(n) ? 0 : n;
        }
        return parseExpr();
    } catch {
        return null;
    }
}

var calcHistory = [];

function calculate() {
    const valueEl = document.querySelector(".value");
    const expr = valueEl.textContent;
    const result = safeCalculate(expr);
    if (result !== null && !isNaN(result)) {
        calcHistory.push(expr + " = " + result);
        updateHistoryDisplay();
        valueEl.textContent = String(result);
    } else {
        valueEl.textContent = "Error";
    }
}

function clear() {
    const valueEl = document.querySelector(".value");
    valueEl.textContent = "";
}

function backspace() {
    const valueEl = document.querySelector(".value");
    valueEl.textContent = valueEl.textContent.slice(0, -1);
}

function updateHistoryDisplay() {
    var hist = document.getElementById("calc-history");
    if (!hist) return;
    if (calcHistory.length === 0) {
        hist.style.display = "none";
        return;
    }
    hist.style.display = "block";
    hist.innerHTML = "<div class='hist-header'><span>היסטוריית חישובים</span><button type='button' id='clearHist'>ניקוי</button></div><ul>" +
        calcHistory.slice(-8).reverse().map(function(h) { return "<li>" + h + "</li>"; }).join("") + "</ul>";
    var clearBtn = document.getElementById("clearHist");
    if (clearBtn) clearBtn.onclick = function() { calcHistory = []; updateHistoryDisplay(); };
}

function btnClick() {
    const valueEl = document.querySelector(".value");
    valueEl.textContent += this.textContent;
}

// פונקציה לחישוב אחוז 
function calculatePercent() {
    let valueEl = document.querySelector(".value");
    let currentValue = parseFloat(valueEl.textContent);

    if (!isNaN(currentValue)) {
        valueEl.textContent = (currentValue / 100).toString();
    } else {
        valueEl.textContent = "Error";
    }
}

// הוספת האזנה למקלדת
document.addEventListener("keydown", (event) => {
    const valueEl = document.querySelector(".value");

    // בדיקת סוג המקש שנלחץ
    if (event.key >= 0 && event.key <= 9 || event.key === "." || event.key === "(" || event.key === ")") {
        // הוספת ספרה או נקודה
        valueEl.textContent += event.key;
    } else if (event.key === "+" || event.key === "-" || event.key === "*" || event.key === "/") {
        // הוספת סימן חישוב
        valueEl.textContent += event.key;
    } else if (event.key === "Backspace") {
        event.preventDefault();
        backspace();
    } else if (event.key === "Enter") {
        // חישוב תוצאה
        calculate();
    } else if (event.key === "%") {
        // חישוב אחוז
        calculatePercent();
    }
});
