import { User } from './User.js';

const clearErrors = (form) => {
    form.querySelectorAll('.field-error').forEach(el => { el.textContent = ''; });
    form.querySelectorAll('input').forEach(el => el.classList.remove('error'));
};

const showFieldError = (fieldId, message) => {
    const input = document.getElementById(fieldId);
    const errorEl = document.getElementById(fieldId + '-error');
    if (input) input.classList.add('error');
    if (errorEl) errorEl.textContent = message;
};

const drawTableRows = (users) => {
    const tableBody = document.querySelector('#users-table-body');
    const cardsContainer = document.querySelector('#users-cards');
    if (!tableBody) return;

    tableBody.innerHTML = '';
    if (cardsContainer) cardsContainer.innerHTML = '';

    users.forEach((user) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.firstName}</td>
            <td>${user.lastName}</td>
            <td>${user.email}</td>
            <td>${user.isLogedIn ? 'מחובר' : 'מנותק'}</td>
            <td class="actions-cell"></td>
        `;

        const actionsCell = row.querySelector('.actions-cell');
        const logoutBtn = document.createElement('button');
        logoutBtn.className = 'btn-action btn-logout';
        logoutBtn.textContent = 'התנתקות';
        logoutBtn.addEventListener('click', () => User.logout(user.id));

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn-action btn-delete';
        deleteBtn.textContent = 'מחיקה';
        deleteBtn.addEventListener('click', () => User.removeUser(user.id));

        const editButton = document.createElement('button');
        editButton.className = 'btn-action btn-edit';
        editButton.textContent = 'עריכה';
        editButton.addEventListener('click', () => {
            const firstNameInput = document.createElement('input');
            firstNameInput.value = user.firstName;
            firstNameInput.className = 'edit-input';

            const lastNameInput = document.createElement('input');
            lastNameInput.value = user.lastName;
            lastNameInput.className = 'edit-input';

            const emailInput = document.createElement('input');
            emailInput.type = 'email';
            emailInput.value = user.email;
            emailInput.className = 'edit-input';

            const passwordInput = document.createElement('input');
            passwordInput.type = 'password';
            passwordInput.placeholder = 'השאר ריק לשימור';
            passwordInput.className = 'edit-input';

            const saveButton = document.createElement('button');
            saveButton.className = 'btn-action btn-edit';
            saveButton.textContent = 'שמור';

            const cancelButton = document.createElement('button');
            cancelButton.className = 'btn-action btn-logout';
            cancelButton.textContent = 'ביטול';

            row.innerHTML = `
                <td></td><td></td><td></td><td></td><td></td>
            `;
            const cells = row.querySelectorAll('td');
            cells[0].appendChild(firstNameInput);
            cells[1].appendChild(lastNameInput);
            cells[2].appendChild(emailInput);
            cells[3].appendChild(passwordInput);
            cells[4].appendChild(saveButton);
            cells[4].appendChild(cancelButton);

            saveButton.addEventListener('click', () => {
                user.firstName = firstNameInput.value.trim();
                user.lastName = lastNameInput.value.trim();
                user.email = emailInput.value.trim();
                if (passwordInput.value) user.password = passwordInput.value;
                localStorage.setItem('users', JSON.stringify(User.usersList));
                drawTableRows(User.usersList);
            });

            cancelButton.addEventListener('click', () => drawTableRows(User.usersList));
        });

        actionsCell.appendChild(logoutBtn);
        actionsCell.appendChild(deleteBtn);
        actionsCell.appendChild(editButton);
        tableBody.appendChild(row);

        if (cardsContainer) {
            const card = document.createElement('div');
            card.className = 'user-card';
            const renderCard = () => {
                card.innerHTML = `
                    <div class="user-name">${user.firstName} ${user.lastName}</div>
                    <div class="user-email">${user.email}</div>
                    <div class="user-status">${user.isLogedIn ? 'מחובר' : 'מנותק'}</div>
                    <div class="card-actions"></div>
                `;
                const ca = card.querySelector('.card-actions');
                const mk = (txt, cls, fn) => {
                    const b = document.createElement('button');
                    b.className = 'btn-action ' + cls;
                    b.textContent = txt;
                    b.addEventListener('click', fn);
                    return b;
                };
                ca.appendChild(mk('התנתקות', 'btn-logout', () => { User.logout(user.id); }));
                ca.appendChild(mk('מחיקה', 'btn-delete', () => User.removeUser(user.id)));
                ca.appendChild(mk('עריכה', 'btn-edit', () => {
                    card.innerHTML = `
                        <input type="text" class="edit-input" value="${user.firstName}" placeholder="שם פרטי" id="c-fn-${user.id}">
                        <input type="text" class="edit-input" value="${user.lastName}" placeholder="שם משפחה" id="c-ln-${user.id}">
                        <input type="email" class="edit-input" value="${user.email}" placeholder="אימייל" id="c-em-${user.id}">
                        <input type="password" class="edit-input" placeholder="סיסמא (ריק=שימור)" id="c-pw-${user.id}">
                        <div class="card-actions"></div>
                    `;
                    const saveBtn = document.createElement('button');
                    saveBtn.className = 'btn-action btn-edit';
                    saveBtn.textContent = 'שמור';
                    saveBtn.addEventListener('click', () => {
                        user.firstName = document.getElementById('c-fn-' + user.id)?.value?.trim() || user.firstName;
                        user.lastName = document.getElementById('c-ln-' + user.id)?.value?.trim() || user.lastName;
                        user.email = document.getElementById('c-em-' + user.id)?.value?.trim() || user.email;
                        const pw = document.getElementById('c-pw-' + user.id)?.value;
                        if (pw) user.password = pw;
                        localStorage.setItem('users', JSON.stringify(User.usersList));
                        renderCard();
                    });
                    const cancelBtn = document.createElement('button');
                    cancelBtn.className = 'btn-action btn-logout';
                    cancelBtn.textContent = 'ביטול';
                    cancelBtn.addEventListener('click', renderCard);
                    card.querySelector('.card-actions').append(saveBtn, cancelBtn);
                }));
            };
            renderCard();
            cardsContainer.appendChild(card);
        }
    });
};

const registerForm = document.querySelector('.register-form');
if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        clearErrors(registerForm);

        const firstName = e.target.elements.firstName.value.trim();
        const lastName = e.target.elements.lastName.value.trim();
        const email = e.target.elements.email.value.trim();
        const password = e.target.elements.password.value;

        let hasError = false;
        if (!firstName) {
            showFieldError('firstName', 'נא להזין שם פרטי');
            hasError = true;
        }
        if (!lastName) {
            showFieldError('lastName', 'נא להזין שם משפחה');
            hasError = true;
        }
        if (!email) {
            showFieldError('register-email', 'נא להזין אימייל');
            hasError = true;
        }
        if (password.length < 8) {
            showFieldError('register-password', 'סיסמא חייבת להכיל לפחות 8 תווים');
            hasError = true;
        }
        if (hasError) return;

        if (User.usersList.find((u) => u.email === email)) {
            showFieldError('register-email', 'משתמש עם כתובת דוא"ל זו כבר קיים');
            return;
        }

        const submitBtn = document.getElementById('register-submit');
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'מבצע...';
        }

        await new Promise((r) => setTimeout(r, 400));
        new User(firstName, lastName, email, password);

        const successEl = document.getElementById('register-success');
        if (successEl) successEl.textContent = 'Account created successfully';

        e.target.reset();
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = 'הרשם';
        }

        setTimeout(() => {
            if (successEl) successEl.textContent = '';
        }, 3000);
    });
}

const loginForm = document.querySelector('.login-form');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        clearErrors(loginForm);

        const email = e.target.elements.email.value.trim();
        const password = e.target.elements.password.value;

        const user = User.usersList.find((u) => u.email === email);
        if (!user || user.password !== password) {
            showFieldError('login-email', '');
            showFieldError('login-password', 'אימייל או סיסמה לא נכונים');
            return;
        }

        User.login(user.id);
        e.target.reset();
    });
}

drawTableRows(User.usersList);

export { drawTableRows, registerForm, loginForm };
