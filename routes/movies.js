const express = require('express');
const router = express.Router();
const {Movie, validate} = require('../model/movie');
const {Genre} = require('../model/genre');

router.get('/', async(req,res)=>{
    const movies = await Movie.find();
    res.send(movies);
});

router.post('/', async(req,res)=>{
    const {error} = validate(req.body);
    if (error) res.status(400).send(error.details[0].message);
    
    const genre = Genre.findById(req.body.genreId);
    if(!genre) res.status(404).send("The genre with this given ID didn't found.");

    let movie = new Movie({
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    })

    movie = await movie.save();

    res.send(movie);
});

router.put('/:id', async(req,res)=>{
    const {error} = validate(req.body);
    if (error) res.status(400).send(error.details[0].message);

    const genre = Genre.findById(req.body.genreId);
    if(!genre) res.status(404).send("Invalid genre.");

    const movie = await Movie.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    }, {new : true});

    if(!movie) res.status(404).send("The movie with this given ID didn't found.");

    res.send(movie);
});

router.delete('/:id', async(req,res)=>{
    const movie = await Movie.findByIdAndRemove(req.params.id);
    if(!movie) res.status(404).send("The movie with this given ID didn't found.");

    res.send(movie);
});

router.get('/:id', async(req,res)=>{
    const movie = await Movie.findById(req.params.id);
    if(!movie) res.status(404).send("The movie with this given ID didn't found.");

    res.send(movie);
})