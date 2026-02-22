// MP Portfolio - Professional
document.addEventListener('DOMContentLoaded', function() {

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

    // Contact Form
    var form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            var msg = document.getElementById('form-message');
            if (msg) {
                msg.textContent = 'הטופס נקלט. תודה!';
                msg.style.color = '#1e3a5f';
                msg.style.marginTop = '10px';
            }
            var nameInput = document.getElementById('contact-name');
            var emailInput = document.getElementById('contact-email');
            var phoneInput = document.getElementById('contact-phone');
            var messageInput = document.getElementById('contact-message');
            if (nameInput) nameInput.value = '';
            if (emailInput) emailInput.value = '';
            if (phoneInput) phoneInput.value = '';
            if (messageInput) messageInput.value = '';
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
