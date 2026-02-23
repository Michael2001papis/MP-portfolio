# MP Portfolio — Implementation Log

## Baseline (לפני שינוי ראשון)

**פעולה:** צור נקודת בסיס לרול-בק

```bash
git add -A
git commit -m "Baseline: MP Portfolio before data-driven refactor"
git tag baseline-pre-refactor
```

**או** צור Branch:
```bash
git checkout -b refactor-data-driven
```

---

## שלב A — אחידות ניווט ✓

**מה בוצע:**
- `scripts/project-nav-inject.js` — מחליף תוכן nav בכל הפרויקטים לסטנדרט אחיד
- הסרת דריסות CSS מ-SGMemory.css, Triviaplay/styles.css, Ul.css
- סטנדרט: Home | Projects | Terms | GitHub

---

## שלב B — Data-Driven Projects ✓

**מה בוצע:**
- `scripts/projects-catalog.js` — קטלוג 10 JS + 6 HTML
- `scripts/projects-render.js` — רנדר כרטיסים מדאטה
- index.html — גרידים ריקים + noscript fallback

---

## שלב C — רספונסיביות ✓

**Breakpoints:** 360px, 768px, 1024px, 1440px  
**Grid:** Mobile 1 | Tablet 2 | Desktop 3 | Wide 4

---

## LandingPageJS

הניווט הראשי מפנה ל-`עמודמעבריםכללי` (Projects).  
LandingPageJS (index01–index09) לא מקושר מהדף הראשי — נשאר בארכיון.
