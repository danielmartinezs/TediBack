const { response } = require('express');
const express = require('express');
const dbconnect = require('../config/dbConnection.js');
var mysql = require('mysql');

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

const editQuestion = async (req, res) => {
    const { idp, pregunta } = req.body;
    if(!idp || !pregunta){
        return res.status(400).send({ success: false, message: 'No puedes dejar campos vacíos'})
    }
    dbconnect.query('UPDATE preguntas SET pregunta = ? WHERE idPregunta = ?', [pregunta, idp], (erro, reponse) => {
        if(erro)
            console.log(erro)
        else{
            reponse.message = "Pregunta editada!";
            return res.status(200).json(reponse)
        }
    })
}

const editAndCreateQuestion = async (req, res) => {
    const { idc, idp, idr, pregunta, tipo } = req.body;
    if(!idc || !idp || !idr || !pregunta || !tipo){
        return res.status(400).send({ success: false, message: 'No puedes dejar campos vacíos'})
    }
    dbconnect.query('SELECT MAX(idPregunta) AS id FROM preguntas', (error, response) => {//obtiene el id de la pregunta más reciente
        if(error)
            console.log(error)
        else{
            let idpn = response[0].id + 1;//obtiene el id de la pregunta más reciente y le suma 1
            dbconnect.query('INSERT INTO preguntas(idPregunta, pregunta, tipo) VALUES (?, ?, ?)', [idpn, pregunta, tipo], (error, response) => {//inserta la nueva pregunta
                if(error)
                    console.log(error)
                else{
                    dbconnect.query('INSERT INTO `pregunta-respuesta`(idPregunta, idRespuesta) VALUES (?,?)', [idpn, idr], (error, response) => {//actualiza el id de la pregunta en la tabla pregunta-respuesta
                        if(error)
                            console.log(error)
                        else{
                            dbconnect.query('UPDATE `cuestionario-pregunta` SET idPregunta = ? WHERE idPregunta = ? AND idRespuesta = ? AND idCuestionario = ?', [idpn, idp, idr, idc], (error, response) => {//actualiza el id de la pregunta en la tabla cuestionario-pregunta
                                if(error)
                                    console.log(error)
                                else{
                                    response.message = "Nueva pregunta creada!";
                                    return res.status(200).json(response)
                                }
                            })
                        }
                    })
                }
            })
        }
    })

}

const borraQuestion = async (req, res) => {
    const { id } = req.params;
    dbconnect.query('DELETE FROM preguntas WHERE idPregunta = ?', [id], (error, response) => {
        if(error)
            console.log(error)
        else{
            response.message = "Pregunta eliminada!";
            dbconnect.query('SELECT idPregunta FROM preguntas', (erro, respose) => {
                if(erro)
                    console.log(erro)
                else{
                    for(let i = 1; i <= respose.length; i++){
                        dbconnect.query('UPDATE preguntas SET idPregunta = ? WHERE idPregunta = ?', [i, respose[i-1].idPregunta], (err) => {
                            if(err)
                                console.log(err)
                        })
                    }
                }
            })
            return res.status(200).json(response)
        }
    })
}

