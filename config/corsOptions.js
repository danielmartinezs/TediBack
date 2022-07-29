const allowedOrgins = require('./allowedOrigins');

const corsOptions = {
    origin: 'https://fascinating-crumble-61bdb4.netlify.app || http://localhost:3000',
    optionsSuccessStatus: 200,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
}
module.exports = corsOptions;