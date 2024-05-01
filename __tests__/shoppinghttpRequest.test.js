const request = require('supertest');
const app = require('../app'); // Assuming your Express app is in app.js
const { AmadeusShoppingActivities } = require('../models/shoppingModel');

jest.mock('../models/shoppingModel', () => ({
  AmadeusShoppingActivities: jest.fn().mockImplementation(() => ({
    getShoppingActivities: jest.fn().mockResolvedValue([
      { name: 'Shopping Activity 1', category: 'Category 1', rating: 4.5, price: 100 },
      { name: 'Shopping Activity 2', category: 'Category 2', rating: 4.0, price: 80 },
    ]),
  })),
}));

describe('GET /shopping-activities', () => {
  it('responds with shopping activities', async () => {
    const response = await request(app).get('/shopping-activities?cityCode=PAR');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      { name: 'Shopping Activity 1', category: 'Category 1', rating: 4.5, price: 100 },
      { name: 'Shopping Activity 2', category: 'Category 2', rating: 4.0, price: 80 },
    ]);
  });

  it('responds with error if city code is missing', async () => {
    const response = await request(app).get('/shopping-activities');
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'Missing required parameters' });
  });
});