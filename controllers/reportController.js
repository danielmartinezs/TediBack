const PDF = require('pdfkit');
const PDFC = require('pdfkit-construct');
const express = require('express');
const dbconnect = require('../config/dbConnection.js');
const PDFService = require('../services/pdfCreator');
const path = require('path');
const fs = require('fs');
const { dirname } = require('path');
const { response } = require('express');

const helloWorld = (req, res) => {
    
    const filename = `HelloWorld${Date.now()}.pdf`;
    PDFService.helloWorldMake(filename);
    const dir = path.join(__dirname, `../pdfs/${filename}`);
    return res.send(dir);
}

const holaMundo = (req, res) => {

    const filename = `HolaMundo${Date.now()}.pdf`;
    PDFService.generaReporte(filename);
    const dir = path.join(__dirname, `../pdfs/${filename}`);
    return res.send(dir);
}

const reporteEvaluacionArticulacion = (req, res) => {
    const filename = `ReporteEvaluacionArticulacion.pdf`;
    PDFService.crearReporteEvaluacionArticulacion(filename);
    const dir = path.join(__dirname, `../pdfs/${filename}`);
    return res.send(dir);
}

const reporteHabilidadesPreVerbales = (req, res) => {
    const filename = `ReporteHabilidadesPreverbales.pdf`;
    PDFService.crearReporteHabilidadesPreVerbales(filename);
    const dir = path.join(__dirname, `../pdfs/${filename}`);
    return res.send(dir);
}

const getDatosLatestReporte = (req, res) => {
    const { timestamp } = req.params;
    if(!timestamp) {
        return res.status(400).send('Falta el timestamp');
    }
    dbconnect.query('SELECT `cuestionario-alumno`.`idCuestionario`, `cuestionario-alumno`.respuestas, `cuestionario-alumno`.comentarios, `cuestionario-alumno`.fecha, `cuestionario-alumno`.puntaje, alumno.nombre, cuestionario.nombre AS titulo, cuestionario.materia FROM `cuestionario-alumno`, alumno, cuestionario WHERE `cuestionario-alumno`.`idAlumno` = alumno.idAlumno AND `cuestionario-alumno`.`idCuestionario`= cuestionario.idCuestionario AND fecha = ?', [timestamp], (err, response) => {
        if(err) {
            console.log(err);
        }
        else{
            return res.send(response);
        }
    })
}

const uploadReporte = (req, res) => {
    const { nombre, fc, fm } = req.body;
    console.log(nombre);
    console.log(fc);
    console.log(fm);
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

module.exports = { helloWorld, holaMundo, reporteEvaluacionArticulacion, reporteHabilidadesPreVerbales, getDatosLatestReporte, uploadReporte };