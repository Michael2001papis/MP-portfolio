// const getCountries = async () => {
//     try {
//     const res = await fetch('https://restcountries.com/v3.1/all');
//     return await res.json();
//     } catch (error) { 
//         console.error('Failed to fetch countries', error);
//     };
// };
//     const countriesFull = await getCountries();

//     let countries = [...countriesFull];

// export {Component};

// const getCountries = async () => {
//     try {
//         const res = await fetch('https://restcountries.com/v3.1/all');
//         return await res.json();
//     } catch (error) {
//         console.error('Failed to fetch countries', error);
//     }
// };

// const countriesFull = await getCountries();

// const reset  = () => { 
//     countries = [...countriesFull];
// };

// const search = (word) => {
//     countries = countriesFull.filter((country) => {
//         const name = country.name.common.toLowerCase();
//         const formatedWord = word.toLowerCase();
//         return name.includes(formatedWord);
//     })
// }

// let countries = [...countriesFull];

// export { countries, reset, search};

/* */
/***********************************************************************/
// במודול ServicדCountries.JS
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
        // const name = country.name.common.toLowerCase();
        // const formatedWord = word.toLowerCase();
        // return name.includes(formatedWord) || 
        //     country.cca2.toLowerCase().includes(formatedWord) ||
        //     country.cca3.toLowerCase().includes(formatedWord);

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
/***********************************************************************/

