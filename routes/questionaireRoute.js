const express = require('express');
const router = express.Router();
const Cuestionarios = require('../controllers/questionaireController.js');

router.post('/newquestionaire', Cuestionarios.ingresaCuestionario);

router.post('/newansweredquestion', Cuestionarios.ingresaPreguntaRespuesta);

router.get('/getquestions', Cuestionarios.getQuestions);

router.get('/getanswers', Cuestionarios.getAnswers);

router.get('/getquestionnairesdetails', Cuestionarios.getQuestionnaires);

router.get('/getcuestionarios', Cuestionarios.getCuestionarios);

router.post('/uploadquestionnaire', Cuestionarios.uploadQuestionnaires);

router.post('/uploadnewquestionnaire', Cuestionarios.uploadNewQuestionnaire);

router.post('/establishnewkeys', Cuestionarios.establishKeys)

module.exports = router;