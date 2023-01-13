const express = require('express');
const dbconnect = require('../config/dbConnection.js');


const getSemestre = (req, res) => {
    dbconnect.query('SELECT MAX(idSemestre) FROM `semestre`', (err, response) => {
        if (err) {
            console.log(err);
        }
        else{
            let semestre = response[0]['MAX(idSemestre)'];
            dbconnect.query('SELECT idSemestre, periodo, fechaInicio, fechaFin FROM `semestre` WHERE idSemestre = ?', [semestre], (err, response) => {
                if (err) {
                    console.log(err);
                }
                else{
                    res.json(response);
                }
            })
        }
    })
}

const getSemestres = (req, res) => {
    dbconnect.query('SELECT * FROM `semestre`', (err, response) => {
        if (err) {
            console.log(err);
        }
        else{
            res.json(response);
        }
    })
}

const cambiarSemestre = (req, res) => {
    const { periodo, anio, fechaInicio, fechaFin } = req.body;
    if(!periodo || !anio || !fechaInicio || !fechaFin) {
        return res.status(400).json({
            success: false,
            message: 'Todos los campos son obligatorios'
        })
    }
    let period = periodo+" "+anio;
    dbconnect.query('INSERT INTO `semestre`(`periodo`, `fechaInicio`, `fechaFin`) VALUES (?, ?, ?)', [period, fechaInicio, fechaFin], (err, response) => {
        if(err) {
            console.log(err);
        }
        else{
            response.message = 'El semestre ha sido cambiado correctamente!';
            return res.status(200).json(response);
        }
    })
}

const especificaFechaReporte = (req, res) => {
    const { idCuestionario, idAlumno } = req.body;
    if(!idCuestionario || !idAlumno) {
        return res.status(400).json({
            success: false,
            message: 'Todos los campos son obligatorios'
        })
    }
    dbconnect.query('SELECT fecha FROM `cuestionario-alumno` WHERE idAlumno = ? AND idCuestionario = ? ORDER BY `cuestionario-alumno`.`fecha` DESC', [idAlumno, idCuestionario], (err, response) => {
        if(err) {
            console.log(err);
        }
        else{
            return res.send(response);
        }
    })
}

const getDatosLatestReporte = (req, res) => {
    const { timestamp } = req.params;
    if(!timestamp) {
        return res.status(400).send('Falta el timestamp');
    }
    dbconnect.query('SELECT `cuestionario-alumno`.`idCuestionario`, `cuestionario-alumno`.respuestas, `cuestionario-alumno`.comentarios, `cuestionario-alumno`.fecha, `cuestionario-alumno`.puntaje, alumno.idAlumno, alumno.nombre, alumno.apellido, cuestionario.nombre AS titulo, cuestionario.materia FROM `cuestionario-alumno`, alumno, cuestionario WHERE `cuestionario-alumno`.`idAlumno` = alumno.idAlumno AND `cuestionario-alumno`.`idCuestionario`= cuestionario.idCuestionario AND fecha = ?', [timestamp], (err, response) => {
        if(err) {
            console.log(err);
        }
        else{
            return res.send(response);
        }
    })
}

const getReportesAlumno = (req, res) => {
    const { id } = req.params;
    dbconnect.query('SELECT `reporte`.idReporte, nombre, ruta, fechaModificado, fechaCreacion, disponible FROM `reporte`, `reporte-alumno` WHERE `reporte`.`idReporte` = `reporte-alumno`.`idReporte` AND `reporte-alumno`.idAlumno = ?', [id], (err, response) => {
        if(err)
            console.log(err)
        else{
            res.send(response);
        }
    })
}

const getReportesAlumnoDisponible = (req, res) => {
    const { id, semestre } = req.params;
    dbconnect.query('SELECT `reporte-semestre`.idReporte, nombre, ruta, fechaModificado, fechaCreacion FROM `reporte`, `reporte-semestre`, `reporte-alumno` WHERE `reporte`.`idReporte` = `reporte-semestre`.`idReporte` AND `reporte`.`idReporte` = `reporte-alumno`.`idReporte` AND `reporte-alumno`.idAlumno = ? AND idSemestre = ? AND `reporte`.`disponible` = 1', [id, semestre], (err, response) => {
        if(err)
            console.log(err)
        else{
            res.send(response);
        }
    })
}

