const express = require('express');
const app = express();
const genres = require('./routes/genres');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/vidly')
    .then(() => console.log("Connected to Mongo..."))
    .catch(err => console.error("Could not connect to Mongo..."));

app.use(express.json());
app.use('/api/genres', genres);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));