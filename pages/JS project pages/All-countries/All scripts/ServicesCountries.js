export const getCountries = async () => {
    try {
        const res = await fetch('https://restcountries.com/v3.1/all');
        if (!res.ok) throw new Error('API request failed');
        return await res.json();
    } catch (error) {
        return null;
    }
};

let countriesFull = [];
let countries = [];

const initCountries = async () => {
    const data = await getCountries();
    if (data && Array.isArray(data)) {
        countriesFull = data;
        countries = [...data];
        return true;
    }
    return false;
};

const reset = () => {
    countries = [...countriesFull];
};

const search = (word) => {
    const formattedWord = word.toLowerCase();
    countries = countriesFull.filter((country) => {
        const searchAgainst = [
            country.name.common,
            country.cca2,
            country.cca3
        ].map(x => (x || '').toLowerCase());
        return searchAgainst.some(x => x.includes(formattedWord));
    });
};

export { countries, reset, search, initCountries };
