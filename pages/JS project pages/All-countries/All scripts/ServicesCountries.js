export const getCountries = async () => {
    try {
        const res = await fetch('https://restcountries.com/v3.1/all');
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
    const formattedWord = (word || '').toLowerCase();
    countries = countriesFull.filter((country) => {
        const searchAgainst = [
            country.name?.common,
            country.cca2,
            country.cca3
        ].map(x => (x || '').toLowerCase());
        return searchAgainst.some(x => x.includes(formattedWord));
    });
};

export { countries, reset, search };
