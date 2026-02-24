/* MP Portfolio — Landing Form Handler | MP-PORTFOLIO-ID: 2025-MP-001 */
(function () {
    'use strict';

    const COLORS = {
        white: '#ffffff',
        black: '#000000',
        red: '#c53030',
        yellow: '#faf089',
        green: '#48bb78',
        blue: '#3182ce'
    };

    const MODE_STYLES = {
        delicate: { transition: '0.8s ease', opacity: '0.95' },
        smooth: { transition: '0.5s ease-in-out', opacity: '1' },
        fast: { transition: '0.2s linear', opacity: '1' }
    };

    function getFormData() {
        const form = document.getElementById('landing-form');
        if (!form) return null;
        return {
            name: form.elements.name?.value?.trim() || '',
            email: form.elements.email?.value?.trim() || '',
            password: form.elements.password?.value || '',
            bgColor: form.elements.bgColor?.value || 'white',
            font: form.elements.font?.value || 'Arial',
            pageType: form.elements.pageType?.value || 'birthday',
            textColor: form.elements.textColor?.value || 'black',
            mode: form.elements.mode?.value || 'smooth',
            birthday: form.elements.birthday?.value || '',
            wrapper: form.elements.wrapper?.value || 'popup'
        };
    }

    function getPageContent(data) {
        let bg = COLORS[data.bgColor] || COLORS.white;
        let text = COLORS[data.textColor] || COLORS.black;
        if (bg === text) text = bg === COLORS.white ? COLORS.black : COLORS.white;
        const modeStyle = MODE_STYLES[data.mode] || MODE_STYLES.smooth;

        const contents = {
            birthday: `
                <h1>🎂 יום הולדת שמח!</h1>
                <p class="greeting">${data.name}, מזל טוב!</p>
                <p>בתאריך ${data.birthday || 'היום'} אנו חוגגים איתך.</p>
                <p class="wish">איחולי בריאות, אושר והצלחה!</p>
            `,
            work: `
                <h1>📋 סיכום עבודה</h1>
                <p class="greeting">שלום ${data.name},</p>
                <p>להלן סיכום העבודה לפי ההעדפות שהגדרת.</p>
                <ul>
                    <li>פרויקטים שהושלמו</li>
                    <li>משימות בהמתנה</li>
                    <li>יעדים להמשך</li>
                </ul>
            `,
            inventory: `
                <h1>📦 ספירת מלאי</h1>
                <p class="greeting">${data.name},</p>
                <p>דוח ספירת מלאי – לפי בקשתך.</p>
                <table>
                    <tr><th>פריט</th><th>כמות</th><th>סטטוס</th></tr>
                    <tr><td>דוגמה 1</td><td>—</td><td>—</td></tr>
                    <tr><td>דוגמה 2</td><td>—</td><td>—</td></tr>
                </table>
            `,
            writing: `
                <h1>✍️ כתיבה</h1>
                <p class="greeting">שלום ${data.name},</p>
                <p>דף הכתיבה המותאם שלך.</p>
                <p>השתמש במרחב הזה לרעיונות, הערות או תוכן חופשי.</p>
            `
        };

        const content = contents[data.pageType] || contents.writing;

        return `
<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>דף נחיתה - ${data.name}</title>
    <style>
        * { box-sizing: border-box; }
        body {
            margin: 0;
            padding: 2rem;
            font-family: ${data.font}, sans-serif;
            background: ${bg};
            color: ${text};
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            transition: ${modeStyle.transition};
        }
        h1 { font-size: 2rem; margin-bottom: 1rem; }
        .greeting { font-size: 1.3rem; font-weight: bold; margin: 1rem 0; }
        .wish { font-style: italic; margin-top: 2rem; }
        ul, table { text-align: right; margin: 1rem auto; }
        table { border-collapse: collapse; }
        th, td { border: 1px solid currentColor; padding: 0.5rem 1rem; }
    </style>
</head>
<body>
    <div class="landing-content">${content}</div>
</body>
</html>`;
    }

    function showAsPopup(html) {
        const win = window.open('', '_blank', 'width=500,height=400,scrollbars=yes');
        if (!win) {
            alert('יש לאפשר חלונות קופצים כדי להציג את דף הנחיתה.');
            return;
        }
        win.document.write(html);
        win.document.close();
        setTimeout(() => win.close(), 30000);
    }

    function showAsNewTab(html) {
        const blob = new Blob([html], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const win = window.open(url, '_blank');
        if (win) setTimeout(() => URL.revokeObjectURL(url), 1000);
        else alert('לא ניתן לפתוח לשונית חדשה. בדוק את חסימת החלונות הקופצים.');
    }

    function showAsAlert(data) {
        const msg = {
            birthday: `יום הולדת שמח ${data.name}! בתאריך ${data.birthday || 'היום'}.`,
            work: `סיכום עבודה עבור ${data.name}.`,
            inventory: `ספירת מלאי – ${data.name}.`,
            writing: `דף כתיבה – ${data.name}.`
        };
        alert(msg[data.pageType] || 'דף הנחיתה מוכן.');
    }

    function handleSubmit(e) {
        e.preventDefault();
        const data = getFormData();
        if (!data || !data.name || !data.email) return;

        const html = getPageContent(data);

        switch (data.wrapper) {
            case 'popup':
                showAsPopup(html);
                break;
            case 'newtab':
                showAsNewTab(html);
                break;
            case 'alert':
                showAsAlert(data);
                break;
            default:
                showAsPopup(html);
        }
    }

    const form = document.getElementById('landing-form');
    if (form) form.addEventListener('submit', handleSubmit);
})();
