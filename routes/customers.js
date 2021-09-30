const express = require('express');
const router = express.Router();
const {Customer, validate} = require('../model/customer');
const auth = require('../middleware/auth');

router.get('/',async(req,res)=>{
    const customers = await Customer.find();
    res.send(customers);
});

router.post('/', auth, async(req,res)=>{
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let customer = new Customer({
        isGold: req.body.isGold,
        name: req.body.name,
        phone: req.body.phone
    });

    customer = await customer.save();
    res.send(customer);
});

router.put('/:id', auth, async(req,res)=>{
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findByIdAndUpdate(req.params.id,{
        isGold: req.body.isGold,
        name: req.body.name,
        phone: req.body.phone
    },{new: true});

    if(!customer) res.status(404).send("The customer with this given ID didn't found.");

    res.send(customer);
});

router.delete('/:id', auth, async(req,res)=>{
    const customer = await Customer.findByIdAndRemove(req.params.id);
    if(!customer) return res.status(404).send("The customer with this given ID didn't found.");

    res.send(customer);
});

router.get('/:id', async(req,res)=>{
    const customer = await Customer.findById(id);
    if(!customer) return res.status(404).send();

    res.send(customer);
});

module.exports = router;