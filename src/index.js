import './css/styles.css';
import Notiflix from 'notiflix';
import fetchCountries from './fetchCountries';
import debounce from 'lodash.debounce';
import { renderCountries, renderCountry } from './renderHtml.js';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('input#search-box');
const ulCountries = document.querySelector('ul.country-list');

const inputChanged = event => {
  if (input.value.trim() === '') {
    ulCountries.innerHTML = '';
  } else {
    fetchCountries(input.value)
      .then(countries => outputCountries(countries))
      .catch(error => {
        if ((error.name = '404 Not found')) {
          ulCountries.innerHTML = '';
          Notiflix.Notify.failure('Oops, there is no country with that name');
        } else {
          console.log(error);
        }
      });
  }
};

function outputCountries(countries) {
  if (countries.length > 10) {
    ulCountries.innerHTML = '';
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  } else if (countries.length >= 2) {
    ulCountries.innerHTML = '';
    const markup = renderCountries(countries);
    ulCountries.insertAdjacentHTML('beforeend', markup);
  } else if (countries.length === 1) {
    ulCountries.innerHTML = '';
    const markup = renderCountry(countries);
    ulCountries.insertAdjacentHTML('beforeend', markup);
  }
}

input.addEventListener('input', debounce(inputChanged, DEBOUNCE_DELAY));
