const mongoose = require('mongoose');
const Joi = require('joi');
const {genreSchema} = require('./genre');

const Movie = mongoose.model('Movie', new mongoose.Schema({
    title:{
        type: String,
        minlength: 5,
        maxlength: 55,
        required: true
    },
    genre: {
        type: genreSchema,
        required: true
    },
    numberInStock: {
        type: Number,
        default: 0
    },
    dailyRentalRate:{
        type: Number,
        default: 0
    }
}));

function validateMovie(movie){
    const schema = Joi.object({
        title: Joi.string.min(5).max(55).required(),
        genre: Joi.required(),
        numberInStockL: Joi.number(),
        dailyRentalRate: Joi.number()
    });

    return schema.validate(movie);
}

exports.Movie = Movie;
exports.validate = validateMovie;