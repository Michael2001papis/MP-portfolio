import { countries, reset, search, initCountries } from "./ServicesCountries.js";

const cardsContainer = document.getElementById('cards');
const searchInput = document.getElementById('search-input');
const loadingEl = document.getElementById('loading-state');
const errorEl = document.getElementById('error-state');
const emptyEl = document.getElementById('empty-state');
const searchArea = document.getElementById('search-area');

const generateCard = (country) => {
    const card = document.createElement('div');
    card.className = "card m-2 col-sm-12 col-md-3";

    const cardImg = document.createElement('img');
    cardImg.src = country.flags.png;
    cardImg.alt = country.name.common;
    cardImg.className = "card-img-top img mt-2 border rounded shadow";

    const cardBody = document.createElement('div');
    cardBody.className = "card-body";

    const cardTitle = document.createElement('h5');
    cardTitle.className = "card-title";
    cardTitle.innerText = country.name.common;

    const population = document.createElement('p');
    population.className = "card-text";
    population.innerText = `Population: ${country.population}`;

    const region = document.createElement('p');
    region.className = "card-text";
    region.innerText = `Region: ${country.region}`;

    const cardFooter = document.createElement('div');
    cardFooter.className = "card-footer d-flex justify-content-center mb-2";

    const heartIcon = document.createElement('i');
    heartIcon.className = "fa fa-heart text-dark";
    heartIcon.setAttribute('aria-label', 'Like');

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

export const createCards = (countryList) => {
    const list = countryList || countries;
    cardsContainer.innerHTML = '';
    emptyEl.style.display = 'none';

    if (!list || list.length === 0) {
        emptyEl.style.display = 'block';
        return;
    }

    for (const country of list) {
        generateCard(country);
    }
};

const setupSearch = () => {
    if (!searchInput) return;

    searchInput.addEventListener('input', (event) => {
        reset();
        const value = event.target.value.trim();

        if (!value) {
            createCards();
        } else {
            search(value);
            createCards();
        }
    });
};

export const initCountriesUI = async () => {
    const success = await initCountries();

    loadingEl.style.display = 'none';

    if (!success) {
        errorEl.style.display = 'block';
        errorEl.textContent = 'Failed to load countries. Please try again.';
        return;
    }

    searchArea.style.display = 'block';
    createCards();
    setupSearch();
};
