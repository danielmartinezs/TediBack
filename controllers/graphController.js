const { response } = require('express');
const bcrypt = require('bcrypt');
const dbconnect = require('../config/dbConnection.js');

const getDatosGraph = async (req, res) => {
    const { id } = req.params;
    dbconnect.query('SELECT `cuestionario-alumno`.`fecha`, `cuestionario-alumno`.`puntaje` FROM cuestionario, `cuestionario-alumno`, alumno, `tutor-alumno`, tutor WHERE cuestionario.idCuestionario =  `cuestionario-alumno`.`idCuestionario` AND `cuestionario-alumno`.`idAlumno` = alumno.idAlumno AND alumno.idAlumno = `tutor-alumno`.`idAlumno` AND tutor.idTutor = ? AND cuestionario.idCuestionario = 1', [id], (err, respo) => {
        if(err)
            console.log(err)
        else{
            return res.status(200).json(respo)
        }
    })
}

module.exports = { getDatosGraph }