const express = require('express');
const router = express.Router();

router.get('/rent', require('./rentGET'));
router.get('/recommend', require('./recommendGET'));

module.exports = router;