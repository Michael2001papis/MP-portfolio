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
