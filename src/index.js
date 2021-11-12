import countriesTplList from './templates/countries_list.hbs';
import currentCountryTpl from './templates/current_country.hbs';
import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './js/fetchCountries';

const DEBOUNCE_DELAY = 300;

const textEl = document.querySelector('#search-box');
const listEl = document.querySelector('.country-list');

textEl.addEventListener('input', debounce(onCountriesFetch, DEBOUNCE_DELAY));

function onCountriesFetch(evt) {
  const inputValue = evt.target.value.trim();
  if (inputValue.length === 0) {
    listEl.innerHTML = '';
    return;
  } else {
    fetchCountries(inputValue)
      .then(appendCountriesMarkup)
        .catch( () => {
            listEl.innerHTML = "";
            Notify.failure('Oops, there is no country with that name');
        });
  }
}

function appendCountriesMarkup(countries) {
    if (countries.length > 9) {
    listEl.innerHTML = "";
    return Notify.info('Too many matches found. Please enter a more specific name.');
  }
  if (countries.length === 1) {
    listEl.innerHTML = currentCountryTpl(countries[0]);
  } else {
    listEl.innerHTML = countriesTplList(countries);
  }
}
