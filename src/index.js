import Notiflix from 'notiflix';
import './css/styles.css';
const DEBOUNCE_DELAY = 300;
import _ from 'lodash';
import { fetchCountries } from './fetchCountries.js';

const input = document.getElementById('search-box');
const output = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

input.addEventListener(
  'input',
  _.debounce(() => {
   let name = input.value.trim();
    return fetchCountries(name)
      .then(countries => renderCountryList(countries))
      .catch(error => {
        Notiflix.Notify.failure('Oops, there is no country with that name');
      });
  }, DEBOUNCE_DELAY)
);

function renderCountryList(countries) {
  if (countries.length >= 2){
    const markup = countries
      .map(country => {
        return `<li>
                    <img src=${country.flags.svg} width="30" height="30"/><p>${country.name.official}</p>
                </li>`
      })
      .join(' ');
    output.innerHTML = markup;
  }
  else if (countries.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    )
  }
   else if (countries.length === 1) {
    const add = countries
      .map(country => {
        return `<p><img src=${country.flags.svg} width="30" height="30" /></p>
            <p>${country.name.official}</p>
            <p>Population: ${country.population}</p>
            <p>Capital: ${country.capital}</p>
            <p>Languages: ${Object.values(country.languages)}</p>`;
      })
      .join(' ');
    countryInfo.innerHTML = add;
  } else {
    Notiflix.Notify.failure('Oops, there is no country with that name');
  }
}
