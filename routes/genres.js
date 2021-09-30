const express = require('express');
const router = express.Router();
const {Genre, validate} = require('../model/genre');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

router.get('/', async (req, res) => {
    try{
        const genres = await Genre.find();
        res.send(genres);
    }catch(ex){
        res.status(400).send(ex.message);
    }
});

router.post('/', auth, async (req, res) => {
    const {error} = validate(req.body);
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

router.put('/:id', auth, async (req, res) => {
    try{
        const {error} = validate(req.body);
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

router.delete('/:id', [auth, admin], async (req, res) => {
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

module.exports = router;