const FlightOffer = require('../src/models/flightsModel.js'); // Import the FlightOffer model
const sequelize = require('sequelize'); // Import Sequelize

beforeAll(async () => {
  await sequelize.sync({ force: true }); // Reset the database before running tests
});

xtest('should store the flight offer in the database', async () => {
  // Use the data from the HTTP request test
  const flightData = apiResponseData.data[0]; // First item from the response

  // Insert the data into the database
  await FlightOffer.create({
    originLocationCode: flightData.originLocationCode,
    destinationLocationCode: flightData.destinationLocationCode,
    departureDate: flightData.departureDate,
    adults: flightData.adults,
  });

  // Retrieve the record from the database
  const retrievedFlight = await FlightOffer.findOne({
    where: { originLocationCode: flightData.originLocationCode },
  });

  expect(retrievedFlight).not.toBeNull(); // Ensure the record is in the database
  expect(retrievedFlight.originLocationCode).toBe(flightData.originLocationCode); // Check origin
  expect(retrievedFlight.destinationLocationCode).toBe(flightData.destinationLocationCode); // Check destination
  expect(retrievedFlight.departureDate.toISOString()).toBe(flightData.departureDate); // Check date
  expect(retrievedFlight.adults).toBe(flightData.adults); // Check adults
});
