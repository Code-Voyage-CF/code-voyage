const express = require('express');
const router = express.Router();
const shoppingController = require('../controllers/shoppingController.js');
const { simpleAuthCheck } = require('../middleware/authorize');

router.get('/shopping-activities', simpleAuthCheck, shoppingController.getShoppingActivities);

module.exports = router;