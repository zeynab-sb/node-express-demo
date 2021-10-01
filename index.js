const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const config = require('config');
require('express-async-errors');
const winston = require('winston');
require('winston-mongodb');

require('./startup/routes')(app)

winston.handleExceptions(
    new winston.transports.File({filename: 'uncaughtException.log'}));

process.on('unhandledRejection', (ex)=>{
    throw ex;
})    

winston.add(winston.transports.File, {filename: 'logfile.log'});
winston.add(winston.transports.Mongodb, {
    db: 'mongodb://localhost/vidly',
    level: 'error'
})

if(!config.get('jwtPrivateKey')){
    console.error('FATAL ERROR: jwtPrivateKey is not defined');
    process.exit(1);
}

mongoose.connect('mongodb://localhost/vidly')
    .then(() => console.log("Connected to Mongo..."))
    .catch(err => console.error("Could not connect to Mongo..."));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));