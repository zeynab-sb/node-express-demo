const mongoose = require('mongoose');
const Joi = require('joi');

const Customer = mongoose.model('Customer', new mongoose.Schema({
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
}));

function validateCustomer(customer){
    const schema = Joi.object({
        isGold: Joi.boolean(),
        name: Joi.string().min(5).max(55).required(),
        phone: Joi.string().min(5).max(55).required()
    });

    return Joi.validate(schema, customer);
}

exports.Customer = Customer;
exports.validate = validateCustomer;