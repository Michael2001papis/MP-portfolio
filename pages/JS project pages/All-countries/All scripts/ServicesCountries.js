const API_URL = 'https://restcountries.com/v3.1/all?fields=name,flags,cca2,cca3,region,population';

// מיפוי שמות מדינות בעברית (חלקי — מדינות נפוצות)
const HEBREW_NAMES = {
    'ישראל': 'Israel', 'ארצות הברית': 'United States', 'אמריקה': 'United States', 'בריטניה': 'United Kingdom',
    'אנגליה': 'United Kingdom', 'צרפת': 'France', 'גרמניה': 'Germany', 'ספרד': 'Spain', 'איטליה': 'Italy',
    'רוסיה': 'Russia', 'סין': 'China', 'יפן': 'Japan', 'הודו': 'India', 'ברזיל': 'Brazil', 'קנדה': 'Canada',
    'מצרים': 'Egypt', 'טורקיה': 'Turkey', 'איראן': 'Iran', 'ערב הסעודית': 'Saudi Arabia', 'עיראק': 'Iraq',
    'ירדן': 'Jordan', 'לבנון': 'Lebanon', 'סוריה': 'Syria', 'מקסיקו': 'Mexico', 'ארגנטינה': 'Argentina',
    'אוסטרליה': 'Australia', 'דרום אפריקה': 'South Africa', 'ניגריה': 'Nigeria', 'פולין': 'Poland',
    'הולנד': 'Netherlands', 'בלגיה': 'Belgium', 'שוודיה': 'Sweden', 'נורווגיה': 'Norway', 'דנמרק': 'Denmark',
    'פינלנד': 'Finland', 'יוון': 'Greece', 'פורטוגל': 'Portugal', 'אירלנד': 'Ireland', 'אוסטריה': 'Austria',
    'שווייץ': 'Switzerland', 'צ\'כיה': 'Czech Republic', 'הונגריה': 'Hungary', 'רומניה': 'Romania',
    'אוקראינה': 'Ukraine', 'מרוקו': 'Morocco', 'אלג\'יריה': 'Algeria', 'תוניסיה': 'Tunisia',
    'אינדונזיה': 'Indonesia', 'תאילנד': 'Thailand', 'וייטנאם': 'Vietnam', 'דרום קוריאה': 'South Korea',
    'צפון קוריאה': 'North Korea', 'פקיסטן': 'Pakistan', 'בנגלדש': 'Bangladesh', 'ניו זילנד': 'New Zealand',
    'אנגולה': 'Angola', 'אתיופיה': 'Ethiopia', 'קניה': 'Kenya', 'טנזניה': 'Tanzania',
    'קולומביה': 'Colombia', 'פרו': 'Peru', 'צ\'ילה': 'Chile', 'ונצואלה': 'Venezuela',
    'קובה': 'Cuba', 'ג\'מייקה': 'Jamaica', 'פנמה': 'Panama', 'קוסטה ריקה': 'Costa Rica',
    'איחוד האמירויות': 'United Arab Emirates', 'קטר': 'Qatar', 'כווית': 'Kuwait', 'בחריין': 'Bahrain',
    'סינגפור': 'Singapore', 'מלזיה': 'Malaysia', 'הפיליפינים': 'Philippines', 'פקיסטן': 'Pakistan'
};

export const getCountries = async () => {
    try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error('API error');
        const data = await res.json();
        return Array.isArray(data) ? data : [];
    } catch (error) {
        return [];
    }
};

let countriesFull = [];
let countries = [];

const init = async () => {
    const data = await getCountries();
    countriesFull = data || [];
    countries = [...countriesFull];
};

await init();

const reset = () => {
    countries = [...countriesFull];
};

const search = (word) => {
    const w = (word || '').trim();
    const wLow = w.toLowerCase();
    var terms = [wLow];
    if (HEBREW_NAMES[w]) terms.push(HEBREW_NAMES[w].toLowerCase());
    Object.keys(HEBREW_NAMES).forEach(function(he) {
        if (he.indexOf(w) >= 0 || w.indexOf(he) >= 0) terms.push(HEBREW_NAMES[he].toLowerCase());
    });
    countries = countriesFull.filter((country) => {
        const name = (country.name?.common || '').toLowerCase();
        const cca2 = (country.cca2 || '').toLowerCase();
        const cca3 = (country.cca3 || '').toLowerCase();
        return terms.some(function(t) {
            return name.indexOf(t) >= 0 || cca2.indexOf(t) >= 0 || cca3.indexOf(t) >= 0;
        });
    });
};

export { countries, reset, search };
