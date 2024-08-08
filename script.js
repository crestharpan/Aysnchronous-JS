'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
const renderCountry = function (data, className = '') {
  console.log('Hi');
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

//promisifying the geolocaton position

//converting the above callBack API to promise based API
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};
getPosition().then(pos => console.log(pos));

//consuming promises with async await
const whereAmI = async function () {
  //geolocation
  const pos = await getPosition();
  const { latitude: lat, longitude: lng } = pos.coords;
  //reverse geoCoding
  // fetch(`https://restcountries.com/v2/alpha/${country}`).then(res=>console.log(res));
  //same as
  const resGeo = await fetch(
    `https:api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
  );
  const dataGeo = await resGeo.json();
  console.log(dataGeo.countryName);
  const res = await fetch(
    `https://restcountries.com/v2/name/${dataGeo.countryName}`
  ); //reserved value of the promise
  console.log(res);
  const data = await res.json();
  console.log(data);
  renderCountry(data[0]);
};
whereAmI();
