const request = require('supertest');
const express = require('express');
const dotenv = require('dotenv').config();
const flightRoutes = require('../src/routes/flightsRoute.js');
const shoppingRoutes = require('../src/routes/shoppingRoute.js');
const lodgingRoutes = require('../src/routes/lodgingRoute.js');

const app = express();
app.use(express.json());

app.use('/flights', flightRoutes);
app.use('/shopping', shoppingRoutes);
app.use('/lodging', lodgingRoutes);

describe('Authorization Token Verification Tests', () => {
  const validToken = process.env.AUTH_TOKEN;

  test("should return 401 if no authorization token is provided (flights)", async () => {
    const response = await request(app).get('/flights/flight-offers');
    expect(response.status).toBe(401);
    expect(response.body.error).toBe('No authorization token provided.');
  });

  test("should allow access with a valid token (flights)", async () => {
    const response = await request(app).get('/flights/flight-offers')
      .set('Authorization', `Bearer ${validToken}`);
    expect(response.status).toBe(200);
  });

  test("should return 401 if no authorization token is provided (shopping)", async () => {
    const response = await request(app).get('/shopping/shopping-activities');
    expect(response.status).toBe(401);
    expect(response.body.error).toBe('No authorization token provided.');
  });

  test("should allow access with a valid token (shopping)", async () => {
    const response = await request(app).get('/shopping/shopping-activities')
      .set('Authorization', `Bearer ${validToken}`);
    expect(response.status).toBe(200);
  });

  test("should return 401 if no authorization token is provided (lodging)", async () => {
    const response = await request(app).get('/lodging/hotel-offers');
    expect(response.status).toBe(401);
    expect(response.body.error).toBe('No authorization token provided.');
  });

  test("should allow access with a valid token (lodging)", async () => {
    const response = await request(app).get('/lodging/hotel-offers')
      .set('Authorization', `Bearer ${validToken}`);
    expect(response.status).toBe(200);
  });
});
