const express = require('express');
const router = express.Router();
const Graph = require('../controllers/graphController.js');

router.post('/generareporte/:id', Graph.getDatosGraphPadre)

router.post('/generagraphadmin/:id', Graph.getDatosGraphAdmin)

router.post('/generagraphadminnon/:id', Graph.getDatosGraphAdminNoN)

router.post('/generagraphgrupo', Graph.getDatosGraphGrupo)

module.exports = router