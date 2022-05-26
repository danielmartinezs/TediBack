const express = require('express');
const router = express.Router();
const Reportes = require('../controllers/reportController.js');

router.get('/generareporte', Reportes.descargaReporte)

router.get('/holamundo', Reportes.holaMundo)

module.exports = router