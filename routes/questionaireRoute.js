const express = require('express');
const router = express.Router();
const Cuestionarios = require('../controllers/questionaireController.js');

router.post('/newquestionaire', Cuestionarios.ingresaCuestionario);

router.post('/newansweredquestion', Cuestionarios.ingresaPreguntaRespuesta);

router.get('/getquestions', Cuestionarios.getQuestions);

router.post('/editquestion', Cuestionarios.editQuestion);

router.post('/addquestion', Cuestionarios.addQuestion);

router.get('/getanswers', Cuestionarios.getAnswers);

router.get('/getanswer/:id', Cuestionarios.getAnswer);

router.post('/editanswer', Cuestionarios.editAllAnswers);

router.post('/editcreateanswer', Cuestionarios.editAndCreateAnswers);

router.get('/getquestionnairesdetails/:id', Cuestionarios.getQuestionnairesDetails);

router.get('/getrecententry/:id', Cuestionarios.getLatestEntry);

router.get('/getcuestionarios', Cuestionarios.getCuestionarios);

router.post('/uploadquestionnaire', Cuestionarios.uploadQuestionnaires);

router.post('/uploadnewquestionnaire', Cuestionarios.uploadNewQuestionnaire);

router.post('/edituploadedquestionnaire', Cuestionarios.editUploadedQuestionnaire);

router.post('/deletequestionnaire/:id', Cuestionarios.borrarCuestionario);

router.post('/establishnewkeys', Cuestionarios.establishKeys)

module.exports = router;