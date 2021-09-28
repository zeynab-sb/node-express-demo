const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Joi = require('joi');

const Customer = mongoose.model('Customer', new mongoose.Schema({
    isGold:{
        type: Boolean,
        required: true
    },
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    phone: {
        type: String,
        required: true
    }
}));

router.get('/',async(req,res)=>{
    const customers = await Customer.find();
    res.send(customers);
});

router.post('/', async(req,res)=>{
    const {error} = validateCustomer(req.body);
    if(error) res.status(400).send(error.details[0].message);

    let customer = new Customer({
        isGold: req.body.isGold,
        name: req.body.name,
        phone: req.body.phone
    });

    customer = await customer.save();
    res.send(customer);
});

router.put('/:id', async(req,res)=>{
    const {error} = validateCustomer(req.body);
    if (error) res.status(400).send(error.details[0].message);

    const customer = await Customer.findByIdAndUpdate(req.params.id,{
        isGold: req.body.isGold,
        name: req.body.name,
        phone: req.body.phone
    },{new: true});

    if(!customer) res.status(404).send("The customer with this given ID didn't found.");

    res.send(customer);
});

router.delete('/:id', async(req,res)=>{
    const customer = await Customer.findByIdAndRemove(req.params.id);
    if(!customer) res.status(404).send("The customer with this given ID didn't found.");

    res.send(customer);
});

router.get('/:id', async(req,res)=>{
    const customer = await Customer.findById(id);
    if(!customer) res.status(404).send()
});


function validateCustomer(customer){
    const schema = Joi.object({
        isGold: Joi.boolean().required(),
        name: Joi.string().min(5).max(255).required(),
        phone: Joi.string().required()
    });

    return schema.validate(customer);
}
module.exports = router;