'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
//xml http request(old school way of doing AJAX)
const renderCountry = function (data, className = '') {
  const html = `<article class="country ${className}">
  <img class="country__img" src='${data.flag}' />
  <div class="country__data">
    <h3 class="country__name">${data.name}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${(
      +data.population / 1000000
    ).toFixed(1)} Million</p>
    <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
    <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
  </div>
</article>`;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};
const getCountryAndNeighbour = function (country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v2/name/${country}`);
  //sending the request
  request.send();
  request.addEventListener('load', function () {
    //this keyword represents the request

    const [data] = JSON.parse(this.responseText); //transforms the objects into JSON format and destructuring the data array
    //The Json is- inside an array containing the object
    //Render COuntry 1
    renderCountry(data);
    //Get neightbour country
    const neighbour = data.borders;

    if (!neighbour) return;
    //AJAx call 2

    const request2 = new XMLHttpRequest();
    request2.open(
      'GET',
      `https://restcountries.com/v2/alpha/${neighbour}
`
    );
    //sending the request
    request2.send();
    request2.addEventListener('load', function () {
      const data2 = JSON.parse(this.responseText); //object is returned since each country has unique country code
      renderCountry(data2, 'neighbour');
    });
  });
};
getCountryAndNeighbour('portugal');
//replacing the older with modern XML API call
//fetch function returns a promise
const request = fetch('https://restcountries.com/v2/name/portugal'); //GET method
