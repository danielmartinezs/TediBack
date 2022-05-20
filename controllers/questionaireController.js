const { response } = require('express');
const express = require('express');
const dbconnect = require('../config/dbConnection.js');

const ingresaCuestionario = async (req, res) => {
    const { nombreCues,  } = req.body;
}

const ingresaPreguntaRespuesta = async (req, res) => {
    const { idp, idr, comment, answer } = req.body;
    if(!idp || !idr || !comment || !answer){
        return res.status(400).send({ success: false, message: 'No puedes dejar campos vacíos'})
    }
    dbconnect.query('INSERT INTO `pregunta-respuesta`(idPregunta, idRespuesta, comentario, seleccionada) VALUES (?, ?, ?, ?)', [idp, idr, comment, answer], (err, response, fields) => {
        if(err)
            console.log(err)
        else{
            response.message = "Se ha ingresado una nueva pregunta!"
            return res.status(200).json(response)
        }
    })
}

const getQuestions = async (req, res) => {
    dbconnect.query('SELECT idPregunta, pregunta, tipo FROM preguntas', (error, response) => {
        if(error)
            console.log(error)
        else{
            res.send(response);
        }
    })
}

const getAnswers = async (req, res) => {
    dbconnect.query('SELECT idRespuesta AS id, opciones FROM respuesta', (error, response) => {
        if(error)
            console.log(error)
        else{
            res.send(response);
        }
    })
}

const getCuestionarios = async (req, res) => {
    dbconnect.query('SELECT idCuestionario, nombre, materia FROM cuestionario', (error, response, fields) => {
        if(error)
            console.log(error)
        else{
            res.send(response);
        }
    })
}

const getQuestionnaires = async (req, res) => {
    const { idcs } = req.body;

    dbconnect.query('SELECT * FROM cuestionario_preguntas_respuestas', (error, response, fields) => {
        if(error)
            console.log(error)
        else{
            res.send(response);
        }
    })
}

const uploadQuestionnaires = async (req, res) => {
    const { idc, respuestas } = req.body
    if(!idc || !respuestas){
        return res.status(400).send({ success: false, message: 'No puedes dejar campos vacíos'})
    }
    for(let i = 0; i<respuestas.length; i++){
        let idpregunta = respuestas[i].id;
        let respuesta = respuestas[i].value;
        let comentario = respuestas[i].comment;
        dbconnect.query('UPDATE `cuestionario_preguntas_respuestas` SET comentario = ?, seleccionada = ? WHERE idCuestionario = ? AND idPregunta = ?', [comentario, respuesta, idc, idpregunta], (error, response, fields) => {
            if(error)
                console.log(error)
        })
    }
    return res.status(200).json(response)
}

const validaNewQuestion = async (req, res) => {
    const { idp, ques } = req.body
    dbconnect.query('')
}

const uploadNewQuestionnaire = async (req, res) => {
    const { idc, nombrec, materia, qa } = req.body
    if(!idc || !nombrec || !materia  || !qa){
        return res.status(400).send({ success: false, message: 'No puedes dejar campos vacíos'})
    }
    dbconnect.query('INSERT INTO cuestionario(idCuestionario, nombre, materia) VALUES (?,?,?)', [idc, nombrec, materia], (er, re) => {
        if(er)
            console.log(er)
    })
    for(let i = 0; i<qa.length; i++){
        let idpregunta = qa[i].idPregunta;
        console.log(idpregunta)
        let idrespuesta = qa[i].idRespuesta;
        console.log(idrespuesta)
        let respuesta = qa[i].respuesta;
        console.log(respuesta)
        let pregunta = qa[i].pregunta;
        console.log(pregunta)
        let tipop = qa[i].tipop;
        console.log(tipop)
        dbconnect.query('SELECT idRespuesta FROM respuesta WHERE opciones = ?', [respuesta], (er, re) => {
            if(er)
                console.log(er)
            else if(re.length  !== 0){
                idrespuesta = re[0].idRespuesta;
            }
            else if(re.length === 0){
                dbconnect.query('INSERT INTO respuesta(idRespuesta, opciones) VALUES (?,?)', [idrespuesta, respuesta], (err, res) => {
                    if(err)
                        console.log(err)
                })
            }
        })
        dbconnect.query('SELECT idPregunta FROM preguntas WHERE pregunta = ?', [pregunta], (er, re) => {
            if(er)
                console.log(er)
            else if(re.length !== 0){
                idpregunta = re[0].idPregunta;
            }
            else if(re.length === 0){
                dbconnect.query('INSERT INTO preguntas(idPregunta, pregunta, tipo) VALUES (?,?,?)', [idpregunta, pregunta, tipop], (err, res) => {
                    if(err)
                        console.log(err)
                })
            }
        })
    }
    return res.status(200)
}

