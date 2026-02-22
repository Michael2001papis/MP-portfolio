// במודול ServicesCountries.js
export const getCountries = async () => {
    try {
        const res = await fetch('https://restcountries.com/v3.1/all');
        return await res.json();
    } catch (error) {
        console.error('Failed to fetch countries', error);
    }
};


const countriesFull = await getCountries();
let countries = [...countriesFull];

const reset = () => {
    countries = [...countriesFull];
}

const search = (word) => {
    countries = countriesFull.filter((country) => {
        const formattedWord = word.toLowerCase();
        const searchAgainst = [
            country.name.common,
            country.cca2,
            country.cca3
        ].map(x => x.toLowerCase());
        return searchAgainst.some(x => x.includes(formattedWord));
    })
}

export { countries, reset, search };
