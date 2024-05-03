const express = require('express');
const router = express.Router();
const signup = require('../middleware/signup');

router.post('/signup', signup);

module.exports = router;