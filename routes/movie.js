var express = require('express');
var router = express.Router();

// Models
const Movie = require('../models/Movie');

/* GET users listing. */
router.post('/', function(req, res, next) {
    const { title, imdb_score, category, country, year } = req.body;

    /*const movie = new Movie({
        title: title,
        imdb_score: imdb_score,
        category: category,
        country: country,
        year: year
    });*/

    const movie = new Movie(req.body);

    /*movie.save((err, data) => {
        if(err)
            res.send(err);

        res.json({
            status: true,
            data: data,
            message: ''
        });
    })*/

    // Promise kullanımı icin
    const promise = movie.save();

    promise.then((data) => {
        res.json({
            status: true,
            data: data,
            message: ''
        });
    }).catch((err) => {
        res.json(err);
    })

});

module.exports = router;
