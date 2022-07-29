require('dotenv').config();
const cors = require("cors"); 
const express = require("express");
const corsOptions = require('./config/corsOptions.js');
const app = express();

//SETTINGS
app.set('port', process.env.PORT || 5000);

//MIDDLEWARE
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors(corsOptions));

//CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});

//ROUTES
app.use('/login', require('./routes/loginRoute.js'));
app.use('/profiles', require('./routes/userManagementRoute.js'));
app.use('/questionnaires', require('./routes/questionaireRoute.js'));
app.use('/reportes', require('./routes/reportRoute.js'));
app.use('/graphs', require('./routes/graphRoute.js'));

app.get('/', (req, res) => {
    res.send('Hello World, estoy conectado a la base de datos '+process.env.DATABASE);
});

app.listen(process.env.PORT || 5000, function(){
    console.log(`express server running on port`, app.get('port'));
});

/* app.listen(app.get('port'), function(){
    console.log(`express server running on port`, app.get('port'));
}); */