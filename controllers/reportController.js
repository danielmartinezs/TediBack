const pdf = require('pdfkit');
const express = require('express');
const fs = require('fs')
const dbconnect = require('../config/dbConnection.js');

const generaReporte = async (req, res) => {
    const doc = new pdf();
    doc.text('Hola Mundo con PDFKIT', 45, 50)
    doc.pipe(fs.createWriteStream('prueba.pdf'))
    doc.end();
}

module.exports = { generaReporte }