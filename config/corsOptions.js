const allowedOrgins = require('./allowedOrigins');

const corsOptions = {
    origin: (origin, callback) => {
        if(allowedOrgins.indexOf(origin) !== -1 || !origin){ //remove !origin after development
            callback(null, true)
        } else{
            callback(new Error('Not allowed by CORS'));
        }
    }, 
    optionsSuccessStatus: true,
}
module.exports = corsOptions;