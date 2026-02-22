import { countries, reset, search } from "./ServicesCountries.js";

const cardsContainer = document.getElementById('cards');
const searchInput = document.getElementById('search-input');

const generateCard = (country) => {
    const card = document.createElement('div');
    card.className = "card m-2 col-sm-12 col-md-3";

    const cardImg = document.createElement('img');
    cardImg.src = country.flags?.png || '';
    cardImg.alt = country.name?.common || '';
    cardImg.className = "card-img-top img mt-2 border rounded shadow";

    const cardBody = document.createElement('div');
    cardBody.className = "card-body";

    const cardTitle = document.createElement('h5');
    cardTitle.className = "card-title";
    cardTitle.innerText = country.name?.common || '';

    const population = document.createElement('p');
    population.className = "card-text";
    population.innerText = `Population: ${country.population ?? 0}`;

    const region = document.createElement('p');
    region.className = "card-text";
    region.innerText = `Region: ${country.region || ''}`;

    const cardFooter = document.createElement('div');
    cardFooter.className = "card-footer d-flex justify-content-center mb-2";

    const heartIcon = document.createElement('i');
    heartIcon.className = "fa fa-heart text-dark";
    heartIcon.addEventListener('click', () => {
        heartIcon.classList.toggle('text-danger');
        heartIcon.classList.toggle('text-dark');
    });

    cardFooter.appendChild(heartIcon);
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(population);
    cardBody.appendChild(region);
    card.appendChild(cardImg);
    card.appendChild(cardBody);
    card.appendChild(cardFooter);
    cardsContainer.appendChild(card);
};

const createCards = () => {
    if (!cardsContainer) return;
    cardsContainer.innerHTML = '';
    for (const country of countries) {
        generateCard(country);
    }
};

if (searchInput) {
    searchInput.addEventListener('input', (event) => {
        reset();
        const value = (event.target.value || '').trim();
        if (value) search(value);
        createCards();
    });
}

createCards();
