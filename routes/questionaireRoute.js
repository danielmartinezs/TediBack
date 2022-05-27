const express = require('express');
const router = express.Router();
const Cuestionarios = require('../controllers/questionaireController.js');

router.post('/newquestionaire', Cuestionarios.ingresaCuestionario);

router.post('/newansweredquestion', Cuestionarios.ingresaPreguntaRespuesta);

router.get('/getquestions', Cuestionarios.getQuestions);

router.post('/editquestion', Cuestionarios.editQuestion);

router.get('/getanswers', Cuestionarios.getAnswers);

router.get('/getanswer/:id', Cuestionarios.getAnswer);

router.get('/getquestionnairesdetails/:id', Cuestionarios.getQuestionnairesDetails);

router.get('/getrecententry/:id', Cuestionarios.getLatestEntry);

router.get('/getcuestionarios', Cuestionarios.getCuestionarios);

router.post('/uploadquestionnaire', Cuestionarios.uploadQuestionnaires);

router.post('/edituploadedquestionnaire', Cuestionarios.editUploadedQuestionnaire);

router.post('/editquestionnaire/:id', Cuestionarios.editQuestionnaire);

router.post('/uploadnewquestionnaire', Cuestionarios.uploadNewQuestionnaire);

router.post('/establishnewkeys', Cuestionarios.establishKeys)

module.exports = router;