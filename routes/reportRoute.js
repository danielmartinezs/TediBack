const express = require('express');
const router = express.Router();
const Reportes = require('../controllers/reportController.js');

router.get('/helloWorld', Reportes.helloWorld);

router.get('/getsemestre', Reportes.getSemestre)

router.post('/newsemestre', Reportes.cambiarSemestre)

router.post('/especificafechareporte', Reportes.especificaFechaReporte)

router.get('/getfechasalumnohpv/:id', Reportes.especificaFechaReportesHPV)

router.get('/getdatosreporte/:timestamp', Reportes.getDatosLatestReporte);

router.post('/uploadplansemestral', Reportes.uploadPlanSemestral);

router.get('/getplansemestral/:id', Reportes.getPlanSemestral);

router.post('/uploadreportesemestral', Reportes.uploadReporteSemestral);

router.post('/uploadreportehpv', Reportes.uploadReporteHPV);

router.post('/uploadreporteea', Reportes.uploadReporteEA);

module.exports = router