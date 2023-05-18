import './css/styles.css';
import Notiflix from 'notiflix';
import fetchCountries from './fetchCountries';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('input#search-box');
const ulCountries = document.querySelector('ul.country-list');

const InputChanged = event => {
  if (input.value.trim() === '') {
    ulCountries.innerHTML = '';
  } else {
    fetchCountries(input.value)
      .then(countries => OutputCountries(countries))
      .catch(error => {
        ulCountries.innerHTML = '';
        console.log(error);
      });
  }
};

function OutputCountries(countries) {
  if (countries.length > 10) {
    ulCountries.innerHTML = '';
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  } else if (countries.length > 2) {
    ulCountries.innerHTML = '';
    const markup = countries
      .map(({ name, flags }) => {
        return `<li>
        <img src=${flags.svg} alt="${flags.alt}"  class="svg">
        <p class=""text">${name.official}</p>
      </li>`;
      })
      .join('');
    ulCountries.insertAdjacentHTML('beforeend', markup);
  } else if (countries.length === 1) {
    ulCountries.innerHTML = '';
    const { name, flags, capital, languages, population } = countries[0];
    const markup = `<li>
    <img src=${flags.svg} alt=${flags.alt} class="svg countries">
    <h2 class="name_countries">${name.official}</h2>
  </li>
  <h5 class="text_country">Capital: <span class="text"> ${capital}</span></h5>
  <h5 class="text_country">Population: <span class="text"> ${population}</span></h5>
  <h5 class="text_country">Languages: <span class="text"> ${[
    Object.values(languages),
  ]}</span></h5> `;
    ulCountries.insertAdjacentHTML('beforeend', markup);
  }
}
input.addEventListener('input', debounce(InputChanged, DEBOUNCE_DELAY));
