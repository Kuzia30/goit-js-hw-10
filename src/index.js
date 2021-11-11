import './css/styles.css';
import  debounce  from "lodash.debounce";
const DEBOUNCE_DELAY = 300;

import { fetchCountries } from "./js/fetchCountries";


const textEl = document.querySelector('#search-box');



textEl.addEventListener('input', debounce(onCountriesFetch, DEBOUNCE_DELAY))
function onCountriesFetch(evt) {
    const array = fetchCountries(evt.target.value);
}