// פונקציית חיפוש שתעביר את המשתמש לחלק המתאים או לעמוד פרויקט
var sections = {
    "תפריט": "#main",
    "היכולות שלי": "#skis",
    "HTML": "#shesh",
    "JS": "#shesh-additional",
    "צור קשר": "#CU"
};
var projectLinks = {
    "ברוכים הבאים לעולם הרפואה": "/pages/LandingPage/העמוד מקור להרפוא .HTML",
    "Microsoft": "/pages/LandingPage/העמוד מקור למיינקרוסופט .HTML",
    "אפל": "/pages/LandingPage/העמוד מקוד אפל .HTML",
    "צהל": "/pages/LandingPage/העמוד מקור של צהל .HTML",
    "חלל": "/pages/LandingPage/עמוד מקור לחלל .HTML",
    "AI": "/pages/LandingPage/העמוד מקור AI.HTML",
    "Users Mangement": "/pages/LandingPageJS/index02UsersMangement.html",
    "Countries of the world": "/pages/LandingPageJS/index01CountriesProject.html",
    "Conference": "/pages/LandingPageJS/index04UserLogin.html",
    "Memory Game": "/pages/LandingPageJS/index03MemoryGame.html",
    "Tic-Tac-Toe": "/pages/LandingPageJS/index06tic-tac-toe.html",
    "Trivia play": "/pages/LandingPageJS/index05Triviaplay.html",
    "Table Tennis": "/pages/LandingPageJS/index08TableTennis.html",
    "Snakegame Nokia 6110": "/pages/LandingPageJS/index07Snakegame.html",
    "Calculator": "/pages/LandingPageJS/index09calculator.html"
};

function searchFunction() {
    var input = document.getElementById('search');
    var query = (input && input.value || '').toLowerCase().trim();
    if (!query) return;

    for (var key in sections) {
        if (key.toLowerCase().includes(query)) {
            window.location.hash = sections[key];
            return;
        }
    }
    for (var key in projectLinks) {
        if (key.toLowerCase().includes(query)) {
            window.location.href = projectLinks[key];
            return;
        }
    }
}

document.getElementById('search').addEventListener('input', function() {
    searchFunction();
});

document.getElementById('search').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        searchFunction();
    }
});

// טופס צור קשר - הודעת אישור
document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            var msg = document.getElementById('form-message');
            if (msg) {
                msg.textContent = 'הטופס נקלט. תודה!';
                msg.style.color = '#4CAF50';
                msg.style.marginTop = '10px';
            }
            var nameInput = document.getElementById('contact-name');
            var emailInput = document.getElementById('contact-email');
            var phoneInput = document.getElementById('contact-phone');
            if (nameInput) nameInput.value = '';
            if (emailInput) emailInput.value = '';
            if (phoneInput) phoneInput.value = '';
        });
    }
});

// כפתור חזרה למעלה
(function() {
    var btn = document.getElementById('back-to-top');
    if (btn) {
        window.addEventListener('scroll', function() {
            btn.style.display = (window.scrollY > 300) ? 'block' : 'none';
        });
        btn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        btn.style.display = 'none';
    }
})();

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

