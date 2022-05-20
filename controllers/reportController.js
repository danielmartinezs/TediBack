const pdf = require('pdfkit');
const express = require('express');
const fs = require('fs')
const dbconnect = require('../config/dbConnection.js');
const PDFService = require('../services/pdf-service');

const descargaReporte = (req, res) => {

    const stream = res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment;filename=invoice.pdf'
    });

    PDFService.generaReporte(
        (chunk) => stream.write(chunk),
        () => stream.end()
    );
}

module.exports = { descargaReporte }