const addQuestion = async (req, res) => {
    const { idc, pregunta, tipo, respuesta } = req.body;
    if(!idc || !pregunta || !tipo || !respuesta){
        return res.status(400).send({ success: false, message: 'No puedes dejar campos vacíos'})
    }
    dbconnect.query('SELECT idPregunta FROM preguntas WHERE pregunta = ?', [pregunta], (er, re) => {
        if(er)
            console.log(er)
        else{
            if(re.length === 0){
                dbconnect.query('SELECT MAX(idPregunta) AS id FROM preguntas', (error, response) => {//obtiene el id de la pregunta más reciente
                    if(error)
                        console.log(error)
                    else{
                        let idpn = response[0].id + 1;//obtiene el id de la pregunta más reciente y le suma 1
                        dbconnect.query('INSERT INTO preguntas(idPregunta, pregunta, tipo) VALUES (?, ?, ?)', [idpn, pregunta, tipo], (error, response) => {//inserta la nueva pregunta
                            if(error)
                                console.log(error)
                        })
                    }
                })
            }
        }
    })
    dbconnect.query('SELECT idRespuesta FROM respuesta WHERE opciones = ?', [respuesta], (er, re) => {
        if(er)
            console.log(er)
        else{
            if(re.length === 0){
                dbconnect.query('SELECT MAX(idRespuesta) AS id FROM respuesta', (error, response) => {//obtiene el id de la respuesta más reciente
                    if(error)
                        console.log(error)
                    else{
                        let idrn = response[0].id + 1;//obtiene el id de la respuesta más reciente y le suma 1
                        dbconnect.query('INSERT INTO respuesta(idRespuesta, opciones) VALUES (?, ?)', [idrn, respuesta], (error, response) => {//inserta la nueva respuesta
                            if(error)
                                console.log(error)
                        })
                    }
                })
            }
        }
    })
    res.status(200).send({ success: true, message: 'Pregunta agregada!'})
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

const getAnswer = async (req, res) => {
    const { id } = req.params;
    dbconnect.query('SELECT idRespuesta AS id, opciones FROM respuesta WHERE idRespuesta = ?', [id], (error, response) => {
        if(error)
            console.log(error)
        else{
            res.send(response);
        }
    })
}

const editAllAnswers = async (req, res) => {
    const { idr, opciones } = req.body;
    if(!idr || !opciones){
        return res.status(400).send({ success: false, message: 'No puedes dejar campos vacíos'})
    }
    dbconnect.query('UPDATE respuesta SET opciones = ? WHERE idRespuesta = ?', [opciones, idr], (error, response) => {
        if(error)
            console.log(error)
        else{
            response.message = "Respuesta editada!";
            return res.status(200).json(response);
        }
    })
}

const editAndCreateAnswers = async (req, res) => {
    const { idc, idp, idr, opciones } = req.body;
    if(!idc || !idp || !idr || !opciones){
        return res.status(400).send({ success: false, message: 'No puedes dejar campos vacíos'})
    }
    dbconnect.query('SELECT MAX(idRespuesta) FROM respuesta', (error, re) => {//obtiene el id de la respuesta más reciente
        if(error)
            console.log(error)
        else{
        let idrn = re[0]['MAX(idRespuesta)']+1;//lo incrementa por uno
        dbconnect.query('INSERT INTO respuesta(idRespuesta, opciones) VALUES (?,?)', [idrn, opciones], (error, resp) => {//creas la nueva respuesta
            if(error)
                console.log(error)
            else{            
                dbconnect.query('UPDATE `pregunta-respuesta` SET idRespuesta = ? WHERE idRespuesta = ? AND idPregunta = ?', [idrn, idr, idp], (error, response) => {//obtiene el id de la pregunta de la respuesta
                    if(error)
                        console.log(error)
                    else{
                    dbconnect.query('UPDATE `cuestionario-pregunta` SET idRespuesta= ? WHERE idCuestionario = ? AND idRespuesta = ? AND idPregunta = ?', [idrn, idc, idr, idp], (error, response) => {//editas la nueva respuesta de la pregunta en el cuestionario
                        if(error)
                            console.log(error)
                        else{
                            response.message = "Respuesta nueva creada!";
                            return res.status(200).json(response);
                            }
                        })
                    }
                })
            }
        })
        }
    })
}

const borraAnswer = async (req, res) => {
    const { id } = req.params;
    dbconnect.query('DELETE FROM respuesta WHERE idRespuesta = ?', [id], (error, response) => {
        if(error)
            console.log(error)
        else{
            response.message = "Respuesta borrada!";
            dbconnect.query('SELECT idRespuesta FROM respuesta', (erro, respose) => {
                if(erro)
                    console.log(erro)
                else{
                    for(let i = 1; i <= respose.length; i++){
                        dbconnect.query('UPDATE respuesta SET idRespuesta = ? WHERE idRespuesta = ?', [i, respose[i-1].idRespuesta], (err) => {
                            if(err)
                                console.log(err)
                        })
                    }
                }
            })
            return res.status(200).json(response)
        }
    })
}

const getCuestionarios = async (req, res) => {
    dbconnect.query('SELECT idCuestionario, nombre, materia FROM cuestionario', (error, response) => {
        if(error)
            console.log(error)
        else{
            res.send(response);
        }
    })
}

const getQuestionnairesDetails = async (req, res) => {
    const { id } = req.params;
    dbconnect.query('SELECT * FROM cuestionario_preguntas_respuestas WHERE idCuestionario = ?', [id], (error, response) => {
        if(error)
            console.log(error)
        else{
            res.send(response);
        }
    })
}

const uploadQuestionnaires = async (req, res) => {
    const { ida, idc, respuestas, comentarios, puntaje } = req.body;
    if(!ida || !idc || !respuestas || !comentarios){
        return res.status(400).send({ success: false, message: 'No puedes dejar campos vacíos'})
    }
    dbconnect.query('INSERT INTO `cuestionario-alumno`(idAlumno, idCuestionario, fecha, respuestas, comentarios, puntaje) VALUES (?,?,CURRENT_TIMESTAMP(),?,?,?)', [ida, idc, respuestas, comentarios, puntaje], (error, response) => {
        if(error)
            console.log(error)
        else{
            response.message = "Respuestas registradas!";
            return res.status(200).json(response)
        }
    })
}

const editUploadedQuestionnaire = async (req, res) => {
    const { ida, idc, timestamp, respuestas, comentarios, puntaje } = req.body;
    if(!ida || !idc || !timestamp || !respuestas || !comentarios){
        return res.status(400).send({ success: false, message: 'No puedes dejar campos vacíos'})
    }
    dbconnect.query('UPDATE `cuestionario-alumno` SET idAlumno=?, idCuestionario=?, respuestas=?, comentarios=?, puntaje=? WHERE fecha=?', [ida, idc, respuestas, comentarios, puntaje, timestamp], (error, response) => {
        if(error)
            console.log(error)
        else{
            response.message = "Respuestas actualizadas!";
            return res.status(200).json(response)
        }
    })
} 

const borrarCuestionario = async (req, res) => {
    const { id } = req.params;
    dbconnect.query('DELETE FROM `cuestionario-pregunta` WHERE idCuestionario = ?', [id], (error, response) => {
        if(error)
            console.log(error)
        else{
            dbconnect.query('DELETE FROM `cuestionario-alumno` WHERE idCuestionario = ?', [id], (error, response) => {
                if(error)
                    console.log(error)
                else{
                    dbconnect.query('DELETE FROM `cuestionario` WHERE idCuestionario = ?', [id], (error, response) => {
                        if(error)
                            console.log(error)
                        else{
                        response.message = "Cuestionario borrado!";
                        return res.status(200).json(response)
                        }
                    })
                }
            })
        }
    })
}

const getLatestEntry = async (req, res) => {
    const { id } = req.params;
    //dbconnect.query('SELECT MAX(fecha) AS ultimoregistro FROM `cuestionario-alumno` WHERE idAlumno=?', [id], (err, response) => {
    dbconnect.query('SELECT CONVERT_TZ(MAX(fecha), '+"'"+"+00:00"+"'"+', '+"'"+"-05:00"+"'"+') AS ultimoregistro FROM `cuestionario-alumno` WHERE idAlumno=?', [id], (err, response) => {
        if(err)
            console.log(err)
        else{
            res.send(response)
        }
    })
}

const uploadNewQuestionnaire = async (req, res) => {
    const { idc, nombrec, materia, qa } = req.body
    //console.log(idc)
    //console.log(nombrec)
    //console.log(materia)
    //console.log(qa)
    if(!idc || !nombrec || !materia  || !qa){
        return res.status(400).send({ success: false, message: 'No puedes dejar campos vacíos'})
    }
    dbconnect.query('INSERT INTO cuestionario(idCuestionario, nombre, materia) VALUES (?,?,?)', [idc, nombrec, materia], (er, re) => {
        if(er)
            console.log(er)
    })
    for(let i = 0; i<qa.length; i++){
        let idpregunta = qa[i].idPregunta;
        //console.log(idpregunta)
        let idrespuesta = qa[i].idRespuesta;
        //console.log(idrespuesta)
        let respuesta = qa[i].respuesta;
        //console.log(respuesta)
        let pregunta = qa[i].pregunta;
        //console.log(pregunta)
        let tipop = qa[i].tipop;
        //console.log(tipop)
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
    res.status(200).send({message: "Registros subidos!"})
}

const establishKeys = async (req, res) => {
    const { idc, qa } = req.body
    if(!idc || !qa){
        return res.status(400).send({ success: false, message: 'No puedes dejar campos vacíos'})
    }
    for(let i = 0; i<qa.length; i++){
        let idpregunta = qa[i].idPregunta;
        let idrespuesta = qa[i].idRespuesta;
        dbconnect.query('SELECT idPregunta FROM `pregunta-respuesta` WHERE idRespuesta = ?', [idrespuesta], (er, re) => {
            if(er)
                console.log(er)
            else if(re.length !== 0){
                for(let j = 0; j<re.length; j++){
                    if(re[j].idPregunta === idpregunta){
                        dbconnect.query('INSERT INTO `pregunta-respuesta`(`idPregunta`, `idRespuesta`) VALUES (?,?)', [re[j].idPregunta, idrespuesta], (err, resp) => {
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
                        dbconnect.query('INSERT INTO `pregunta-respuesta`(`idPregunta`, `idRespuesta`) VALUES (?,?)', [idpregunta, re[j].idRespuesta], (err, resp) => {
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
        dbconnect.query('INSERT INTO `pregunta-respuesta`(idPregunta, idRespuesta) VALUES (?,?)', [idpregunta, idrespuesta], (err, res) => {
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

const establishKey = async (req, res) => {
    const { idc, pregunta, tipo, respuesta } = req.body
    console.log(idc)
    console.log(pregunta)
    console.log(tipo)
    console.log(respuesta)
    if(!idc || !pregunta, !tipo || !respuesta){
        return res.status(400).send({ success: false, message: 'No puedes dejar campos vacíos'})
    }
    console.log(idc);
    console.log(pregunta);
    console.log(tipo);
    console.log(respuesta);
    dbconnect.query('SELECT idPregunta FROM preguntas WHERE pregunta = ?', [pregunta], (er, re) => {
        if(er)
            console.log(er)
        else{
            let idpregunta = re[0].idPregunta;
            dbconnect.query('SELECT idRespuesta FROM respuesta WHERE opciones = ?', [respuesta], (err, res) => {
                if(err)
                    console.log(err)
                else{
                    let idrespuesta = res[0].idRespuesta;
                    dbconnect.query('INSERT INTO `pregunta-respuesta`(idPregunta, idRespuesta) VALUES (?,?)', [idpregunta, idrespuesta], (err, resp) => {
                        if(err)
                            console.log(err)
                        else{
                            dbconnect.query('INSERT INTO `cuestionario-pregunta`(idCuestionario, idPregunta, idRespuesta) VALUES (?,?,?)', [idc, idpregunta, idrespuesta], (error, response) => {
                                if(error)
                                    console.log(error)
                                else{
                                    response.message = "Se ha ingresado una nueva pregunta"
                                }
                            })
                        }
                    }
                )}
            })
        }
    })
    return res.status(200)
}

const checkLinkAnswer = async (req, res) => {
    const { id } = req.params
    if(!id){
        return res.status(400).send({ success: false, message: 'No puedes dejar campos vacíos'})
    }
    dbconnect.query('SELECT preguntas.pregunta, `cuestionario-pregunta`.`idCuestionario`, cuestionario.nombre  FROM `cuestionario-pregunta`, preguntas, cuestionario WHERE preguntas.idPregunta = `cuestionario-pregunta`.`idPregunta` AND `cuestionario-pregunta`.`idCuestionario` = cuestionario.idCuestionario AND idRespuesta = ?', [id], (error, response) => {
        if(error)
            console.log(error)
        else if(response.length === 0){
            response.message = "La respuesta actualmente no está asociada a ninguna pregunta"
            res.send(response)
        }
        else{
            res.send(response)
        }
    })
}

const checkLinkQuestion = async (req, res) => {
    const { id } = req.params
    if(!id){
        return res.status(400).send({ success: false, message: 'No puedes dejar campos vacíos'})
    }
    dbconnect.query('SELECT respuesta.opciones, `cuestionario-pregunta`.`idCuestionario`, cuestionario.nombre FROM `cuestionario-pregunta`, respuesta, cuestionario WHERE respuesta.idRespuesta = `cuestionario-pregunta`.`idRespuesta` AND `cuestionario-pregunta`.`idCuestionario` = cuestionario.idCuestionario AND idPregunta = ?', [id], (er, response) => {
        if(er)
            console.log(er)
        else if(response.length === 0){
            response.message = "La pregunta actualmente no está asociada a ninguna respuesta"
            res.send(response)
        }
        else{
            res.send(response)
        }
    })
}

module.exports = { ingresaCuestionario, ingresaPreguntaRespuesta, getQuestions, editQuestion, editAndCreateQuestion, borraQuestion, addQuestion, getAnswers, getAnswer, editAllAnswers, editAndCreateAnswers, borraAnswer, getCuestionarios, getQuestionnairesDetails, uploadQuestionnaires, borrarCuestionario, editUploadedQuestionnaire, getLatestEntry, uploadNewQuestionnaire, establishKeys, establishKey, checkLinkAnswer, checkLinkQuestion }