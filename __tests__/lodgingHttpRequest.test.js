const LodgingOffer = require('../src/models/lodgingModel.js');
const Amadeus = require('amadeus');
const { Sequelize } = require('sequelize');
require('dotenv').config();

const amadeus = new Amadeus({
  clientId: process.env.AMADEUS_CLIENT_ID,
  clientSecret: process.env.AMADEUS_CLIENT_SECRET,
});

jest.setTimeout(30000);

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.DATABASE_PATH || './hotels.db',
});

beforeAll(async () => {
  await sequelize.sync();
});

let hotelOffers;


beforeEach(async () => {
  const response = await amadeus.shopping.hotelOffersSearch.get({
    hotelIds: 'RTPAR001',
    adults: '2',
    checkInDate: '2024-10-10',
    checkOutDate: '2024-10-13',
  });

  hotelOffers = response.data;
});

xtest('should retrieve response data from hotel offers', () => {
  expect(hotelOffers).toBeTruthy();
});

xtest('should retrieve an array of hotel offers', () => {
  expect(Array.isArray(hotelOffers)).toBe(true);
});

xtest('should retrieve hotel offer object', () => {
  expect(hotelOffers);
});

xtest('should store the first hotel offer in the database', async () => {
  const firstOffer = hotelOffers.slice(0, 5);

  const insertedOffer = await LodgingOffer.bulkCreate(firstOffer, { ignoreDuplicates: true });

  expect(insertedOffer.length).toBe(1);
});

