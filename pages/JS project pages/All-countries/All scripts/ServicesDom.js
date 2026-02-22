import { countries, reset, search } from "./ServicesCountries.js";

const cardsContainer = document.getElementById('cards');
const searchInput = document.getElementById('search-input');

const showError = (msg) => {
    if (!cardsContainer) return;
    cardsContainer.innerHTML = `
        <div class="countries-error" style="text-align:center;padding:2rem;color:#718096;">
            <p>${msg}</p>
            <button class="countries-retry" style="margin-top:1rem;padding:0.5rem 1rem;background:#1e3a5f;color:white;border:none;border-radius:6px;cursor:pointer;">נסה שוב</button>
        </div>
    `;
    cardsContainer.querySelector('.countries-retry')?.addEventListener('click', () => {
        window.location.reload();
    });
};

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
    if (countries.length === 0) {
        showError('Countries service is temporarily unavailable. Please try again later.');
        return;
    }
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
