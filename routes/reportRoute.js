const express = require('express');
const router = express.Router();
const Reportes = require('../controllers/reportController.js');

router.get('/helloWorld', Reportes.helloWorld);

router.get('/holamundo', Reportes.holaMundo)

router.post('/crearreporteea', Reportes.reporteEvaluacionArticulacion)

router.post('/crearreportehpv', Reportes.reporteHabilidadesPreVerbales)

router.post('/crearreporteprueba', Reportes.reportePrueba);

module.exports = router