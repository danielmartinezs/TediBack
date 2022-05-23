const express = require('express');
const router = express.Router();
const userManager = require('../controllers/userManagementController.js');

router.post('/newtutor', userManager.ingresaTutor);

router.post('/newadmin', userManager.ingresaAdmin);

router.get('/getadmins', userManager.getAdmins);

router.get('/getalumnos', userManager.getAlumnos);

router.get('/gettutores', userManager.getTutores);

router.post('/editatutor', userManager.editaTutor);

router.post('/editaalumno', userManager.editaAlumno);

router.post('/editaadmin', userManager.editaAdmin);

router.post('/borratutor/:id', userManager.borraTutor);

router.post('/borraadmin/:id', userManager.borraAdmin);

router.post('/newhito', userManager.ingresaHito);

router.post('/borrahito/:id', userManager.borraHito);

router.post('/editahito', userManager.editaHito);

router.get('/gethitosa/:id', userManager.getHitosAlumno);

module.exports = router;