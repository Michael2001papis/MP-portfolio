
const username = document.getElementById('username');
const usernameHelper = document.getElementById('username-helper');
const email = document.getElementById('email');
const emailHelper = document.getElementById('email-helper');
const password = document.getElementById('password');
const submitButton = document.querySelector('input[type="submit"]');

// יצירת פסקה דינאמית להודעות שגיאה עבור הסיסמה
const passwordHelper = document.createElement('p');
passwordHelper.id = 'password-helper';
password.insertAdjacentElement('afterend', passwordHelper);

// פונקציה שמעדכנת אם הכפתור "שלח" יהיה זמין או לא
function checkFormValidity() {
    const usernameValid = username.value.length >= 3;
    const emailValid = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email.value);
    const passwordValid = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(password.value);

    // אם כל השדות תקינים, הכפתור יהיה זמין
    if (usernameValid && emailValid && passwordValid) {
        submitButton.disabled = false;  // הופך את כפתור שלח לזמין
    } else {
        submitButton.disabled = true;   // הופך את כפתור שלח ללא זמין
    }
}
// בדיקת תקינות שם המשתמש
username.addEventListener('input', (e) => {
    const value = e.target.value;
    if (value.length < 3) {
        usernameHelper.innerText = 'Username must be at least 3 characters long';
        if (!username.classList.contains('error')) {
            username.classList.add('error');
        }
    } else {
        usernameHelper.innerText = '';
        username.classList.remove('error');
    }
    checkFormValidity();
});
// בדיקת תקינות כתובת האימייל
email.addEventListener('input', (e) => {
    const value = e.target.value;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if (!emailRegex.test(value)) {
        emailHelper.innerText = 'Email must be a valid email address';
        if (!email.classList.contains('error')) {
            email.classList.add('error');
        }
    } else {
        emailHelper.innerText = '';
        email.classList.remove('error');
    }
    checkFormValidity();
});
// בדיקת תקינות הסיסמה
password.addEventListener('input', (e) => {
    const value = e.target.value;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

    if (!passwordRegex.test(value)) {
        passwordHelper.innerText =
            'Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a digit, and a special character (!@#$%^&*).';
        if (!password.classList.contains('error')) {
            password.classList.add('error');
        }
    } else {
        passwordHelper.innerText = '';
        password.classList.remove('error');
    }
    checkFormValidity();
});
