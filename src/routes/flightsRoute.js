const express = require('express');
const router = express.Router();
const flightController = require('../controllers/flightController.js');

router.get('/flight-offers', flightController.getFlightOffers);

module.exports = router;
