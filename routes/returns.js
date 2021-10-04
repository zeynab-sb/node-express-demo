const express = require('express');
const router = express.Router();
const {Rental} = require('../model/rental');
const {Movie} = require('../model/movie'); 
const auth = require('../middleware/auth');
const moment = require('moment');

router.post('/', auth, async (req, res) => {
    if(!req.body.customerId) return res.status(400).send('customerId is not provided');
    if(!req.body.movieId) return res.status(400).send('movieId is not provided');

    const rental = await Rental.findOne({
        'customer._id': req.body.customerId, 
        'movie._id': req.body.movieId
        });
    if(!rental) return res.status(404).send('Rental not found');

    if(rental.dateReturned) return res.status(400).send('Return already processed.');

    rental.dateReturned = new Date();
    const rentalDays = moment().diff(rental.dateOut, 'days');
    rental.rentalFee = rentalDays * rental.movie.dailyRentalRate;
    await rental.save();

    await Movie.update({_id: rental.movie._id},{
        $inc: {numberInStock: 1}
    });

    res.status(200).send(rental);
});

module.exports = router;