const establishKeys = async (req, res) => {
    const { idc, qa } = req.body
    if(!idc || !qa){
        return res.status(400).send({ success: false, message: 'No puedes dejar campos vacíos'})
    }
    for(let i = 0; i<qa.length; i++){
        let idpregunta = qa[i].idPregunta;
        console.log(idpregunta)
        let idrespuesta = qa[i].idRespuesta;
        console.log(idrespuesta)
        dbconnect.query('SELECT idPregunta FROM `pregunta-respuesta` WHERE idRespuesta = ?', [idrespuesta], (er, re) => {
            if(er)
                console.log(er)
            else if(re.length !== 0){
                for(let j = 0; j<re.length; j++){
                    if(re[j].idPregunta === idpregunta){
                        dbconnect.query('INSERT INTO `pregunta-respuesta`(`idPregunta`, `idRespuesta`, `comentario`, `seleccionada`) VALUES (?,?,"","")', [re[j].idPregunta, idrespuesta], (err, resp) => {
                            if(err)
                                console.log(err)
                        })
                        dbconnect.query('INSERT INTO `cuestionario-pregunta`(`idCuestionario`, `idPregunta`, `idRespuesta`) VALUES (?,?,?)', [idc, re[j].idPregunta, idrespuesta], (err, resp) => {
                            if(err)
                                console.log(err)
                            else{
                                return res.status(200)
                            }
                        })
                    }
                }
            }
        })
        dbconnect.query('SELECT idRespuesta FROM `pregunta-respuesta` WHERE idPregunta = ?', [idpregunta], (er, re) => {
            if(er)
                console.log(er)
            else if(re.length !== 0){
                for(let j = 0; j<re.length; j++){
                    if(re[j].idRespuesta === idrespuesta){
                        dbconnect.query('INSERT INTO `pregunta-respuesta`(`idPregunta`, `idRespuesta`, `comentario`, `seleccionada`) VALUES (?,?,"","")', [idpregunta, re[j].idRespuesta], (err, resp) => {
                            if(err)
                                console.log(err)
                        })
                        dbconnect.query('INSERT INTO `cuestionario-pregunta`(`idCuestionario`, `idPregunta`, `idRespuesta`) VALUES (?,?,?)', [idc, idpregunta, re[j].idRespuesta], (err, resp) => {
                            if(err)
                                console.log(err)
                            else{
                                return res.status(200)
                            }
                        })
                    }
                }
            }
        })
        dbconnect.query('INSERT INTO `pregunta-respuesta`(idPregunta, idRespuesta, comentario, seleccionada) VALUES (?,?,"","")', [idpregunta, idrespuesta], (err, res) => {
            if(err)
                console.log(err)
        })
         dbconnect.query('INSERT INTO `cuestionario-pregunta`(idCuestionario, idPregunta, idRespuesta) VALUES (?,?,?)', [idc, idpregunta, idrespuesta], (erro, resp) => {
            if(erro)
                console.log(erro)
            else{
                resp.message = "Se ha creado un nuevo cuestionario"
            }
        })
    }
    return res.status(200)
}

module.exports = { ingresaCuestionario, ingresaPreguntaRespuesta, getQuestions, getAnswers, getCuestionarios, getQuestionnaires, uploadQuestionnaires, uploadNewQuestionnaire, establishKeys }