const express = require('express');
const router = express.Router();
const Graph = require('../controllers/graphController.js');

router.post('/generareporte/:id', Graph.getDatosGraphPadre)

router.post('/generagraphadmin/:id', Graph.getDatosGraphAdmin)

module.exports = router