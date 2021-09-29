const express = require('express');
const router = express.Router();
const {Customer} = require('../model/customer');
const {Movie} = require('../model/movie');
const {Rental, validate} = require('../model/rental');

router.get('/', async(req,res)=>{
    const rentals = Rental.find().sort('-dateOut');
    res.send(rentals);
});

router.post('/', async(req,res)=>{
    const {error} = validate(req.body);
    if(error) res.status(400).send(error.details[0].message);
    
    const customer = await Customer.findById(req.body.customerId);
    if(!customer) res.status(404).send('Invalid customer');

    const movie = await Movie.findById(req.body.movieId);
    if(!movie) res.status(404).send('Invalid movie');

    if(movie.numberInStock == 0) res.status(400).send("Movie not in stock.")

    let rental = new Rental({
        customer: {
            _id: customer.id,
            name: customer.name,
            isGold: customer.isGold,
            phone: customer.phone
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: dailyRentalRate
        }
    });

    rental = await rental.save();

    movie.numberInStock--;
    movie.save();

    res.send(rental);
});