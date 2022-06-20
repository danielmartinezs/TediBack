const express = require('express');
const router = express.Router();
const Cuestionarios = require('../controllers/questionaireController.js');

router.post('/editquestionairename', Cuestionarios.editarNombreCuestionario);

router.post('/newanswerquestion', Cuestionarios.ingresaPreguntaRespuesta);

router.get('/getquestions', Cuestionarios.getQuestions);

router.post('/editquestion', Cuestionarios.editQuestion);

router.post('/editcreatequestion', Cuestionarios.editAndCreateQuestion);

router.post('/borraquestion/:id', Cuestionarios.borraQuestion);

router.post('/addquestion', Cuestionarios.addQuestion);

router.get('/getanswers', Cuestionarios.getAnswers);

router.get('/getanswer/:id', Cuestionarios.getAnswer);

router.post('/editanswer', Cuestionarios.editAllAnswers);

router.post('/editcreateanswer', Cuestionarios.editAndCreateAnswers);

router.post('/borraanswer/:id', Cuestionarios.borraAnswer);

router.post('/deleteqa', Cuestionarios.deleteQA);

router.get('/getquestionnairesdetails/:id', Cuestionarios.getQuestionnairesDetails);

router.get('/getrecententry/:id', Cuestionarios.getLatestEntry);

router.get('/getcuestionarios', Cuestionarios.getCuestionarios);

router.post('/uploadquestionnaire', Cuestionarios.uploadQuestionnaires);

router.post('/uploadnewquestionnaire', Cuestionarios.uploadNewQuestionnaire);

router.post('/edituploadedquestionnaire', Cuestionarios.editUploadedQuestionnaire);

router.post('/deletequestionnaire/:id', Cuestionarios.borrarCuestionario);

router.post('/vincularqa', Cuestionarios.vincularQA);

router.post('/establishnewkeys', Cuestionarios.establishKeys);

router.post('/establishnewkey', Cuestionarios.establishKey);

router.get('/whereanswerlink/:idp/:idr', Cuestionarios.whereAnswerLink);

router.get('/checklinkanswer/:id', Cuestionarios.checkLinkAnswer);

router.get('/answersused', Cuestionarios.answersInUse);

router.get('/wherequestionlink/:idr/:idp', Cuestionarios.whereQuestionLink);

router.get('/checklinkquestion/:id', Cuestionarios.checkLinkQuestion);

router.get('/questionsused', Cuestionarios.questionsInUse);

module.exports = router;