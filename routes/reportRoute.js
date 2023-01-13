const express = require('express');
const router = express.Router();
const Reportes = require('../controllers/reportController.js');

router.get('/getsemestre', Reportes.getSemestre);

router.get('/getsemestres', Reportes.getSemestres);

router.post('/newsemestre', Reportes.cambiarSemestre);

router.post('/especificafechareporte', Reportes.especificaFechaReporte);

router.get('/getdatosreporte/:timestamp', Reportes.getDatosLatestReporte);

router.post('/getreportesalumno/:id', Reportes.getReportesAlumno);

router.post('/getreportesalumnodisp/:id/:semestre', Reportes.getReportesAlumnoDisponible);

router.post('/uploadplansemestral', Reportes.uploadPlanSemestral);

router.get('/getplansemestral/:id', Reportes.getPlanSemestral);

router.post('/uploadreportesemestral', Reportes.uploadReporteSemestral);

router.post('/newruta', Reportes.uploadRuta);

router.post('/uploadreportehpv', Reportes.uploadReporteHPV);

router.post('/uploadreporteea', Reportes.uploadReporteEA);

router.post('/publishreporte', Reportes.publicarReporte);

module.exports = router