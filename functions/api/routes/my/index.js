const express = require('express');
const router = express.Router();

router.get('/rent', require('./rentGET'));

module.exports = router;