const uploadPlanSemestral = (req, res) => {
    const { nombre, descripcion, semestre, alumno } = req.body;
    if(!nombre || !descripcion || !semestre || !alumno) {
        return res.status(400).json({
            success: false,
            message: 'Todos los campos son obligatorios'
        })
    }
    let cero = 0;
    let vacio = '';
    dbconnect.query('INSERT INTO `alumno-semestre`(`idAlumno`, `idSemestre`, `planSemestral`, `detalles`, `reporteSemestral`, `cumplido`) VALUES (?, ?, ?, ?, ?, ?)', [idalumno, semestre, nombre, descripcion, vacio, cero], (err, response) => {
        if(err) {
            console.log(err);
        }
        else{
            response.message = 'El plan semestral ha sido cargado correctamente!';
            return res.status(200).json(response);
        }
    })
}

const getPlanSemestral = (req, res) => {
    const { id } = req.params;
    if(!id) {
        return res.status(400).json({
            success: false,
            message: 'Todos los campos son obligatorios'
        })
    }
    dbconnect.query('SELECT `semestre`.`periodo`, `alumno-semestre`.idAlumno, `alumno-semestre`.idSemestre, `alumno-semestre`.planSemestral, `alumno-semestre`.detalles FROM `alumno-semestre`, `semestre` WHERE  `alumno-semestre`.`idSemestre` = `semestre`.`idSemestre` AND `alumno-semestre`.idAlumno = ?', [id], (err, response) => {
        if(err) {
            console.log(err);
        }
        else{
            return res.send(response);
        }
    })
}

const uploadReporteSemestral = (req, res) => {
    const { descripcion, semestre, alumno, complete } = req.body;
    if(!descripcion || !semestre || !alumno || !complete) {
        return res.status(400).json({
            success: false,
            message: 'Todos los campos son obligatorios'
        })
    }
    dbconnect.query('UPDATE `alumno-semestre` SET `reporteSemestral`= ?, `cumplido`= ? WHERE `idAlumno` = ? AND `idSemestre` = ?', [descripcion, complete, alumno, semestre], (err, response) => {
        if(err) {
            console.log(err);
        }
        else{
            response.message = 'El reporte semestral ha sido cargado correctamente!';
            return res.status(200).json(response);
        }
    })
}

const uploadRuta = (req, res) => {
    const { ruta, idr } = req.body;
    if(!ruta || !idr) {
        return res.status(400).send('No puedes dejar campos vacios');
    }
    dbconnect.query('UPDATE `reporte` SET `ruta`= ? WHERE idReporte = ?', [ruta, idr], (error, response) => {
        if(error) {
            console.log(error);
        }
        else{
            response.message = 'La ruta ha sido asignada!';
            return res.status(200).json(response);
        }
    })
}

const uploadReporteHPV = (req, res) => {
    const { nombre, idc, ida, ids} = req.body;
    if(!nombre || !idc || !ida || !ids) {
        return res.status(400).send('No puedes dejar campos vacios');
    }
    let cero = 0;
    let ruta = '';
    dbconnect.query('INSERT INTO `reporte`(`nombre`, `ruta`, `fechaCreacion`, `fechaModificado`, `disponible`) VALUES (?, ?, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), ?)', [nombre, ruta, cero], (err) => {
        if(err) {
            console.log(err);
        }
        else{
            dbconnect.query('CALL SPLinkReporte(?, ?, ?)', [ida, idc, ids], (error, response) => {
                if(error)
                    console.log(error)
                else{
                    response.message = 'Reporte subido correctamente!';
                    return res.status(200).json(response);
                }
            })
        }
    })
}

const uploadReporteEA = (req, res) => {
    const { nombre, fc, fm } = req.body;
    if(!nombre || !fc || !fm) {
        return res.status(400).send('No puedes dejar campos vacios');
    }
    dbconnect.query('INSERT INTO `reporte`(`nombre`, `fechaCreacion`, `fechaModificado`) VALUES (?, ?, ?)', [nombre, fc, fm], (err, response) => {
        if(err) {
            console.log(err);
        }
        else{
            response.message = 'Reporte subido correctamente!';
            return res.status(200).json(response);
        }
    })
}

const publicarReporte = (req, res) => {
    const { idr, dispo } = req.body;
    if(!idr || !dispo) {
        return res.status(400).send('No puedes dejar campos vacios');
    }
    dbconnect.query('UPDATE `reporte` SET `disponible`= ? WHERE idReporte = ?', [dispo, idr], (error, response) => {
        if(error) {
            console.log(error);
        }
        else{
            response.message = 'Disponibilidad del reporte modificada';
            return res.status(200).json(response);
        }
    })
}

module.exports = { getSemestre, getSemestres, cambiarSemestre, especificaFechaReporte, getDatosLatestReporte, getReportesAlumno, getReportesAlumnoDisponible, uploadPlanSemestral, getPlanSemestral, uploadReporteSemestral, uploadRuta, uploadReporteHPV, uploadReporteEA, publicarReporte };