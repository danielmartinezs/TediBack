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

const reportePrueba = (req, res) => {
    const { timestamp } = req.body;
    if(!timestamp) {
        return res.status(400).send('Falta el timestamp');
    }
    dbconnect.query('SELECT `cuestionario-alumno`.respuestas, `cuestionario-alumno`.comentarios, `cuestionario-alumno`.fecha, `cuestionario-alumno`.puntaje, alumno.nombre, cuestionario.nombre AS titulo, cuestionario.materia FROM `cuestionario-alumno`, alumno, cuestionario WHERE `cuestionario-alumno`.`idAlumno` = alumno.idAlumno AND `cuestionario-alumno`.`idCuestionario`= cuestionario.idCuestionario AND fecha = ?', [timestamp], (err, results) => {
        if(err) {
            console.log(err);
        }
        else{
            const datos = results[0];
            const filename = `ReportePrueba.pdf`;
            PDFService.reportePrueba(filename, datos);
            const dir = path.join(__dirname, `../pdfs/${filename}`);
            return res.send(dir);
        }
    })
}

const uploadReporte = (req, res) => {
    const { archivo, nombre } = req.body;
    console.log(archivo);
    console.log(nombre);
    if(!archivo || !nombre) {
        return res.status(400).send('No puedes dejar campos vacios');
    }
    dbconnect.query('INSERT INTO `reporte`(`nombre`, `archivo`) VALUES (?, ?)', [nombre, archivo], (err, response) => {
        if(err) {
            console.log(err);
        }
        else{
            response.message = 'Reporte subido correctamente!';
            return res.send(200).json(response);
        }
    })
}

module.exports = { helloWorld, holaMundo, reporteEvaluacionArticulacion, reporteHabilidadesPreVerbales, reportePrueba, uploadReporte };