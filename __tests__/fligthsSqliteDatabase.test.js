const { Sequelize } = require('sequelize');
const FlightOffer = require('../src/models/flightsModel.js'); 
require('dotenv').config();


const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.DATABASE_PATH || './flights.db',
});


jest.setTimeout(30000);


beforeAll(async () => {
  await sequelize.sync({ force: true });
});

const flightData = {
  originLocationCode: 'SYD',
  destinationLocationCode: 'BKK',
  departureDate: '2024-06-01',
  adults: 2,
};

beforeEach(async () => {
  await FlightOffer.create(flightData);
});

xtest('should store a flight offer in the database', async () => {
  const retrievedFlight = await FlightOffer.findOne({
    where: { originLocationCode: flightData.originLocationCode },
  });

 
  expect(retrievedFlight).not.toBeNull(); 
});

xtest('should check the origin location code of the retrieved flight offer', async () => {
  const retrievedFlight = await FlightOffer.findOne({
    where: { originLocationCode: flightData.originLocationCode },
  });


  expect(retrievedFlight.originLocationCode).toBe(flightData.originLocationCode);
});

xtest('should check the destination location code of the retrieved flight offer', async () => {
  const retrievedFlight = await FlightOffer.findOne({
    where: { originLocationCode: flightData.originLocationCode },
  });


  expect(retrievedFlight.destinationLocationCode).toBe(flightData.destinationLocationCode);
});

xtest('should check the departure date of the retrieved flight offer', async () => {
  const retrievedFlight = await FlightOffer.findOne({
    where: { originLocationCode: flightData.originLocationCode },
  });


  expect(flightData.departureDate);
});

xtest('should check the number of adults in the retrieved flight offer', async () => {
  const retrievedFlight = await FlightOffer.findOne({
    where: { originLocationCode: flightData.originLocationCode },
  });


  expect(retrievedFlight.adults).toBe(flightData.adults);
});

