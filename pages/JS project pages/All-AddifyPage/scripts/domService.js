import { User } from './User.js';

const drawTableRows = (users) => {
    const tableBody = document.querySelector('#users-table-body');

    tableBody.innerHTML = '';

    users.forEach((user) => {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${user.firstName}</td>
        <td>${user.lastName}</td>
        <td>${user.email}</td>
        <td>${user.password}</td>
        <td>${user.isLogedIn ? 'מחובר' : 'מנותק'}</td>
        `;
        /*-/ כפתור התנתקות משתמש /-*/
        const logoutBtn = document.createElement('button');
        logoutBtn.textContent = 'התנתקות';
        logoutBtn.addEventListener('click', () => {
            User.logout(user.id);
        });
        /*-/ כפתור מחיקת משתמש /-*/
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'מחיקה';
        deleteBtn.addEventListener('click', () => {
            User.removeUser(user.id);
        });

        /*-/ כפתור עריכת משתמש /-*/
        const editButton = document.createElement('button');
        editButton.textContent = 'עריכה';
        editButton.addEventListener('click', () => {
            // יצירת שדות קלט עם הערכים הנוכחיים של המשתמש
            const firstNameInput = document.createElement('input');
            firstNameInput.value = user.firstName;

            const lastNameInput = document.createElement('input');
            lastNameInput.value = user.lastName;

            const emailInput = document.createElement('input');
            emailInput.value = user.email;

            const passwordInput = document.createElement('input');
            passwordInput.value = user.password;

            // יצירת כפתור שמאשר את העריכות
            const saveButton = document.createElement('button');
            saveButton.textContent = 'שמור';

            // כפתור שמבטל את העריכות ומחזיר את המשתמש למצב הקודם
            const cancelButton = document.createElement('button');
            cancelButton.textContent = 'ביטול';

            // הוספת שדות הקלט והכפתורים לשורה
            row.innerHTML = ''; // לנקות את התוכן הקודם של השורה
            row.appendChild(firstNameInput);
            row.appendChild(lastNameInput);
            row.appendChild(emailInput);
            row.appendChild(passwordInput);
            row.appendChild(saveButton);
            row.appendChild(cancelButton);

            // שמירה של העריכות כאשר לוחצים על כפתור 'שמור'
            saveButton.addEventListener('click', () => {
                user.firstName = firstNameInput.value;
                user.lastName = lastNameInput.value;
                user.email = emailInput.value;
                user.password = passwordInput.value;

                // עדכון התצוגה
                tableBody.innerHTML = ''; // לנקות את התוכן הקודם בטבלה
                users.forEach((user) => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                    <td>${user.firstName}</td>
                    <td>${user.lastName}</td>
                    <td>${user.email}</td>
                    <td>${user.password}</td>
                    <td>${user.isLogedIn ? 'מחובר' : 'מנותק'}</td>
                    `;
                    row.appendChild(logoutBtn);
                    row.appendChild(deleteBtn);
                    row.appendChild(editButton);
                    tableBody.appendChild(row);
                });
            });

            // ביטול העריכות כאשר לוחצים על כפתור 'ביטול'
            cancelButton.addEventListener('click', () => {
                // פשוט מחזירים את השורה למצב הקודם שלה
                row.innerHTML = `
                <td>${user.firstName}</td>
                <td>${user.lastName}</td>
                <td>${user.email}</td>
                <td>${user.password}</td>
                <td>${user.isLogedIn ? 'מחובר' : 'מנותק'}</td>
                `;
                row.appendChild(logoutBtn);
                row.appendChild(deleteBtn);
                row.appendChild(editButton);
            });
        });

        /*--*/

        row.appendChild(logoutBtn);
        row.appendChild(deleteBtn);
        row.appendChild(editButton);
        tableBody.appendChild(row);
    });
};

const registerForm = document.querySelector('.register-form');
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const firstName = e.target.elements.firstName.value;
    const lastName = e.target.elements.lastName.value;
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;

    const users = User.usersList;

    if (users.find((user) => user.email === email)) {
        alert('משתמש עם כתובת דוא"ל זו כבר קיים');
        return;
    }
    new User(firstName, lastName, email, password);
    e.target.reset();
});

const loginForm = document.querySelector('.login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;

    const user = User.usersList.find((user) => user.email === email);
    if (user && user.password === password) {
        User.login(user.id);
        e.target.reset();
    } else {
        alert('שם משתמש או סיסמה לא נכונים');
    }
});

export { drawTableRows, registerForm, loginForm };