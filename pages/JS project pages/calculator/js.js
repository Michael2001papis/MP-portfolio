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

// פונקציה לחישוב תוצאה
function calculate() {
    const valueEl = document.querySelector(".value");
    
    try {
        valueEl.textContent = eval(valueEl.textContent) || "0";
    } catch {
        valueEl.textContent = "Error";
    }
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
