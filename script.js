'use strict';
const getJson = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (response.ok == false) {
      throw new Error(`${errorMsg} ${response.status}`);
    }
    return response.json();
  });
};
//1. promise.Race
//first comer will takeover
(async function () {
  const res = await Promise.race([
    getJson(`https://restcountries.com/v2/name/italy`),
    getJson(`https://restcountries.com/v2/name/egypt`),
    getJson(`https://restcountries.com/v2/name/pakistan`),
  ]); //will return a new promise])
  console.log(res[0]);
})();

//2. promise.Allsettled
//it takes an array of promises and return an array of all settled promises
(async function () {
  const res = await Promise.allSettled([
    Promise.resolve('success'),
    Promise.reject('Error'),
    Promise.resolve('Anorther success'),
  ]).then(ress => console.log(ress[0])); //will return a new promise])
  // console.log(res.then(ress => console.log(ress)));
})();
//all
(async function () {
  const res = await Promise.all([
    Promise.resolve('success'),
    Promise.reject('Error'),
    Promise.resolve('Anorther success'),
  ]).then(ress => console.log(ress)); //will return a new promise])
  // console.log(res.then(ress => console.log(ress))); //shortcircuit if there is one rejected promise
})();

//3. promise.any
(async function () {
  const res = await Promise.any([
    Promise.resolve('success'),
    Promise.reject('Error'),
    Promise.resolve('Anorther success'),
  ]).then(ress => console.log(ress)); //will return a new promise])
  // console.log(res.then(ress => console.log(ress))); // rejected promises are ignored
})();
