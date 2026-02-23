// MP Portfolio - Professional | © 2025 MP — Michael Papismedov | MP-PORTFOLIO-ID: 2025-MP-001
// All rights reserved. Unauthorized copying prohibited.
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

    // Contact Form - FormSubmit.co (שליחה ישירה לאימייל)
    var form = document.getElementById('contact-form');
    if (form) {
        var nextInput = document.getElementById('contact-next');
        if (nextInput) nextInput.value = window.location.origin + (window.location.pathname || '/index.html') + '?sent=1#contact';

        form.addEventListener('submit', function(e) {
            var msg = document.getElementById('form-message');
            var nameInput = document.getElementById('contact-name');
            var emailInput = document.getElementById('contact-email');
            var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            var name = nameInput ? nameInput.value.trim() : '';
            var email = emailInput ? emailInput.value.trim() : '';

            if (!msg) return;
            msg.style.color = '#c53030';
            if (!name || name.length < 2) {
                e.preventDefault();
                msg.textContent = 'נא להזין שם מלא (לפחות 2 תווים)';
                return;
            }
            if (!email) {
                e.preventDefault();
                msg.textContent = 'נא להזין כתובת אימייל';
                return;
            }
            if (!emailRe.test(email)) {
                e.preventDefault();
                msg.textContent = 'נא להזין אימייל תקין';
                return;
            }
        });

        if (window.location.search.indexOf('sent=1') >= 0) {
            var m = document.getElementById('form-message');
            if (m) {
                m.textContent = 'הפנייה נשלחה בהצלחה! תודה.';
                m.style.color = '#1e3a5f';
            }
        }
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
