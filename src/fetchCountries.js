import { Notify } from "notiflix";
const inputEl = document.getElementById('search-box');

const API_URL = 'https://restcountries.com/v3.1/name';

export const fetchCountries = name => {
  return fetch(
    `${API_URL}/${name}?fields=name,capital,population,flags,languages`
  )
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      if (!res.ok) {
        throw new error(res.status);
      }
    })
    .catch(error =>
      Notify.failure('Oops, there is no country with that name')
    );
};

inputEl.addEventListener('input', () => {
    const name = inputEl.value;

    try {
        fetchCountries(name).then((data) => console.log(data));
    } catch (error) {
       Notify.failure('Oops, there is no country with that name');
    }
    });
