const express = require('express');
const router = express.Router();
const Reportes = require('../controllers/reportController.js');

router.get('/helloWorld', Reportes.helloWorld);

router.get('/getsemestre', Reportes.getSemestre)

router.post('/newsemestre', Reportes.cambiarSemestre)

router.get('/getfechasalumnohpv/:id', Reportes.especificaFechaReportesHPV)

router.get('/holamundo', Reportes.holaMundo)

router.post('/crearreporteea', Reportes.reporteEvaluacionArticulacion)

router.post('/crearreportehpv', Reportes.reporteHabilidadesPreVerbales)

router.get('/getdatosreporte/:timestamp', Reportes.getDatosLatestReporte);

router.post('/uploadplansemestral', Reportes.uploadPlanSemestral);

router.get('/getplansemestral/:id', Reportes.getPlanSemestral);

router.post('/uploadreportesemestral', Reportes.uploadReporteSemestral);

router.post('/uploadreportehpv', Reportes.uploadReporteHPV);

router.post('/uploadreporteea', Reportes.uploadReporteEA);

module.exports = router