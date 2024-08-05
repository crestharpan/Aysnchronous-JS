'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
//xml http request(old school way of doing AJAX)
const getCountryData = function (country) {
  console.log(country);
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v2/name/${country}`);
  //sending the request
  request.send();
  request.addEventListener('load', function () {
    //this keyword represents the request
    const [data] = JSON.parse(this.responseText); //transforms the objects into JSON format and destructuring the data array
    //The Json is- inside an array containing the object
    console.log(data);
    console.log(data.flag);
    const html = `<article class="country">
          <img class="country__img" src='${data.flags.png}' />
          <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data.population / 1000000
            ).toFixed(1)} Million</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${
              data.currencies[0].name
            }</p>
          </div>
        </article>`;
    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
  });
};
getCountryData('Portugal');
getCountryData('usa');
getCountryData('Nepal');
