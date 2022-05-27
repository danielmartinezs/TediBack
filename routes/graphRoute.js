const express = require('express');
const router = express.Router();
const Graph = require('../controllers/graphController.js');

router.post('/generareporte/:id', Graph.getDatosGraph)

module.exports = router