// איסוף כל הכפתורים
const Btns = document.querySelectorAll("button");

// הוספת מאזין לחיצה לכל כפתור
Btns.forEach((btn) => {
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

function calculate() {
    const valueEl = document.querySelector(".value");
    const result = safeCalculate(valueEl.textContent);
    valueEl.textContent = (result !== null && !isNaN(result)) ? String(result) : "Error";
}

function clear() {
    const valueEl = document.querySelector(".value");
    valueEl.textContent = "";
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
        // ניקוי המסך
        clear();
    } else if (event.key === "Enter") {
        // חישוב תוצאה
        calculate();
    } else if (event.key === "%") {
        // חישוב אחוז
        calculatePercent();
    }
});
