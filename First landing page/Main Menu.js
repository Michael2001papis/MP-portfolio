// MP Portfolio - Professional | © 2025 MP — Michael Papismedov | MP-PORTFOLIO-ID: 2025-MP-001
// All rights reserved. Unauthorized copying prohibited.
document.addEventListener('DOMContentLoaded', function() {

    // Smooth scroll for anchor links (polyfill for all browsers)
    function smoothScrollTo(el) {
        if (!el) return;
        var start = window.pageYOffset || document.documentElement.scrollTop;
        var target = el.getBoundingClientRect().top + start;
        var dist = target - start;
        var startTime = null;
        function step(now) {
            if (!startTime) startTime = now;
            var t = Math.min((now - startTime) / 500, 1);
            var eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
            window.scrollTo(0, start + dist * eased);
            if (t < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
    }
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        var href = anchor.getAttribute('href');
        if (href === '#') return;
        anchor.addEventListener('click', function(e) {
            var target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                smoothScrollTo(target);
                var hamb = document.querySelector('.portfolio-header .hamburger');
                var n = document.querySelector('.portfolio-header nav');
                if (hamb && n && n.classList.contains('open')) {
                    hamb.classList.remove('open');
                    n.classList.remove('open');
                    hamb.setAttribute('aria-expanded', 'false');
                }
            }
        });
    });

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
