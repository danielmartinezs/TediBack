const PDF = require('pdfkit');
const PDFC = require('pdfkit-construct');
const express = require('express');
const dbconnect = require('../config/dbConnection.js');
const PDFService = require('../services/pdfCreator');
const path = require('path');
const fs = require('fs');
const { dirname } = require('path');

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
    const filename = `ReportePrueba.pdf`;
    PDFService.reportePrueba(filename);
    const dir = path.join(__dirname, `../pdfs/${filename}`);
    return res.send(dir);
}

module.exports = { helloWorld, holaMundo, reporteEvaluacionArticulacion, reporteHabilidadesPreVerbales, reportePrueba };