const allowedOrgins = require('./allowedOrigins');

const corsOptions = {
    origin: 'https://fascinating-crumble-61bdb4.netlify.app',
    optionsSuccessStatus: 200,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
}
module.exports = corsOptions;