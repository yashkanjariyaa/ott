const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
        id: Number,
        backgroundImg: String,
        cardImg: String,
        description: String,
        subTitle: String,
        title: String,
        titleImg: String,
        type: String,
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
