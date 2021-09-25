const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

mongoose.connect('mongodb://localhost/vidly');

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

// router.post('/', (req, res) => {
//     const {error} = validateGenre(req.body);
//     if(error) return res.status(400).send(error.details[0].message);

//     const genre = {
//         id: genres.length + 1,
//         name: req.body.name
//     }
//     genres.push(genre);

//     res.send(genre);
// });

// router.put('/:id', (req, res) => {
//     const genre = genres.find( g => g.id === parseInt(req.params.id));
//     if(!genre) return res.status(404).send("The genre with this given ID didn't found.");

//     const {error} = validateGenre(req.body);
//     if(error) return res.status(400).send(error.details[0].message);

//     genre.name = req.body.name;
//     res.send(genre);
// });

// router.delete('/:id', (req, res) => {
//     const genre = genres.find( g => g.id === parseInt(req.params.id));
//     if(!genre) return res.status(404).send("The genre with this given ID didn't found.");

//     const index = genres.indexOf(genre);
//     genres.splice(index, 1);

//     res.send(genre);
// });

// router.get('/:id', (req, res) => {
//     const genre = genres.find(g => g.id === parseInt(req.params.id));
//     if (!genre) return res.status(404).send('The genre with the given ID was not found.');
//     res.send(genre);
// });

// function validateGenre(genre){
//     const schema = Joi.object({
//         name: Joi.string().min(3).required()
//     });

//     return schema.validate(genre);
// }

module.exports = router;