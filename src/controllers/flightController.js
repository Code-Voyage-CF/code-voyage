const amadeus = require('../config/amadeus.js'); 
const FlightOffer = require('../models/flightsModel.js');

exports.getFlightOffers = async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ error: 'Authorization token is missing.' });
  }

  const { origin, destination, departureDate, adults } = req.query;

  if (!origin || !destination || !departureDate || !adults) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  try {
    const response = await amadeus.shopping.flightOffersSearch.get({
      originLocationCode: origin,
      destinationLocationCode: destination,
      departureDate,
      adults,
    });

    res.status(200).json(response.data);

  } catch (error) {
    res.status(500).json({ error: error.response ? error.response.data : error.message });
  }
};
