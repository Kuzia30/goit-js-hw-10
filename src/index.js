import articleTplList from './templates/countries_list.hbs';
import articleTpl from './templates/country_template.hbs';
import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const DEBOUNCE_DELAY = 300;

import { fetchCountries } from './js/fetchCountries';

const textEl = document.querySelector('#search-box');
const listEl = document.querySelector('.country-list');

textEl.addEventListener('input', debounce(onCountriesFetch, DEBOUNCE_DELAY));
function onCountriesFetch(evt) {
    const inputValue = evt.target.value.trim();
    if (inputValue.length === 0) {
        listEl.innerHTML = '';
        return  
    } else {
  fetchCountries(inputValue)
    .then(appendCountriesMarkup)
    .catch(error => Notify.failure('Oops, there is no country with that name'))
    }
}

function appendCountriesMarkup(countries) {
      if (countries.length > 9) {
        return Notify.info('Too many matches found. Please enter a more specific name.');
      }
      if (countries.length === 1) {
        countries.forEach(country => (listEl.innerHTML = articleTpl(country)));
      } else {
        listEl.innerHTML = articleTplList(countries);
      }
}

