const express = require('express');
const router = express.Router();

router.get('/', require('./reserveGET'))

module.exports = router;