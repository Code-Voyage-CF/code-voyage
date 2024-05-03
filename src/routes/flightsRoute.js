const express = require('express');
const router = express.Router();
const flightController = require('../controllers/flightController.js');
const { simpleAuthCheck } = require('../middleware/authorize'); 

router.get('/flight-offers', simpleAuthCheck, flightController.getFlightOffers);

module.exports = router;
