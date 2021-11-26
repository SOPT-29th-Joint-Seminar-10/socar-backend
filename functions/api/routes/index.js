const express = require('express');
const router = express.Router();

router.use('/my', require('./my'));
router.use('/reserve', require('./reserve'));

module.exports = router;
