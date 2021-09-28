const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Joi = require('joi');


const Genre = mongoose.model('Genre', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
}));


router.get('/', async (req, res) => {
    try{
        const genres = await Genre.find();
        res.send(genres);
    }catch(ex){
        res.status(400).send(ex.message);
    }
});

router.post('/', async (req, res) => {
    const {error} = validateGenre(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let genre = new Genre({name: req.body.name})
    
    try{
        genre = await genre.save();
        res.send(genre);
    }
    catch(ex){
        res.status(400).send(ex.message)
    }
});

router.put('/:id', async (req, res) => {
    try{
        const {error} = validateGenre(req.body);
        if(error) return res.status(400).send(error.details[0].message);

        const genre = await Genre.findByIdAndUpdate(req.params.id,{name: req.body.name},{
            new: true
        })
        if(!genre) return res.status(404).send("The genre with this given ID didn't found.");

        res.send(genre);
    }
    catch(ex){
        res.status(400).send(ex.message)
    }

});

router.delete('/:id', async (req, res) => {
    try{
        const genre = await Genre.findByIdAndRemove(req.params.id);
        if(!genre) return res.status(404).send("The genre with this given ID didn't found.");
        
        res.send(genre);
    }
    catch(ex){
        res.status(400).send(ex.message);
    }
})

router.get('/:id', async (req, res) => {
    const genre = await Genre.findById(req.params.id);
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');
    res.send(genre);
});

function validateGenre(genre){
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    return schema.validate(genre);
}

module.exports = router;