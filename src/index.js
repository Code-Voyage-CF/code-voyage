var Amadeus = require('amadeus');
var dotenv = require('dotenv').config();

// dotenv.config();

// if (!process.env.AMADEUS_CLIENT_ID || !process.env.AMADEUS_CLIENT_SECRET) {
//   console.error("Please provide AMADEUS_CLIENT_ID and AMADEUS_CLIENT_SECRET in your environment variables.");
//   process.exit(1);
// }

var amadeus = new Amadeus({
  clientId: process.env.AMADEUS_CLIENT_ID,
  clientSecret: process.env.AMADEUS_CLIENT_SECRET
});

amadeus.shopping.flightOffersSearch.get({
    originLocationCode: 'SYD',
    destinationLocationCode: 'BKK',
    departureDate: '2022-08-01',
    adults: '2'
  }).then(function (response) {
    console.log(response);
  }).catch(function (response) {
    console.error(response);
  });