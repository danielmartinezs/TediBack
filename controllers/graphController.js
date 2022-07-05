const { response } = require('express');
const bcrypt = require('bcrypt');
const dbconnect = require('../config/dbConnection.js');

const getDatosGraphPadre = async (req, res) => {
    const { id } = req.params;
    dbconnect.query('SELECT `cuestionario-alumno`.`fecha`, `cuestionario-alumno`.`puntaje` FROM cuestionario, `cuestionario-alumno`, alumno, `tutor-alumno`, tutor WHERE cuestionario.idCuestionario =  `cuestionario-alumno`.`idCuestionario` AND `cuestionario-alumno`.`idAlumno` = alumno.idAlumno AND alumno.idAlumno = `tutor-alumno`.`idAlumno` AND tutor.idTutor = ? AND cuestionario.idCuestionario = 1', [id], (err, respo) => {
        if(err)
            console.log(err)
        else{
            return res.status(200).json(respo)
        }
    })
}

const getDatosGraphAdmin = async (req, res) => {
    const { id } = req.params;
    dbconnect.query('SELECT fecha, puntaje FROM `cuestionario-alumno` WHERE idAlumno = ?', [id], (err, respo) => {
        if(err)
            console.log(err)
        else{
            return res.status(200).json(respo)
        }
    })
}

const getDatosGraphAdminNoN = async (req, res) => {
    const { id } = req.params;
    dbconnect.query('SELECT fecha, puntaje FROM `cuestionario-alumno` WHERE puntaje IS NOT NULL AND idAlumno = ?', [id], (err, respo) => {
        if(err)
            console.log(err)
        else{
            return res.status(200).json(respo)
        }
    })
}

const getDatosGraphGrupo = async (req, res) => {
    const { id } = req.params;
    dbconnect.query('SELECT `cuestionario-alumno`.`puntaje`, `cuestionario-alumno`.`fecha`, alumno.nombre FROM `cuestionario-alumno`, `alumno-grupo`, alumno, grupo WHERE `cuestionario-alumno`.`idAlumno` = alumno.idAlumno AND `alumno-grupo`.`idAlumno` = alumno.idAlumno AND `alumno-grupo`.`idGrupo` = grupo.idGrupo AND grupo.idGrupo = ?', [id], (err, respo) => {
        if(err)
            console.log(err)
        else{
            return res.status(200).json(respo)
        }
    })
}

const getDatosGraphGrupos = async (req, res) => {
    dbconnect.query('SELECT SUM(`cuestionario-alumno`.`puntaje`) as total, grupo.nombre FROM `cuestionario-alumno`, `alumno-grupo`, grupo WHERE `cuestionario-alumno`.`idAlumno` = `alumno-grupo`.`idAlumno` AND `alumno-grupo`.`idGrupo` = grupo.idGrupo AND `cuestionario-alumno`.`puntaje` IS NOT NULL GROUP BY grupo.idGrupo', (err, respo) => {
        if(err)
            console.log(err)
        else{
            return res.status(200).json(respo)
        }
    })
}

module.exports = { getDatosGraphPadre, getDatosGraphAdmin, getDatosGraphAdminNoN, getDatosGraphGrupo, getDatosGraphGrupos }