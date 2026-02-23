# סטטוס Refactoring — Refactor Plan 1.0

**מסמך עבודה:** Refactoring מקצועי ל-MP Portfolio

---

## שלב 1 — גיבוי מלא ✅

- [x] תיקיית גיבוי: `STABLE_VERSION_2025/` (187 קבצים)
- [x] תיעוד: `docs/STABLE_STATE.md`

---

## שלב 2 — Projects ב-JS ✅ (כבר קיים)

- [x] `scripts/projects-catalog.js` — נתונים מרכזיים
- [x] `scripts/projects-render.js` — רנדור כרטיסים
- [x] שינוי פרויקט = מקום אחד
- [x] אין כפילות כרטיסים ב-HTML

---

## שלב 3 — הזרקת Header ו-Footer

**מצב:** לא נדרש כרגע.

**הסבר:** המסמך ממליץ על הזרקה "אם אותו Header מופיע בעשרות דפים".  
דפי הפורטפוליו הראשיים (index, legal, form page) = 3 קבצים.  
דפי הפרויקטים משתמשים ב־`project-nav-inject.js` לניווט משותף.

**המלצה:** להשאיר כרגע. אם יתווספו דפים רבים נוספים — לשקול.

---

## שלב 4 — ניקוי כפילויות / Archive ✅

**LandingPageJS:**

- [x] הועבר ל־`Archive/LandingPageJS/`
- `index01`–`index09` — לא מקושרים מדף הבית

**קבצים בשימוש (לא למחוק):**

- `צור קשר.HTML`, `תודה.HTML` — מקושרים מדפי Landing, עמודמעבריםכללי, The projects
- `The projects of the projects` — מקושר מדפי Landing (medical, apple, microsoft, וכו')

---

## שלב 5 — איחוד CSS (Design System) ✅

**מצב נוכחי:**

- [x] `portfolio-professional.css` — משתנים ב־`:root`: `--primary`, `--bg`, `--text`, `--border`, `--tap-min`
- [x] תיעוד Design System בראש הקובץ
- [x] כרטיסי פרויקטים — אחידים (רנדור מ־JS)

---

## שלב 6 — בדיקות

- [ ] Desktop: פרויקטים, פילטר, ניווט
- [ ] Tablet: grid, menu
- [ ] Mobile: hamburger, אין גלילה אופקית
- [ ] Console: ללא שגיאות

---

## סדר עבודה מומלץ

1. ✅ גיבוי
2. ✅ Projects (קיים)
3. ⏭️ דילוג על Header/Footer injection (3 דפים בלבד)
4. ✅ Archive LandingPageJS
5. ✅ Design System (תיעוד + משתנים)
6. 🔄 בדיקות

---

**© 2025 MP — Michael Papismedov | MP-PORTFOLIO-ID: 2025-MP-001**
