// MP Portfolio - Professional | © 2025 MP — Michael Papismedov | MP-PORTFOLIO-ID: 2025-MP-001
document.addEventListener('DOMContentLoaded', function() {

    // Hamburger menu
    var hamburger = document.querySelector('.portfolio-header .hamburger');
    var nav = document.querySelector('.portfolio-header nav');
    if (hamburger && nav) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('open');
            hamburger.setAttribute('aria-expanded', hamburger.classList.contains('open'));
            nav.classList.toggle('open');
        });
    }

    // Filter Projects
    var filterBtns = document.querySelectorAll('.filter-btn');
    var projectCards = document.querySelectorAll('.project-card-pro');

    if (filterBtns.length && projectCards.length) {
        filterBtns.forEach(function(btn) {
            btn.addEventListener('click', function() {
                var filter = this.getAttribute('data-filter');
                filterBtns.forEach(function(b) { b.classList.remove('active'); });
                this.classList.add('active');

                projectCards.forEach(function(card) {
                    var type = card.getAttribute('data-type');
                    if (filter === 'all' || type === filter) {
                        card.style.display = 'flex';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // Contact Form - mailto
    var form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            var msg = document.getElementById('form-message');
            var nameInput = document.getElementById('contact-name');
            var emailInput = document.getElementById('contact-email');
            var phoneInput = document.getElementById('contact-phone');
            var reasonInput = document.getElementById('contact-reason');
            var locationInput = document.getElementById('contact-location');
            var messageInput = document.getElementById('contact-message');

            var name = nameInput ? nameInput.value.trim() : '';
            var email = emailInput ? emailInput.value.trim() : '';
            var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!msg) return;
            msg.style.color = '#c53030';

            if (!name || name.length < 2) {
                msg.textContent = 'נא להזין שם מלא (לפחות 2 תווים)';
                return;
            }
            if (!email) {
                msg.textContent = 'נא להזין כתובת אימייל';
                return;
            }
            if (!emailRe.test(email)) {
                msg.textContent = 'נא להזין אימייל תקין';
                return;
            }

            if (!confirm('לשלוח את המייל? ייפתח דוא"ל עם הפרטים. ישלחו משם.')) return;

            var phone = phoneInput ? phoneInput.value.trim() : '';
            var reason = reasonInput ? reasonInput.options[reasonInput.selectedIndex].text : '';
            var location = locationInput ? locationInput.value.trim() : '';
            var message = messageInput ? messageInput.value.trim() : '';

            var body = 'שם: ' + name + '\nאימייל: ' + email + '\nטלפון: ' + phone + '\nסיבה: ' + reason + '\nמיקום: ' + location + '\n\nהודעה:\n' + message;
            var subject = 'פנייה מ-MP Portfolio - ' + name;
            var mailto = 'mailto:dvnka2@gmail.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
            window.location.href = mailto;

            msg.textContent = 'המייל נפתח. תודה!';
            msg.style.color = '#1e3a5f';
            msg.style.marginTop = '10px';
            form.reset();
        });
    }

    // Back to Top
    var backBtn = document.getElementById('back-to-top');
    if (backBtn) {
        window.addEventListener('scroll', function() {
            backBtn.style.display = (window.scrollY > 300) ? 'block' : 'none';
        });
        backBtn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        backBtn.style.display = 'none';
    }
});
