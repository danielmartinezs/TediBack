const pdf = require('pdfkit');
const express = require('express');
const dbconnect = require('../config/dbConnection.js');
const PDFService = require('../services/pdf-service');
const { path } = require('pdfkit');

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

const holaMundo = (req, res) => {
    const doc = new PDF({bufferPage: true});
    const filename = `HolaMundo`;
    const stream = res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment;filename=${filename}`
    });
    doc.on('data', (data) => {stream.write(data)});
    doc.on('end', () => {stream.end()});

    doc.text('HOLA MUNDO CON PDFKIT', 30, 30);
    doc.pipe( res );
    doc.end()
}

const crearReporteHabilidades = (req, res) => {

    doc.pipe(fs.createWriteStream("./document-5.pdf"));
    const table01 = {
    "headers" : ["A"],
    "rows": [
        [ "Datos Personales"],
        [ "Nombres del alumno", "Aqui va nombre", "" ],
        [ "Examinador","Aqui va nombre examinador", "Fecha de Nacimiento.", "Aqui va fecha de naciemitnoe" ],
        [ "Programa", "Progrmaa que va aqui", "Fecha de aplicacion","AQui va la fecha " ],
    ],
    };
    const table02 = {
        "headers" : [""],
        "rows": [
            [ "a", ""],
            [ "i", ""],
            [ "u", ""],
            [ "B", ""],
            [ "G", ""],
            [ "o", ""],
            [ "e", ""],
            [ "P", ""],
            [ "T", ""],
            [ "J", ""],
            [ "F", ""],
            [ "V", ""],
            [ "N", ""],
            [ "S", ""],
            [ "D", ""],
            [ "Ñ", ""],
            [ "K", ""],
            [ "CH", ""],
            [ "Y", ""],
            [ "L", ""],
            [ "R", ""],
            [ "RR", ""],
        ],
    };
    const table03 = {
        "headers" : ["","B","G","M","P","T","J","F","V","N","S","D","Ñ","K","CH","Y","L","R","RR"],
        "rows": [
            [ "a", ""],
            [ "i", ""],
            [ "u", ""],
            [ "o", ""],
            [ "e", ""],
        ],
    };
    const table04 = {
        "headers" : ["","a","e","i","o","u"],
        "rows": [
            [ "S", "","","","",""],
            [ "N", "","","","",""],
            [ "L", "","","","",""],
            [ "R", "","","","",""],
            
            
        ],
    };
    const table05 = {
        "headers" : ["","PL","BL","FL","CL","GL","PR","BR","FR","TR","DR","CR","GR"],
        "rows": [
            [ "a", ""],
            [ "e", ""],
            [ "i", ""],
            [ "o", ""],
            [ "u", ""],
            
        ],
    };
    const table06 = {
        "headers" : ["Fonema","P.Inicial","O","S","D","P.Media","O","S","D","P.Final","O","S","D"],
        "rows": [
            [ "a","amo","","","","más","","","","mamá","","",""],
            [ "e","hijo","","","","pizza","","","","pipí","","",""],
            [ "u","uno","","","","luz","","","","Lulú","","",""],
            [ "B","boca","","","","bebe","","","","------","","",""],
            [ "G","gato","","","","mago","","","","------","","",""],
            [ "o","hola","","","","moto","","","","pelo","","",""],
            [ "e","ella","","","","mesa","","","","tele","","",""],
            [ "M","mesa","","","","come","","","","------","","",""],
            [ "P","pala","","","","sapo","","","","------","","",""],
            [ "T","toma","","","","pato","","","","------","","",""],
            [ "J","jamón","","","","ojo","","","","reloj","","",""],
            [ "F","foto","","","","cafe","","","","------","","",""],
            [ "V","vaca","","","","uva","","","","------","","",""],
            [ "N","nido","","","","mano","","","","sillón","","",""],
            [ "S","sopa","","","","casa","","","","lapíz","","",""],
            [ "D","dame","","","","codo","","","","------","","",""],
            [ "Ñ","ñoño","","","","moño","","","","------","","",""],
            [ "K","cama","","","","taco","","","","------","","",""],
            [ "CH","chopo","","","","leche","","","","------","","",""],
            [ "Y","llama","","","","silla","","","","------","","",""],
            [ "L","luna","","","","vela","","","","pastel","","",""],
            [ "R","------","","","","araña","","","","collar","","",""],
            [ "RR","rojo","","","","arriba","","","","------","","",""],
            [ "PL","plato","","","","aplasta","","","","------","","",""],
            [ "BL","blusa","","","","------","","","","hablar","","",""],
            [ "FL","flaco","","","","------","","","","rifle","","",""],
            [ "CL","clima","","","","------","","","","chancla","","",""],
            [ "GL","globo","","","","iglesia","","","","iglú","","",""],
            [ "PR","premio","","","","aprecio","","","","------","","",""],
            [ "BR","brazo","","","","abrazo","","","","abré","","",""],
            [ "FR","fruta","","","","africano","","","","cofre","","",""],
            [ "TR","tres","","","","intruso","","","","entra","","",""],
            [ "DR","dragon","","","","------","","","","piedra","","",""],
            [ "CR","cruz","","","","------","","","","micro","","",""],
            [ "GR","grande","","","","------","","","","ogro","","",""],
            [ "au","auto","","","","jaula","","","","Pau","","",""],
            [ "ue","huevo","","","","fuego","","","","fue","","",""],
            [ "ua","------","","","","cacahuate","","","","agua","","",""],
            [ "ie","hielo","","","","miedo","","","","pie","","",""],
            [ "ei","------","","","","peine","","","","rey","","",""],

            
        ],
    };

    doc.table(table01,table02,table03,table04, table05,table06,{
    columnSpacing: 10,
    padding: 10,
    columnsSize: [200, 220, 135],
    align: "center",
    prepareHeader: () => doc.fontSize(11), // {Function}
    // -----------------------------------------------------------------
    //
    // -----------------------------------------------------------------
    prepareRow: (row, indexColumn, indexRow, rectRow, rectCell) => {

        const {x, y, width, height} = rectCell;

        // first line 
        if(indexColumn === 0){
        doc
        .lineWidth(.5)
        .moveTo(x, y)
        .lineTo(x, y + height)
        .stroke();  
        }

        doc
        .lineWidth(.5)
        .moveTo(x + width, y)
        .lineTo(x + width, y + height)
        .stroke();


        doc.fontSize(10).fillColor('#292929');

    }, // {Function}
    });

    // done
    doc.end();
}

module.exports = { descargaReporte, holaMundo }