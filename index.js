const express = require('express');
const app = express();
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');
const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const config = require('config');
const error = require('./middleware/error');
require('express-async-errors');
const winston = require('winston');
require('winston-mongodb');

winston.handleExceptions(
    new winston.transports.File({filename: 'uncaughtException.log'}));

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

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.user('/api/auth', auth);
app.use(error);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));