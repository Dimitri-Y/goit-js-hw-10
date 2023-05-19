function renderCountries(countries) {
  return countries
    .map(({ name, flags }) => {
      return `<li>
      <img src=${flags.svg} alt="${flags.alt}"  class="svg">
      <p class=""text">${name.official}</p>
    </li>`;
    })
    .join('');
}

function renderCountry(countries) {
  const { name, flags, capital, languages, population } = countries[0];
  return `<li>
    <img src=${flags.svg} alt=${flags.alt} class="svg countries">
    <h2 class="name_countries">${name.official}</h2>
  </li>
  <h5 class="text_country">Capital: <span class="text"> ${capital}</span></h5>
  <h5 class="text_country">Population: <span class="text"> ${population}</span></h5>
  <h5 class="text_country">Languages: <span class="text"> ${Object.values(
    languages
  )}</span></h5> `;
}

export { renderCountries, renderCountry };
