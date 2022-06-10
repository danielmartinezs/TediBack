const pdf = require('pdfkit');

function generaReporte (dataCallback, endCallback) {
    const doc = new pdf();
    doc.on('data', dataCallback);
    doc.on('end', endCallback);
    doc.text('Hola Mundo con PDFKIT', 45, 50)
    doc.end();
}

module.exports = { generaReporte };