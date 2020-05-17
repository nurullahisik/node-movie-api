var express = require('express');
var router = express.Router();

// Models
const Movie = require('../models/Movie');

router.get('/', (req, res) => {
    // const promise = Movie.find({  });

    const promise = Movie.aggregate([
        {
            $lookup: {
                from: 'directors',
                localField: 'director_id',
                foreignField: '_id',
                as: 'director'
            }
        },
        {
            $unwind: '$director'
        }
    ]);

    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });

});

/* BETWEEN TWO YEARS */
router.get('/betweeen/:start_year/:end_year', (req, res) => {
    const { start_year, end_year } = req.params;

    const promise = Movie.find(
        { 
            // gte: greater then equals, gt: greater then
            year: { "$gt": parseInt(start_year), "$lte": parseInt(end_year) }
        }
    );

    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });

});

/* TOP 10 */
router.get('/top10', (req, res) => {
    const promise = Movie.find({  }).limit(10).sort({ imdb_score: -1 });

    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });

});

/* GET MOVIE */
router.get('/:movie_id', (req, res, next) => {
    const { movie_id } = req.params;
    
    const promise = Movie.findById(movie_id);

    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        next({ message: 'The movie was not found!', code: 404 })
    })

});

/* UPDATE MOVIE */
router.put('/:movie_id', (req, res, next) => {
    const { movie_id } = req.params;
    
    const promise = Movie.findByIdAndUpdate(
        movie_id, 
        req.body,
        {
            new: true // update islemi sonrası yeni datayı gostermek icin
        }
        );

    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        next({ message: 'The movie updated error', code: 404 })
    })

});

/* DELETE MOVIE */
router.delete('/:movie_id', (req, res, next) => {
    const { movie_id } = req.params;
    
    const promise = Movie.findByIdAndRemove(movie_id);

    promise.then((data) => {
        if(!data)
            next({ message: 'The movie was not found', code: -1 })

        res.json({ status: true, message: 'The movie deleted.' });
    }).catch((err) => {
        next({ message: 'The movie was not found error', code: 404 })
    })

});

/* CREATE MOVIE */
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
