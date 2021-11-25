const express = require('express');
const router = express.Router();

router.use('/my', require('./my'));

module.exports = router;
