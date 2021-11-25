const express = require('express');
const router = express.Router();

router.get('/rent', require('./rentGET'));
router.get('/recommend', require('./recommendGET'));
router.put('/favorite', require('./favoritePOST'));

module.exports = router;