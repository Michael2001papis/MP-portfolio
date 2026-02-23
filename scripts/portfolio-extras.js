// MP Portfolio Extras | © 2025 MP — Michael Papismedov
// Easter eggs, surprises & fun additions — only adds, does not modify existing behavior

(function() {
    'use strict';

    // ========== Simple Confetti (no dependencies) ==========
    function fireConfetti(options) {
        options = options || {};
        var duration = options.duration || 3000;
        var count = options.count || 80;
        var colors = options.colors || ['#1e3a5f', '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];
        var container = document.createElement('div');
        container.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999;overflow:hidden;';
        document.body.appendChild(container);

        for (var i = 0; i < count; i++) {
            (function() {
                var p = document.createElement('div');
                p.style.cssText = 'position:absolute;width:10px;height:10px;border-radius:2px;';
                p.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                p.style.left = Math.random() * 100 + 'vw';
                p.style.top = '-20px';
                p.style.opacity = 0.8 + Math.random() * 0.2;
                p.style.transform = 'rotate(' + (Math.random() * 360) + 'deg)';
                container.appendChild(p);

                var angle = (Math.random() - 0.5) * 120;
                var dist = 150 + Math.random() * 200;
                var durationMs = duration * (0.7 + Math.random() * 0.6);
                var start = performance.now();

                function animate(now) {
                    var elapsed = now - start;
                    var progress = elapsed / durationMs;
                    if (progress >= 1) {
                        p.remove();
                        return;
                    }
                    var x = Math.sin(angle * Math.PI / 180) * dist * progress;
                    var y = 100 * progress + 9.8 * progress * progress * 50;
                    p.style.transform = 'translate(' + x + 'px,' + y + 'px) rotate(' + (progress * 720) + 'deg)';
                    p.style.opacity = 0.8 * (1 - progress);
                    requestAnimationFrame(animate);
                }
                requestAnimationFrame(animate);
            })();
        }

        setTimeout(function() {
            container.remove();
        }, duration + 500);
    }

    // ========== Konami Code Easter Egg ==========
    var konami = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA
    var konamiIndex = 0;

    document.addEventListener('keydown', function(e) {
        if (e.keyCode === konami[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konami.length) {
                konamiIndex = 0;
                showEasterEggOverlay();
            }
        } else {
            konamiIndex = 0;
        }
    });

    function showEasterEggOverlay() {
        var overlay = document.createElement('div');
        overlay.className = 'mp-easter-overlay';
        overlay.innerHTML = '<div class="mp-easter-content"><h2>🎉 מצאת את הסוד!</h2><p>MP — Michael Papismedov</p><p class="mp-easter-sub">קוד קונאמי קלאסי</p><button class="mp-easter-close">סגור</button></div>';
        overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.85);display:flex;align-items:center;justify-content:center;z-index:10000;animation:mpFadeIn 0.3s ease;';
        overlay.querySelector('.mp-easter-close').onclick = function() {
            overlay.remove();
        };
        overlay.onclick = function(ev) {
            if (ev.target === overlay) overlay.remove();
        };
        document.body.appendChild(overlay);
        fireConfetti({ duration: 4000, count: 120 });
    }

    // ========== Confetti on Form Success ==========
    document.addEventListener('DOMContentLoaded', function() {
        if (window.location.search.indexOf('sent=1') >= 0) {
            var msg = document.getElementById('form-message');
            if (msg && msg.textContent && msg.textContent.indexOf('הצלחה') >= 0) {
                setTimeout(function() {
                    fireConfetti({ duration: 2500, count: 60 });
                }, 300);
            }
        }
    });

    // ========== Surprise Me - Random Project ==========
    document.addEventListener('DOMContentLoaded', function() {
        var surpriseBtn = document.querySelector('.surprise-btn');
        var cards = document.querySelectorAll('.project-card-pro');
        if (surpriseBtn && cards.length) {
            surpriseBtn.addEventListener('click', function() {
                var visible = Array.from(cards).filter(function(c) { return c.style.display !== 'none'; });
                if (visible.length === 0) return;
                var card = visible[Math.floor(Math.random() * visible.length)];
                card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                card.classList.add('mp-surprise-highlight');
                setTimeout(function() {
                    card.classList.remove('mp-surprise-highlight');
                }, 1500);
            });
        }
    });

})();
