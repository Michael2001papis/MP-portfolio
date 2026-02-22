// פונקציית חיפוש שתעביר את המשתמש לחלק המתאים או לעמוד פרויקט
document.getElementById('search').addEventListener('input', function() {
    let query = this.value.toLowerCase(); // מקבל את הטקסט שהוזן
    let sections = {
        "תפריט": "#main",
        "היכולות שלי": "#skis",
        "HTML": "#shesh",
        "JS" : "#shesh-additional",
        "צור קשר": "#CU"
    };
    let projectLinks = {
        "  ברוכים הבאים לעולם הרפואה ": "./pages/LandingPage/העמוד מקור להרפוא .HTML",
        "Microsoft": "../pages/LandingPage/העמוד מקור למיינקרוסופט .HTML",
        " אפל ": "../pages/LandingPage/העמוד מקוד אפל .HTML",
        "צהל": "../pages/LandingPage/העמוד מקור של צהל .HTML",

        "  חלל  ": "../pages/LandingPage/עמוד מקור לחלל .HTML",
        " AI ": "../pages/LandingPage/העמוד מקור AI.HTML",
        "  Users Mangement  ": "/pages/LandingPageJS/index02UsersMangement.html",
        "  Countries of the world  ": "/pages/LandingPageJS/index01CountriesProject.html",
        "  Conference  ": "/pages/LandingPageJS/index04UserLogin.html",
        "  Memory Game  ": "/pages/LandingPageJS/index03MemoryGame.html",
        "  Tic-Tac-Toe  ": "/pages/LandingPageJS/index06tic-tac-toe.html",
        "  Trivia play  ": "/pages/LandingPageJS/index05Triviaplay.html",
        "  Table Tennis  ": "/pages/LandingPageJS/index08TableTennis.html",
        "  Snakegame Nokia 6110  ": "/pages/LandingPageJS/index07Snakegame.html",
        "  Calculator  ": "/pages/LandingPageJS/index09calculator.html"
    };

    // חיפוש לחלק פנימי בדף
    let foundSection = false;
    for (let key in sections) {
        if (key.toLowerCase().includes(query)) {
            window.location.hash = sections[key]; 
            foundSection = true; 
            break;
        }
    }

    // אם לא נמצא חלק פנימי בדף, נבדוק אם יש התאמה לעמוד פרויקט חיצוני
    if (!foundSection) {
        for (let key in projectLinks) {
            if (key.toLowerCase().includes(query)) {
                window.location.href = projectLinks[key]; 
                break;
            }
        }
    }
});

document.getElementById('show-more').addEventListener('click', function() {
    const additionalProjects = document.getElementById('additional-projects');
    if (additionalProjects.style.display === "none" || additionalProjects.style.display === "") {
        additionalProjects.style.display = "flex"; 
        this.innerText = "הסתר פרויקטים נוספים"; 
    } else {
        additionalProjects.style.display = "none"; 
        this.innerText = "הצג עוד פרויקטים"; 
    }
});

