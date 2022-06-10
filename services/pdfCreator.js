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

function doc5 (filename) {
    // create document
  const doc = new pdft({ margin: 30 });

  // to save on server
  doc.pipe(fs.createWriteStream("./pdfs/document5.pdf"));

  const table01 = {
   "headers" : ["A", "", ""],
    "rows": [
        [ "Version 0.1.74", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id est ipsum. Fusce scelerisque maximus justo, lacinia ornare felis iaculis nec.", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id est ipsum. " ],
        [ "Update:", "Age 2", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id est ipsum. Fusce." ],
        [ "$ npm pdfkit-table@latest", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id est ipsum.", "Year 3" ],
        [ "Thanks", "Age 4", "Year 4" ],
    ],
  };

  const table02 = {
    "headers" : ["A", "B", "C"],
    "rows": [
        [ "Version 0.1.74", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id est ipsum. Fusce scelerisque maximus justo, lacinia ornare felis iaculis nec.", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id est ipsum. " ],
        [ "Update:", "Age 2", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id est ipsum. Fusce." ],
        [ "$ npm pdfkit-table@latest", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id est ipsum.", "Year 3" ],
        [ "Thank you", "Age 4", "Year 4" ],
    ],
};

  doc.table(table01, {
    columnSpacing: 10,
    padding: 10,
    columnsSize: [100, 120, 105],
    align: "center",
    prepareHeader: () => doc.fontSize(11), // {Function}
    // -----------------------------------------------------------------
    // HERE THE MAGIC:
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

  doc.table(table02, {
    columnSpacing: 10,
    padding: 10,
    columnsSize: [200, 220, 135],
    align: "center",
    prepareHeader: () => doc.fontSize(11), // {Function}
    // -----------------------------------------------------------------
    // HERE THE MAGIC:
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

function crearReporteEvaluacionArticulacion (filename) {

    const doc = new pdft({ margin: 30});

    doc.pipe(fs.createWriteStream(`./pdfs/${filename}`));

    const table01 = {
    "headers" : ["A", "", ""],
    "rows": [
        [ "Datos Personales", "", "" ],
        [ "Nombres del alumno", "Aqui va nombre", "" ],
        [ "Examinador", "Fecha de Nacimiento.", "Aqui va fecha de naciemitnoe" ],
        [ "Programa", "Progrmaa que va aqui", "Fecha de aplicacion" ],
    ],
    };

    /* const table02 = {
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
    }; */

    doc.table(table01,  {
    columnSpacing: 10,
    padding: 10,
    columnsSize: [200, 225, 135],
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

function crearReporteHabilidadesPreVerbales (filename, data) {
    const doc = new pdf({bufferPage: true});
    doc.pipe(fs.createWriteStream(filename));
    const table01 = {
        "headers" : ["A"],
         "rows": [
             [ "Datos Personales"],
             [ "Nombres del alumno", "Aqui va nombre", "" ],
             [ "Examinador","Aqui va nombre examinador", "Fecha de Nacimiento.", "Aqui va fecha de nacimiento" ],
             [ "Programa", "Progrmaa que va aqui", "Fecha de aplicacion","Aquí va la fecha " ],
         ],
       };
       const table02 = {
           "headers" : ["Respiracion","Puntaje","Respuestas"],
            "rows": [
                [ "1.Realiza el soplo adecuado para emiti fonemas con voz", "1","0","NR",JSON.parse(respuestas[0])],
                [ "2.Realiza el soplo adecuado para emiti fonemas sin voz", "1","0","NR",JSON.parse(respuestas[1])],
                [ "3.Realiza el soplo adecuado para emiti fonemas nasales", "1","0","NR",JSON.parse(respuestas[2])],
                [ "Capacidad Respiratoria"],
                [ "4.Entrada del aire nasal-salida nasal", "2","0","NR",JSON.parse(respuestas[3])],
                [  "5.Entrada del aire nasal-salida bucal(exhalo)", "2","0","NR",JSON.parse(respuestas[4])],
                [  "6.Inspiracion nasal lenta", "2","0","NR",JSON.parse(respuestas[5])],
                [  "7.Inspiracion nasal profunda", "2","0","NR",JSON.parse(respuestas[6])],
                [  "8.Inspiracion bucal lenta", "2","0","NR",JSON.parse(respuestas[7])],
                [  "9.Inspiracion nasal profunda-exhalacion bucal con fuerza", "2","0","NR",JSON.parse(respuestas[8])],
              
            ],
          };
          const table03 = {
           "headers" : ["Praxias"],
            "rows": [
                [ "1.Deglute ritmiticamente", "1","0","NR"],
                [ "Una respiracion , una succion, una degulacion(sin atragantarse o presentar tos al deglutir)"],
                [ "2.Deglute con popote grueso correctamente", "2","1","0"],
                [ "Protusion y redondeo simetrico labial",JSON.parse(respuestas[9])],
                [ "Sellado de labios al deglutir",JSON.parse(respuestas[10])],
                [ "Lengua retraida",JSON.parse(respuestas[11])],
                [ "Levanta punta de la lengua al deglutir",JSON.parse(respuestas[12])],
                [ "3.Deglute con popote mediano correctamente", "2","1","0"],
                [ "Protusion y redondeo simetrico labial",JSON.parse(respuestas[13])],
                [ "Sellado de labios al deglutir",JSON.parse(respuestas[14])],
                [ "Lengua retraida",JSON.parse(respuestas[15])],
                [ "Levanta punta de la lengua al deglutir",JSON.parse(respuestas[16])],
                [ "4.Deglute con popote delgado correctamente", "2","1","0"],
                [ "Protusion y redondeo simetrico labial",JSON.parse(respuestas[17])],
                [ "Sellado de labios al deglutir",JSON.parse(respuestas[18])],
                [ "Lengua retraida",JSON.parse(respuestas[19])],
                [ "Levanta punta de la lengua al deglutir",JSON.parse(respuestas[20])],
                [ "5.Toma con vaso correctamente", "4","3","2","1","0"],
                [ "Apoya el vaso en los labios",JSON.parse(respuestas[21])],
                [ "Lengua retraida",JSON.parse(respuestas[22])],
                [ "Levanta punta de la lengua para deglutir",JSON.parse(respuestas[23])],
                [ "mandibula estable, sin morder el vaso",JSON.parse(respuestas[24])],
                [ "linea media(que el vaso vaya a la boca)",JSON.parse(respuestas[25])],
                [ "6.Toma el alimento de la cuchara correctamente", "4","3","2","1","0"],
                [ "La lengua baja dentro de la boca para recibir la cuchara",JSON.parse(respuestas[26])],
                [ "Lengua retraida",JSON.parse(respuestas[27])],
                [ "sella labios para tomar alimento de esta",JSON.parse(respuestas[28])],
                [ "linea media de tronco y cabeza alineadas",JSON.parse(respuestas[29])],
                [ "linea media(que la cuchara vaya a la boca)",JSON.parse(respuestas[30])]
            ],
          };
          const table04 = {
           "headers" : ["Control mandibular","puntaje"],
            "rows": [
                [ "1.Abrir y cerrar boca ", "2","1","0"],
                [ "mantiene la línea media (sin movimientos laterales o anteriores)",JSON.parse(respuestas[31])],
                [ "apertura máxima", JSON.parse(respuestas[32])],
                [ "chocar dientes ", JSON.parse(respuestas[33])],
                
                [ "2.chocar dientes ", "2","1","0"],
                [ "mantiene la línea media (sin movimientos laterales o anteriores)", JSON.parse(respuestas[34])],
                [ "apertura máxima", JSON.parse(respuestas[35])],
                
                [ "3.Abrir boca aplicando fuerza contraria ", "2","1","0"],
                [ "mantiene la línea media (sin movimientos laterales o anteriores)", JSON.parse(respuestas[36])],
               
                
            ],
          };
          const table05 = {
           "headers" : ["Masticacion","puntaje"],
            "rows": [
                [ "1.Muerde un alimento suave ", "2","1","0","NR"],
                [ "trozar el alimento con los dientes (sin apoyo de la mano)", JSON.parse(respuestas[37])],
                [ "graduar apertura mandibular (según el tamaño del alimento)", JSON.parse(respuestas[38])],
                [ "posición correcta del alimento para morder (alimento suave dientes frontales)", JSON.parse(respuestas[39])],
                [ "mantiene línea media de tronco-cabeza ", JSON.parse(respuestas[40])],
                
                [ "2.Muerde un alimento duro ", "2","1","0","NR"],
                [ "trozar el alimento con los dientes (sin apoyo de la mano)", JSON.parse(respuestas[41])],
                [ "graduar apertura mandibular (según el tamaño del alimento)  ", JSON.parse(respuestas[42])],
                [ "posición correcta del alimento para morder ( alimentos duros primeros molares)  ", JSON.parse(respuestas[43])],
                [ "mantiene línea media de tronco-cabeza", JSON.parse(respuestas[44])],
                
                [ "3.Abre y cierra boca para masticar ", "2","1","0","NR"],
                [ "disociación de movimiento (lengua-mandíbula) ", JSON.parse(respuestas[45])],
                [ "tritura con muelas (no con lengua y paladar) ", JSON.parse(respuestas[46])],
                [ "realiza un mínimo de 3 a 5 masticaciones por bocado  ", JSON.parse(respuestas[47])],
                [ "mantiene línea media de tronco-cabeza", JSON.parse(respuestas[48])],
                
                [ "4.Mueve el bolo con la lengua ", "3","2","1","0","NR"],
                [ "mantiene la línea media (tronco y cabeza)  ", JSON.parse(respuestas[49])],
                
                [ "5.Mastica con sellado de labios  ","4","3", "2","1","0","NR"],
                [ "_mantiene el sellado de labios de forma natural (sin verse esforzado)", JSON.parse(respuestas[50])],
                [ "disociación de movimientos labios-mandíbula ", JSON.parse(respuestas[51])],
                [ "ingiere la cantidad de alimento adecuado en un bocado ", JSON.parse(respuestas[52])],
                [ "mantiene línea media de tronco-cabeza", JSON.parse(respuestas[53])],
               
               
                
            ],
          };
          const table06 = {
           "headers" : ["Control labio facial","puntaje"],
           "rows": [
               [ "1.Abrir boca  ", "2","1","0"],
               [ "simetría", JSON.parse(respuestas[54])],
               [ "movimiento con naturalidad ", JSON.parse(respuestas[55])],
               [ "rango de apertura mandibular moderada", JSON.parse(respuestas[56])],
               [ "mantiene línea media de tronco-cabeza", JSON.parse(respuestas[57])],
              
               [ "2.Cerrar boca", "2","1","0"],
               [ "simetría", JSON.parse(respuestas[58])],
               [ "movimiento con naturalidad ", JSON.parse(respuestas[59])],
               [ "mantiene línea media de tronco-cabeza", JSON.parse(respuestas[60])],
              
               [ "3.Extender labios  ", "2","1","0"],
               [ "simetría", JSON.parse(respuestas[61])],
               [ "movimiento con naturalidad ", JSON.parse(respuestas[62])],
               [ "buen rango de extensión", JSON.parse(respuestas[63])],
               [ "rango de apertura mandibular  mínima o moderada ", JSON.parse(respuestas[64])],
               [ "mantiene línea media de tronco-cabeza ", JSON.parse(respuestas[65])],
              
               [ "4.Ocultar labio superior ", "2","1"],
               [ "movimiento con naturalidad ", JSON.parse(respuestas[66])],
               [ "mantiene línea media de tronco-cabeza", JSON.parse(respuestas[67])],
              
               [ "5.Ocultar labio inferior  ","2","1","0"],
               [ "movimiento con naturalidad ", JSON.parse(respuestas[68])],
               [ "mantiene línea media de tronco-cabeza", JSON.parse(respuestas[69])],
              
               [ "6.Esconder los dos labios  ","2","1","0"],
               [ "oculta ambos lados ", JSON.parse(respuestas[70])],
               [ "mantiene línea media de tronco-cabeza", JSON.parse(respuestas[71])],
              
               [ "7.Morder labio superior  ","2","1","0"],
               [ "movimiento con naturalidad ", JSON.parse(respuestas[72])],
               [ "mantiene línea media de tronco-cabeza", JSON.parse(respuestas[73])],
              
               [ "8.Morder labio inferior ","2","1","0"],
               [ "movimiento con naturalidad ", JSON.parse(respuestas[74])],
               [ "mantiene línea media de tronco-cabeza", JSON.parse(respuestas[75])],
              
               [ "9.Fruncir labios (beso) ","2","1","0"],
               [ "simetría  ", JSON.parse(respuestas[76])],
               [ "movimiento con naturalidad ", JSON.parse(respuestas[77])],
               [ "protrusión labial ", JSON.parse(respuestas[78])],
               [ "redondeo con sellado ", JSON.parse(respuestas[79])],
               [ "movimiento mínimo de mandíbula ", JSON.parse(respuestas[80])],
               [ "mantiene línea media de tronco-cabeza ", JSON.parse(respuestas[81])],
              
               [ "10.vibrar labios ","2","1","0"],
               [ "movimiento con naturalidad ", JSON.parse(respuestas[82])],
               [ "mantiene línea media de tronco-cabeza", JSON.parse(respuestas[83])],
              
               
           ],
          };
          const table07 = {
           "headers" : ["Control lingual","puntaje"],
           "rows": [
               [ "1.Sacar la lengua  ", "2","1","0"],
               [ "naturalidad  en el movimiento", JSON.parse(respuestas[84])],
               [ "salida de la lengua por línea media   ", JSON.parse(respuestas[85])],
               [ " independencia de la mandíbula ", JSON.parse(respuestas[86])],
       
               [ "2.Sacar y meter la lengua rápidamente ", "2","1","0"],
               [ "naturalidad  en el movimiento ", JSON.parse(respuestas[87])],
               [ " independencia de la mandíbula ", JSON.parse(respuestas[88])],
               [ "línea media de tronco y cabeza ", JSON.parse(respuestas[89])],
               [ "movimiento horizontal  ", JSON.parse(respuestas[90])],
               [ "salida de la lengua por línea media   ", JSON.parse(respuestas[91])],
               [ "retracción lingual ", JSON.parse(respuestas[92])],
               [ "movimiento organizado ", JSON.parse(respuestas[93])],
       
               [ "3.Intentar tocar la barbilla ", "2","1","0"],
               [ "naturalidad  en el movimiento ", JSON.parse(respuestas[94])],
               [ "línea media de tronco y cabeza ", JSON.parse(respuestas[95])],
       
               [ "salida de la lengua por línea media   ", JSON.parse(respuestas[96])],
               [ "lengua en punta  ", JSON.parse(respuestas[97])],
               [ "movimiento organizado ", JSON.parse(respuestas[98])],
       
               [ "4.Realizar barrido en labio inferior  ", "2","1","0"],
               [ "naturalidad  en el movimiento ", JSON.parse(respuestas[99])],
               [ " independencia de la mandíbula ", JSON.parse(respuestas[100])],
               [ "línea media de tronco y cabeza ", JSON.parse(respuestas[101])],
               [ "salida de la lengua por línea media   ", JSON.parse(respuestas[102])],
               [ "retracción lingual ", JSON.parse(respuestas[103])],
               [ "movimiento organizado ", JSON.parse(respuestas[104])],
       
               [ "5.Realizar barrido en labio inferior  ", "2","1","0"],
               [ "naturalidad  en el movimiento ", JSON.parse(respuestas[8])],
               [ " independencia de la mandíbula ", JSON.parse(respuestas[8])],
               [ "línea media de tronco y cabeza ", JSON.parse(respuestas[8])],
               [ "salida de la lengua por línea media   ", JSON.parse(respuestas[8])],
               [ " lengua en punta  ", JSON.parse(respuestas[8])],
               [ "movimiento organizado ", JSON.parse(respuestas[8])],
       
               [ "6.Realizar barrido en labio superior  ", "2","1","0"],
               [ "naturalidad  en el movimiento ", JSON.parse(respuestas[8])],
               [ " independencia de la mandíbula ", JSON.parse(respuestas[8])],
               [ "línea media de tronco y cabeza ", JSON.parse(respuestas[8])],
               [ "salida de la lengua por línea media   ", JSON.parse(respuestas[8])],
               [ " lengua en punta  ", JSON.parse(respuestas[8])],
               [ "movimiento organizado ", JSON.parse(respuestas[8])],
       
              [ "7.Tocar comisura derecha ","3" ,"2","1","0"],
               [ "naturalidad  en el movimiento ", JSON.parse(respuestas[8])],
               [ " independencia de la mandíbula ", JSON.parse(respuestas[8])],
               [ "línea media de tronco y cabeza ", JSON.parse(respuestas[8])],
               [ "salida de la lengua por línea media   ", JSON.parse(respuestas[8])],
               [ " lengua en punta  ", JSON.parse(respuestas[8])],
               [ "movimiento organizado ", JSON.parse(respuestas[8])],
       
               [ "8.Tocar comisura izquierda ","3" ,"2","1","0"],
               [ "naturalidad  en el movimiento ", JSON.parse(respuestas[8])],
               [ " independencia de la mandíbula ", JSON.parse(respuestas[8])],
               [ "línea media de tronco y cabeza ", JSON.parse(respuestas[8])],
               [ "salida de la lengua por línea media   ", JSON.parse(respuestas[8])],
               [ " lengua en punta  ", JSON.parse(respuestas[8])],
               [ "movimiento organizado ", JSON.parse(respuestas[8])],
       
               [ "9.Mover la lengua de un lado a otro tocando comisuras ","3" ,"2","1","0"],
               [ "naturalidad  en el movimiento ", JSON.parse(respuestas[8])],
               [ " independencia de la mandíbula ", JSON.parse(respuestas[8])],
               [ "línea media de tronco y cabeza ", JSON.parse(respuestas[8])],
               [ "salida de la lengua por línea media   ", JSON.parse(respuestas[8])],
               [ " lengua en punta  ", JSON.parse(respuestas[8])],
               [ "movimiento organizado ", JSON.parse(respuestas[8])],
       
               [ "10.Empujar la mejilla derecha ","3" ,"2","1","0"],
               [ " independencia de la mandíbula ", JSON.parse(respuestas[8])],
               [ "línea media de tronco y cabeza ", JSON.parse(respuestas[8])],
               [ "movimiento de la lengua a la altura de los molares ", JSON.parse(respuestas[8])],
       
               [ "11.Empujar la mejilla izquierda  ","3" ,"2","1","0"],
               [ " independencia de la mandíbula ", JSON.parse(respuestas[8])],
               [ "línea media de tronco y cabeza ", JSON.parse(respuestas[8])],
               [ "movimiento de la lengua a la altura de los molares ", JSON.parse(respuestas[8])],
       
               [ "12.Levantar punta de lengua para tocar el paladar  ","4","3" ,"2","1","0"],
               [ "naturalidad  en el movimiento ", JSON.parse(respuestas[8])],
               [ " independencia de la mandíbula ", JSON.parse(respuestas[8])],
               [ "línea media de tronco y cabeza ", JSON.parse(respuestas[8])],
               [ "salida de la lengua por línea media   ", JSON.parse(respuestas[8])],
               [ " lengua en punta  ", JSON.parse(respuestas[8])],
               [ "movimiento organizado ", JSON.parse(respuestas[8])],
       
               [ "13.Realizar chasquido con ritmo   ","4","3" ,"2","1","0"],
               [ " independencia de la mandíbula ", JSON.parse(respuestas[8])],
               [ "línea media de tronco y cabeza ", JSON.parse(respuestas[8])],
       
               [ "14.Levantar la punta de la lengua detrás de los dientes sup. ","4","3" ,"2","1","0"],
               [ "naturalidad  en el movimiento ", JSON.parse(respuestas[8])],
               [ " independencia de la mandíbula ", JSON.parse(respuestas[8])],
               [ "línea media de tronco y cabeza ", JSON.parse(respuestas[8])],
               [ "salida de la lengua por línea media   ", JSON.parse(respuestas[8])],
               [ " lengua en punta  ", JSON.parse(respuestas[8])],
               [ "movimiento organizado ", JSON.parse(respuestas[8])],
       
               [ "15.Levantar la punta de la lengua delante de los dientes sup. ","4","3" ,"2","1","0"],
               [ "naturalidad  en el movimiento ", JSON.parse(respuestas[8])],
               [ " independencia de la mandíbula ", JSON.parse(respuestas[8])],
               [ "línea media de tronco y cabeza ", JSON.parse(respuestas[8])],
               [ "salida de la lengua por línea media   ", JSON.parse(respuestas[8])],
               [ " lengua en punta  ", JSON.parse(respuestas[8])],
               [ "movimiento organizado ", JSON.parse(respuestas[8])],
       
               [ "16.Levantar la punta de la lengua tratando de tocar la nariz  ","4","3" ,"2","1","0"],
               [ "naturalidad  en el movimiento ", JSON.parse(respuestas[8])],
               [ " independencia de la mandíbula ", JSON.parse(respuestas[8])],
               [ "línea media de tronco y cabeza ", JSON.parse(respuestas[8])],
               [ "salida de la lengua por línea media   ", JSON.parse(respuestas[8])],
               [ " lengua en punta  ", JSON.parse(respuestas[8])],
               [ "movimiento organizado ", JSON.parse(respuestas[8])],
       
         
              
               
           ],
          };
          const table08 = {
           "headers" : ["Mejillas ","puntaje"],
            "rows": [
                [ "1.Inflar mejillas (ambas) ", "2","1","0"],
                [ "línea media de tronco y cabeza", JSON.parse(respuestas[8])],
                [ "sellado de labios", JSON.parse(respuestas[8])],
                [ "Entrada del aire nasal", JSON.parse(respuestas[8])],
                
                [ "2.Inflar mejilla derecha  ","3", "2","1","0"],
                [ "línea media de tronco y cabeza", JSON.parse(respuestas[8])],
                [ "sellado de labios", JSON.parse(respuestas[8])],
                [ "Entrada del aire nasal", JSON.parse(respuestas[8])],
                
                [ "2.Inflar mejilla izquierda  ","3", "2","1","0"],
                [ "línea media de tronco y cabeza", JSON.parse(respuestas[8])],
                [ "sellado de labios", JSON.parse(respuestas[8])],
                [ "Entrada del aire nasal", JSON.parse(respuestas[8])],
                
            ],
          };
       
          const table09 = {
           "headers" : ["Coordinar 2 movimientos","puntaje"],
           "rows": [
               [ "1.Morder y abrir la boca ", "3","2","1","0"],
               [ "línea media de tronco y cabeza  ", JSON.parse(respuestas[8])],
               [ "naturalidad  en el movimiento  ", JSON.parse(respuestas[8])],
               [ " rango de apertura mandibular moderada ", JSON.parse(respuestas[8])],
               [ " línea media de la mandíbula ", JSON.parse(respuestas[8])],
               [ " simetría ", JSON.parse(respuestas[8])],
               [ " Muestra dientes ", JSON.parse(respuestas[8])],
       
               [ "2.Morder y soplar  ", "3","2","1","0"],
               [ "línea media de tronco y cabeza  ", JSON.parse(respuestas[8])],
               [ "naturalidad  en el movimiento  ", JSON.parse(respuestas[8])],
               [ " rango de apertura mandibular moderada ", JSON.parse(respuestas[8])],
               [ " línea media de la mandíbula ", JSON.parse(respuestas[8])],
               [ " redondeo y protrusión de labios con simetría ", JSON.parse(respuestas[8])],
               [ " Muestra dientes ", JSON.parse(respuestas[8])],
               [ "entrada del aire nasal ", JSON.parse(respuestas[8])],
       
               [ "3.Soplar y sonreír (mostrar dientes)  ", "3","2","1","0"],
               [ "naturalidad  en el movimiento  ", JSON.parse(respuestas[8])],
               [ " rango de apertura mandibular moderada ", JSON.parse(respuestas[8])],
               [ " línea media de la mandíbula ", JSON.parse(respuestas[8])],
               [ " redondeo y protrusión de labios con simetría ", JSON.parse(respuestas[8])],
               [ "retracción simétrica  mostrando dientes  ", JSON.parse(respuestas[8])],
               [ "entrada del aire nasal ", JSON.parse(respuestas[8])],
       
               [ "4.Sonreir y besar", "3","2","1","0"],
               [ "naturalidad  en el movimiento  ", JSON.parse(respuestas[8])],
               [ " rango de apertura mandibular moderada ", JSON.parse(respuestas[8])],
               [ " línea media de la mandíbula ", JSON.parse(respuestas[8])],
               [ " redondeo y protrusión de labios con simetría ", JSON.parse(respuestas[8])],
               [ "retracción simétrica  mostrando dientes  ", JSON.parse(respuestas[8])],
       
               [ "5.Besar y sacar la lengua  ","4","3", "2","1","0"],
               [ "movimiento organizado de la lengua ", JSON.parse(respuestas[8])],
               [ " rango de apertura mandibular moderada ", JSON.parse(respuestas[8])],
               [ " línea media de la mandíbula ", JSON.parse(respuestas[8])],
               [ " redondeo y protrusión de labios con simetría ", JSON.parse(respuestas[8])],
               [ "línea media de la lengua ", JSON.parse(respuestas[8])],
               [ " lengua independiente de la mandíbula   ", JSON.parse(respuestas[8])],
       
             
       
         
              
               
           ],
          };
       doc.table(table01,table02,table03,table04, table05,table06,table07,table08,table09,{
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
}

module.exports = { helloWorldMake, generaReporte, doc5, crearReporteEvaluacionArticulacion, crearReporteHabilidadesPreVerbales };