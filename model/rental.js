const mongoose = require('mongoose');
const Joi = require('joi');

const Rental = mongoose.model('Rental', new mongoose.Schema({
    customer:{
        type: new mongoose.Schema({
            isGold:{
                type: Boolean,
                default: false
            },
            name: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 55
            },
            phone: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 55
            }
        }),
        required: true
    },
    movie: {
        type: new mongoose.Schema({
            title:{
                type: String,
                minlength: 5,
                maxlength: 55,
                required: true
            },
            dailyRentalRate:{
                type: Number,
                required: true,
                min: 0,
                max: 255
            }
        }),
        required: true
    },
    dateOut:{
        type: Date,
        required: true,
        default: Date.now
    },
    dateReturned:{
        type: Date
    },
    rentalFee: {
        type: Number,
        minlength: 0
    }
}));

function validateRental(rental){
    const schema = Joi.object({
        customerId: Joi.objectId().required(),
        movieId: Joi.objectId().required()
    });

    return schema.validate(rental);
}

exports.Rental = Rental;
exports.validate = validateRental;