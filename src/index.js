const Amadeus = require('amadeus');

const dotenv = require('dotenv').config();

const amadeus = new Amadeus({
  clientId: 'Gyn48TPDX6ZMOmG3TzXw97gfoS7dsG7A',
  clientSecret: 'OuNGK4DUoTFuMmxr'
});


amadeus.shopping.flightOffersSearch.get({
    originLocationCode: 'SYD',
    destinationLocationCode: 'BKK',
    departureDate: '2024-06-21',
    adults: '2'
}).then(function(response){
  console.log(response.data);
}).catch(function(responseError){
  console.log(responseError.code);
});
