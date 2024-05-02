const Amadeus = require('amadeus');
const { Sequelize } = require('sequelize');
const FlightOffer = require('../src/models/flightsModel.js'); 
require('dotenv').config();


const amadeus = new Amadeus({
  clientId: process.env.AMADEUS_CLIENT_ID,
  clientSecret: process.env.AMADEUS_CLIENT_SECRET,
});


jest.setTimeout(10000);


const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.DATABASE_PATH || './flights.db',
});

beforeAll(async () => {
  await sequelize.sync();
});

let flightOffers;


beforeEach(async () => {
  const response = await amadeus.shopping.flightOffersSearch.get({
    originLocationCode: 'SYD',
    destinationLocationCode: 'BKK',
    departureDate: '2024-06-01',
    adults: '2',
  });

  flightOffers = response.data;
});


test('should retrieve response data from flight offers', () => {
  expect(flightOffers).toBeTruthy();
});


test('should retrieve an array of flight offers', () => {
  expect(Array.isArray(flightOffers)).toBe(true);
});


test('should retrieve flight offer object', () => {
  expect(flightOffers);
});


test('should store the first five flight offers in the database', async () => {
  const firstFiveOffers = flightOffers.slice(0, 5);

  const insertedOffers = await FlightOffer.bulkCreate(firstFiveOffers, { ignoreDuplicates: true });


  expect(insertedOffers.length).toBe(5);
});
