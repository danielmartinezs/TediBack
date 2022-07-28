require('dotenv').config();
const cors = require("cors"); 
const express = require("express");
const app = express();
var mysql = require('mysql');
require('dotenv').config();

//SETTINGS
app.set('port', process.env.PORT || 5000);

//MIDDLEWARE
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

//ROUTES
app.use('/login', require('./routes/loginRoute.js'));
app.use('/profiles', require('./routes/userManagementRoute.js'));
app.use('/questionnaires', require('./routes/questionaireRoute.js'));
app.use('/reportes', require('./routes/reportRoute.js'));
app.use('/graphs', require('./routes/graphRoute.js'));

app.listen('port', function(){
    console.log(`express server running on port`, app.get('port'));
});

/* app.listen(app.get('port'), function(){
    console.log(`express server running on port`, app.get('port'));
}); */