const pdf = require('pdfkit');
const pdfm = require('pdfmake');
const pdft = require('pdfkit-table');
const fs = require('fs');

function helloWorldMake (filename) {
    var fonts = {
        Roboto: {
            normal: ('./services/fonts/roboto/Roboto-Regular.ttf'),
            bold: ('./services/fonts/roboto/Roboto-Medium.ttf'),
            italics: ('./services/fonts/roboto/Roboto-Italic.ttf'),
            bolditalics: ('./services/fonts/roboto/Roboto-MediumItalic.ttf')
        }
    };

    let pdfmake = new pdfm(fonts);
    let docDefination = {
        content: [
            'Hello World!'
        ],
    }

    let pdfDoc = pdfmake.createPdfKitDocument(docDefination, {});
    pdfDoc.pipe(fs.createWriteStream(`./pdfs/${filename}`));
    pdfDoc.end();
}

function generaReporte (filename) {
    
    const doc = new pdf({bufferPage: true});
    doc.text('HOLA MUNDO CON PDFKIT', 30, 30);
    doc.pipe( fs.createWriteStream(`./pdfs/${filename}`));
    doc.end()
}

function reportePrueba (filename, data) {
    var fonts = {
        Roboto: {
            normal: ('./services/fonts/roboto/Roboto-Regular.ttf'),
            bold: ('./services/fonts/roboto/Roboto-Medium.ttf'),
            italics: ('./services/fonts/roboto/Roboto-Italic.ttf'),
            bolditalics: ('./services/fonts/roboto/Roboto-MediumItalic.ttf')
        }
    };

    let pdfmake = new pdfm(fonts);
    
    let fecha = data.fecha;

    let respuestas = data.respuestas;

    var answerkey = JSON.parse(respuestas);

    console.log(answerkey);

    let puntaje = data.puntaje;

    var scores = JSON.parse(puntaje);

    console.log(scores);

    let comentarios = data.comentarios;

    var comments = JSON.parse(comentarios);

    console.log(comments);

    let table = {
        // headers are automatically repeated if the table spans over multiple pages
        // you can declare how many rows should be treated as headers
        headerRows: 3,
        widths: ['*', 'auto', 100, 60, 50, 60, 50],

        body: [
            [
                {
                    text: 'Nombre del alumno',
                    style: 'tableHeader',
                    alignment: 'center',
                    rowSpan: 3
                },
                {
                    text: 'Edad',
                    style: 'tableHeader',
                    alignment: 'center',
                    rowSpan: 3
                },
                {
                    text: 'Gender',
                    rowSpan: 3
                },
                {
                    text: 'Mark',
                    alignment: 'center',
                    colSpan: 4
                }, 
                {},
                {},
                {}
            ],
            [
                {},
                {},
                {},
                {
                    text: 'First Year',
                    alignment: 'center',
                    colSpan: 2
                },
                {},
                {
                    text: 'Second year',
                    alignment: 'center',
                    colSpan: 2
                },
                {}
            ],
            [
                {},
                {},
                {},
                {
                    text: 'Theory',
                },
                {
                    text: 'Practical'
                },
                {
                    text: 'Theory',
                },
                {
                    text: 'Practical',
                }
            ],
            // now data and values
            [
                'Ram',
                '32',
                'Male',
                '90',
                '95',
                '80',
                '95'
            ],
            [
                'Sita',
                '30',
                'Female',
                '95',
                '95',
                '80',
                '95'
            ],
            [
                'Laxman',
                '26',
                'Male',
                '70',
                '90',
                '75',
                '90'
            ],
        ]
    }

    let tablew = {
        headerRows: 2,
        widths: ['*', 'auto', 120, 60, 50, 60, 50],
        body: [
            [
                {
                    text: 'Respuesta',
                    style: 'tableHeader',
                },
                {
                    text: 'Comentario',
                    style: 'tableHeader',
                },
            ],
            [
                ''+answerkey[0].value,
                ''+comments[0].comment,
            ],
            [
                ''+answerkey[1].value,
                ''+comments[1].comment,
            ],
            [
                ''+answerkey[2].value,
                ''+comments[2].comment,
            ],
            [
                ''+answerkey[3].value,
                ''+comments[3].comment,
            ],
        ]
    }

    let docDefination = {
        content: [
            {
                text: "Prueba Table",
                style: 'header',
            },
            {
                text: "Fecha: " + new Date(fecha).toLocaleDateString(),
                style: 'subheader',
            },
            {
                text: "Respuestas: "+respuestas,
                style: 'subheader',
            },
            {
                text: "Comentarios: "+comentarios,
                style: 'subheader',
            },
            {
                text: "Puntaje: "+puntaje,
                style: 'subheader',
            },
            {
            //"PruebaTable",
                table: tablew
            }
        ]
    }

    let pdfDoc = pdfmake.createPdfKitDocument(docDefination, {});
    pdfDoc.pipe(fs.createWriteStream(`./pdfs/${filename}`));
    pdfDoc.end();
}

function crearReporteEvaluacionArticulacion (filename) {
    // {Function}
}

function crearReporteHabilidadesPreVerbales (filename, data) {
    // {Function}
}

module.exports = { helloWorldMake, generaReporte, reportePrueba, crearReporteEvaluacionArticulacion, crearReporteHabilidadesPreVerbales };