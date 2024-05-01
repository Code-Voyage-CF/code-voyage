const express = require('express');
const supertest = require('supertest'); // To test HTTP requests
const app = require('../server.js'); // Import your Express app

// Test to send a GET request to your flight offers endpoint
describe('GET /api/flight-offers', () => {
  test('should get flight offers from Amadeus API', async () => {
    const response = await supertest(app) // Use Supertest to send HTTP requests
      .get('/api/flight-offers') // Route to your endpoint
      .query({
        origin: 'SYD', // Origin IATA code
        destination: 'BKK', // Destination IATA code
        departureDate: '2024-06-01', // Departure date
        adults: 2, // Number of adult passengers
      })
      .expect(200); // Expect HTTP status 200 if successful

    expect(response.body).toBeDefined(); // Ensure response body is defined
    expect(response.body.data).toBeDefined(); // Check `data` field
    expect(response.body.data.length).toBeGreaterThan(0); // Ensure there's at least one flight offer
  });
});
