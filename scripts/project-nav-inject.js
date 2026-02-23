/* MP Portfolio — Shared Project Nav | MP-PORTFOLIO-ID: 2025-MP-001 */
(function() {
    'use strict';
    var GITHUB = 'https://github.com/Michael2001papis/MP-portfolio';
    var navHTML = '<a href="/index.html">Home</a>' +
        '<a href="/pages/עמודמעבריםכללי/index.html">Projects</a>' +
        '<a href="/legal.html">Terms</a>' +
        '<a href="' + GITHUB + '" target="_blank" rel="noopener">GitHub</a>';
    var nav = document.querySelector('.project-nav');
    if (nav) nav.innerHTML = navHTML;
    document.querySelectorAll('[data-inject-nav]').forEach(function(el) {
        el.className = (el.className + ' project-nav').trim();
        el.setAttribute('role', 'navigation');
        el.innerHTML = navHTML;
    });
})();
