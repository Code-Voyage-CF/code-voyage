const { Sequelize } = require('sequelize');
const LodgingOffer = require('../src/models/lodgingModel.js');
require('dotenv').config();

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.DATABASE_PATH || './lodgings.db',
});

jest.setTimeout(30000);

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

const lodgingData = {
  hotelIds: 'RTPAR001',
  checkInDate: '2024-10-10',
  checkOutDate: '2024-10-13',
  adults: 2,
};

beforeEach(async () => {
  await LodgingOffer.create(lodgingData);
});

xtest('should store a lodging offer in the database', async () => {
  const retrievedLodging = await LodgingOffer.findOne({
    where: { hotelIds: lodgingData.hotelIds },
  });

  expect(retrievedLodging).not.toBeNull();
});

xtest('should check the hotelIds of the retrieved lodging offer', async () => {
  const retrievedLodging = await LodgingOffer.findOne({
    where: { hotelIds: lodgingData.hotelIds },
  });

  expect(retrievedLodging.hotelIds).toBe(lodgingData.hotelIds);
});


xtest('should check the checkInDate of the retrieved lodging offer', async () => {
  const retrievedLodging = await LodgingOffer.findOne({
    where: { hotelIds: lodgingData.hotelIds },
  });

  expect(retrievedLodging.checkInDate).toBe(lodgingData.checkInDate);
});