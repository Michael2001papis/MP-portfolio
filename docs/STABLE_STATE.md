# מצב יציב — MP Portfolio

**תאריך גיבוי:** 22 בפברואר 2025  
**תיקיית גיבוי:** `STABLE_VERSION_2025/`  
**מסמך:** Refactor Plan 1.0 — נקודת שחזור

---

## מדדים נוכחיים

| מדד | ערך |
|-----|-----|
| **פרויקטי JavaScript** | 10 |
| **פרויקטי HTML** | 6 |
| **סה"כ פרויקטים** | 16 |
| **דפי HTML** | ~67 |

---

## מצב טפסים

| טופס | סטטוס |
|------|--------|
| יצירת קשר לפיתוח אתר רשמי | ✅ עובד (FormSubmit) |
| שלח אימייל (mailto) | ✅ עובד |

---

## מצב רספונסיביות

- **Breakpoints:** 360px, 480px, 768px, 1024px, 1440px
- **Grid:** Mobile 1 | Tablet 2 | Desktop 3 | Wide 4
- **Hamburger:** מופעל מתחת 768px

---

## מה עובד

- [x] דף הבית נטען
- [x] פרויקטים מוצגים (Data-Driven: catalog + render)
- [x] פילטר All / JS / HTML
- [x] כפתור הפתעה
- [x] ניווט Header
- [x] Hamburger במובייל
- [x] Back to Top
- [x] טופס יצירת קשר לפיתוח אתר
- [x] mailto
- [x] קישורים ל־Terms, GitHub
- [x] noscript fallback

---

## מבנה JS נוכחי

| קובץ | תפקיד |
|------|--------|
| `projects-catalog.js` | נתוני פרויקטים (data) |
| `projects-render.js` | רנדור כרטיסים (render) |
| `Main Menu.js` | Hamburger, פילטר, Back to Top (behavior) |
| `project-nav-inject.js` | ניווט בפרויקטים (לעמודים עם .project-nav) |
| `portfolio-extras.js` | Easter eggs, הפתעה |
| `ownership-console.js` | חותמת בעלות |

---

## למה זה קריטי

כל שינוי מבני עלול לשבור משהו.  
**STABLE_VERSION_2025** היא נקודת החזרה.

במקרה של תקלה:
1. השווה קבצים מול הגיבוי
2. שחזר קבצים ספציפיים
3. או שחזר את כל התיקייה

---

**© 2025 MP — Michael Papismedov | MP-PORTFOLIO-ID: 2025-MP-001**
