const express = require('express');
const router = express.Router();
const loginControl = require('../controllers/loginController.js');

//get para obtener los datos
//post mandar/insertar datos al front
router.post('/', loginControl.login);

router.post('/hashed/:id', loginControl.hashpass);

module.exports = router;