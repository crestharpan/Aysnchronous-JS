'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
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
  // countriesContainer.style.opacity = 1;
};
const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  // countriesContainer.style.opacity = 1;
};
const getJson = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (response.ok == false) {
      throw new Error(`${errorMsg} ${response.status}`);
    }
    return response.json();
  });
};
//steps happening within each line of code
//replacing the older with modern XML API call
//fetch function returns a promise
// const request = fetch('https://restcountries.com/v2/name/portugal'); //GET method
// const getCountryData = function (country) {
//   //the then function gets a callback function and callback function takes one argument which is the resulting value
//   fetch(`https://restcountries.com/v2/name/${country}`)
//     .then(function (response) {
//       console.log(response);
//       return response.json(); //the json method is available to all the value holding the result(for this response) aslo returns promise
//     })
//     .then(function (data) {
//       console.log(data); //holds the data of the response
//       renderCountry(data[0]);
//     });
// };
//flat chain of promises
// const request = fetch('https://restcountries.com/v2/name/portugal'); //GET method

// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v2/name/${country}`)
//     .then(response => {
//       // console.log(response); //to check the status of API
//       //if user inputs a invalid country name
//       if (response.ok == false) {
//         throw new Error(`country not found ${response.status}`);
//       }
//       return response.json();
//     })
//     .then(function (data) {
//       renderCountry(data[0]);
//       //neighbour country of country
//       const neighbour1 = data[0].borders[0];
//       //inase of an invalid neighbouring country
//       if (!neighbour1) return;
//       return fetch(`https://restcountries.com/v2/alpha/${neighbour1}`); //always return a promise to avoid callBack hell
//     })
//     .then(response => {
//       if (response.ok == false) {
//         throw new Error(`country not found ${response.status}`);
//       }
//       return response.json();
//     })
//     .then(data => renderCountry(data, 'neighbour'))
//     .catch(err => {
//       renderError(err);
//       console.log(`${err} Try again!!`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };
// btn.addEventListener('click', function () {
//   getCountryData('Portugal');
// });

const getCountryData = function (country) {
  getJson(
    `https://restcountries.com/v2/name/${country}`,
    'country not found'
  ).then(function (data) {
    renderCountry(data[0]);
    //neighbour country of country
    const neighbour1 = data[0].borders[0];
    //inase of an invalid neighbouring country
    if (!neighbour1) throw new Error('No Neighbours found');
    return getJson(
      `https://restcountries.com/v2/alpha/${neighbour1}`,
      'country not found'
    )
      .then(data => renderCountry(data, 'neighbour'))
      .catch(err => {
        renderError(err);
        console.log(`${err} Try again!!`);
      })
      .finally(() => {
        countriesContainer.style.opacity = 1;
      });
  });
};
btn.addEventListener('click', function () {
  getCountryData('Portugal');
});
//eventLoop
console.log('Test start'); //This will be executed first
setTimeout(() => console.log('timer'), 0); //executes after promise //last
Promise.resolve('Resolved promise 1').then(res => console.log(res)); //Third(microTask queue)
console.log('Test end'); //second
