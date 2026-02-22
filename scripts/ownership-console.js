/* MP Portfolio — Ownership Console Marker | MP-PORTFOLIO-ID: 2025-MP-001 */
(function(){console.log('%c © 2025 MP — Michael Papismedov | MP-PORTFOLIO-ID: 2025-MP-001 ','background:#1e3a5f;color:white;padding:6px 12px;border-radius:4px;font-weight:bold;');})();
(function(){
    var nav=document.querySelector('.project-nav');
    if(!nav)return;
    var btn=document.createElement('button');
    btn.className='project-nav-toggle';
    btn.setAttribute('aria-label','תפריט');
    btn.setAttribute('aria-expanded','false');
    btn.innerHTML='<span></span><span></span><span></span>';
    nav.insertBefore(btn,nav.firstChild);
    btn.addEventListener('click',function(){nav.classList.toggle('open');btn.setAttribute('aria-expanded',nav.classList.contains('open'));});
})();
