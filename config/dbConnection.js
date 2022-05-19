const mysql = require('mysql');

const connection = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
})
connection.connect(function (err){
    if(err){
        console.log(err);
        return;
    }
    else{
        console.log('Conectado a base de datos!')
    }
});

module.exports = connection;