/* MP Portfolio — Ownership Console & Signature | MP-PORTFOLIO-ID: 2025-MP-001 */
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
(function(){
    if(document.getElementById('mp-signature'))return;
    if(document.body.innerText.indexOf('MP-PORTFOLIO-ID')>=0)return;
    var f=document.createElement('footer');
    f.id='mp-signature';
    f.className='mp-signature';
    f.setAttribute('role','contentinfo');
    f.innerHTML='© 2025 MP — Michael Papismedov | MP-PORTFOLIO-ID: 2025-MP-001 | <a href="/legal.html">Terms</a> · <a href="https://github.com/Michael2001papis/MP-portfolio" target="_blank" rel="noopener">GitHub</a>';
    f.style.cssText='text-align:center;padding:0.5rem 1rem;background:#1e3a5f;color:rgba(255,255,255,0.9);font-size:0.8rem;margin-top:auto;';
    f.querySelectorAll('a').forEach(function(a){a.style.color='#7dd3fc';a.style.textDecoration='underline';});
    document.body.appendChild(f);
})();
