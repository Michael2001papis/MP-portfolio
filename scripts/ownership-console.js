/* MP Portfolio — Ownership Console & Signature | MP-PORTFOLIO-ID: 2025-MP-001 */
(function(){console.log('%c © 2025 MP — Michael Papismedov | MP-PORTFOLIO-ID: 2025-MP-001 ','background:#1e3a5f;color:white;padding:6px 12px;border-radius:4px;font-weight:bold;');})();
(function(){
    var nav=document.querySelector('.project-nav');
    if(!nav || nav.querySelector('.project-nav-toggle'))return;
    var btn=document.createElement('button');
    btn.className='project-nav-toggle';
    btn.setAttribute('aria-label','תפריט');
    btn.setAttribute('aria-expanded','false');
    btn.innerHTML='<span></span><span></span><span></span>';
    nav.insertBefore(btn,nav.firstChild);
    btn.addEventListener('click',function(){nav.classList.toggle('open');btn.setAttribute('aria-expanded',nav.classList.contains('open'));});
    document.addEventListener('click',function(e){if(nav.classList.contains('open')&&!nav.contains(e.target)){nav.classList.remove('open');btn.setAttribute('aria-expanded','false');}});
})();
(function(){
    var t=document.querySelector('.top-menu .nav-toggle');
    var n=document.querySelector('.top-menu nav');
    if(t&&n){
        t.addEventListener('click',function(){t.classList.toggle('open');t.setAttribute('aria-expanded',t.classList.contains('open'));n.classList.toggle('open');});
        document.addEventListener('click',function(e){if(n.classList.contains('open')&&!n.contains(e.target)&&!t.contains(e.target)){n.classList.remove('open');t.classList.remove('open');t.setAttribute('aria-expanded','false');}});
    }
})();
(function(){
    if(document.getElementById('mp-signature'))return;
    if(document.body.innerText.indexOf('MP-PORTFOLIO-ID')>=0)return;
    var f=document.createElement('footer');
    f.id='mp-signature';
    f.className='footer mp-signature';
    f.setAttribute('role','contentinfo');
    f.innerHTML='<p>© 2025 MP — Michael Papismedov | MP-PORTFOLIO-ID: 2025-MP-001 · <a href="/legal.html">Terms</a> · <a href="https://github.com/Michael2001papis/MP-portfolio" target="_blank" rel="noopener">GitHub</a></p><p><small>Unauthorized copying or redistribution is prohibited.</small></p>';
    f.style.cssText='text-align:center;padding:1.25rem 2rem;background:#1e3a5f;color:rgba(255,255,255,0.95);font-size:0.9rem;margin-top:auto;box-shadow:0 -2px 12px rgba(0,0,0,0.15);';
    f.querySelectorAll('a').forEach(function(a){a.style.color='#7dd3fc';a.style.textDecoration='none';a.style.margin='0 0.5rem';});
    document.body.appendChild(f);
})();
