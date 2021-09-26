const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Joi = require('joi');


const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

const Genre = mongoose.model('Genre', genreSchema);


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

    const genre = new Genre({
        name: req.body.name
    })
    
    try{
        const result = await genre.save();
        res.send(result);
    }
    catch(ex){
        res.status(400).send(ex.message)
    }
});

router.put('/:id', async (req, res) => {
    const genre = await Genre.findById(req.params.id);
    if(!genre) return res.status(404).send("The genre with this given ID didn't found.");

    const {error} = validateGenre(req.body);
    if(error) return res.status(400).send(error.details[0].message);


    try{
        genre.name = req.body.name;
        await genre.save();
    
        res.send(genre);
    }
    catch(ex){
        res.status(400).send(ex.message)
    }

});

router.delete('/:id', async (req, res) => {
    const genre = Genre.findById(req.params.id);
    if(!genre) return res.status(404).send("The genre with this given ID didn't found.");

    try{
        await Genre.deleteOne({_id: req.params.id});
        res.send(genre);
    }
    catch(ex){
        res.status(400).send(ex.message);
    }
})

router.get('/:id', (req, res) => {
    const genre = Genre.findById(req.params.id);
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