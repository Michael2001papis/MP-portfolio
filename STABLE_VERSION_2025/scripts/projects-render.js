/* MP Portfolio — Projects Grid Renderer | MP-PORTFOLIO-ID: 2025-MP-001 */
(function() {
    'use strict';
    var catalog = window.MP_PROJECTS_CATALOG;
    if (!catalog) return;
    var gh = catalog.github || 'https://github.com/Michael2001papis/MP-portfolio';
    function cardHTML(p, type) {
        return '<article class="project-card-pro" data-type="' + type + '">' +
            '<div class="card-image" style="background-image:url(\'' + (p.img || '') + '\')"></div>' +
            '<div class="card-content">' +
            '<h3>' + (p.title || '') + '</h3>' +
            '<p class="card-desc">' + (p.desc || '') + '</p>' +
            '<p class="card-tech">' + (p.tech || '') + '</p>' +
            '<div class="card-buttons">' +
            '<a href="' + (p.link || '#') + '" class="btn-demo">Open Project</a>' +
            '<a href="' + gh + '" target="_blank" rel="noopener" class="btn-github">GitHub</a>' +
            '</div></div></article>';
    }
    function render(containerId, type) {
        var list = catalog[type];
        var el = document.getElementById(containerId);
        if (!el || !list) return;
        el.innerHTML = list.map(function(p) { return cardHTML(p, type); }).join('');
    }
    document.addEventListener('DOMContentLoaded', function() {
        render('projects-js-grid', 'js');
        render('projects-html-grid', 'html');
    });
})();
