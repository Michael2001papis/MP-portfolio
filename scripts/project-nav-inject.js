/* MP Portfolio — Shared Project Nav | MP-PORTFOLIO-ID: 2025-MP-001 */
(function() {
    'use strict';
    var GITHUB = 'https://github.com/Michael2001papis/MP-portfolio';
    var navHTML = '<button class="project-nav-toggle" aria-label="תפריט" aria-expanded="false"><span></span><span></span><span></span></button>' +
        '<a href="/index.html">Home</a>' +
        '<a href="/pages/עמודמעבריםכללי/index.html">Projects</a>' +
        '<a href="/legal.html">Terms</a>' +
        '<a href="' + GITHUB + '" target="_blank" rel="noopener">GitHub</a>';
    function setupNav(nav) {
        if (!nav) return;
        nav.innerHTML = navHTML;
        nav.setAttribute('role', 'navigation');
        var toggle = nav.querySelector('.project-nav-toggle');
        if (toggle) toggle.addEventListener('click', function() {
            nav.classList.toggle('open');
            toggle.setAttribute('aria-expanded', nav.classList.contains('open'));
        });
    }
    var nav = document.querySelector('.project-nav');
    setupNav(nav);
    document.querySelectorAll('[data-inject-nav]').forEach(function(el) {
        el.className = (el.className + ' project-nav').trim();
        setupNav(el);
    });
})();
