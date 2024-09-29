'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
////////////////////////////////////

const renderCountry = function (data, className = '') {
  const currency = Object.values(data.currencies)[0].name;
  const language = Object.values(data.languages)[0];
  const html = `<article class="country ${className}">
  <img class="country__img" src="${data.flags.png}" />
  <div class="country__data">
    <h3 class="country__name">${data.name.common}</h3>
    <h4 class="country__region">${data.continents[0]}</h4>
    <p class="country__row"><span>👫</span> ${(
      +data.population / 1000000
    ).toFixed(1)}M People</p>
    <p class="country__row"><span>🗣️</span>${language}</p>
    <p class="country__row"><span>💰</span>${currency}</p>
  </div>
</article> `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const getCountryAndNeighbour = function (country) {
  //AJAx call for country 1

  const request = new XMLHttpRequest();

  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText); //to get the first eelemtn of the array
    console.log(data);
    //country 1

    renderCountry(data);

    //getting the neighbour of country 1
    const [neighbour] = data.borders;

    if (neighbour == null) return;

    //for country 2
    const request2 = new XMLHttpRequest();

    request2.open(
      'GET',
      `https://restcountries.com/v3.1/alpha/${neighbour}
`
    );
    request2.send();

    request2.addEventListener('load', function () {
      const [data2] = JSON.parse(request2.responseText);
      renderCountry(data2, 'neighbour');
    });
  });
};

getCountryAndNeighbour('Portugal');
getCountryAndNeighbour('Nepal');
