var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');

// Models
const Director = require('../models/Director');

/* Get Directors */
router.get('/', (req, res) => {
    const promise = Director.aggregate([
        {
            $lookup: {
                from: 'movies',
                localField: '_id',
                foreignField: 'director_id',
                as: 'movies'
            }
        },
        {
            $unwind: {
                path: '$movies',
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $group: {
                _id: {
                    _id: '$_id',
                    name: '$name',
                    surname: '$surname',
                    bio: '$bio'
                },
                movies: {
                    $push: '$movies'
                }
            }
        },
        {
            $project: {
                _id: '$_id._id',
                name: '$_id.name',
                surname: '$_id.surname',
                bio: '$_id.bio',
                movies: '$movies'
            }
        }
    ]);

    promise.then((data) => {
        
        res.json(data);
    }).catch((err) => {
        res.json(err);
    })


});

/* Get a Director */
router.get('/:director_id', (req, res) => {
    const promise = Director.aggregate([
        {
            $match: {
                '_id': mongoose.Types.ObjectId(req.params.director_id)
            }
        },
        {
            $lookup: {
                from: 'movies',
                localField: '_id',
                foreignField: 'director_id',
                as: 'movies'
            }
        },
        {
            $unwind: {
                path: '$movies',
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $group: {
                _id: {
                    _id: '$_id',
                    name: '$name',
                    surname: '$surname',
                    bio: '$bio'
                },
                movies: {
                    $push: '$movies'
                }
            }
        },
        {
            $project: {
                _id: '$_id._id',
                name: '$_id.name',
                surname: '$_id.surname',
                bio: '$_id.bio',
                movies: '$movies'
            }
        }
    ]);

    promise.then((data) => {
        
        res.json(data);
    }).catch((err) => {
        res.json(err);
    })


});

/* New Director */
router.post('/', (req, res) => {
    const director = new Director(req.body)
    const promise = director.save();

    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        next({ message: err.message, code: -1 })
    });

});

/* Director update */
router.put('/:director_id', (req, res, next) => {
    const promise = Director.findByIdAndUpdate(
        req.params.director_id,
        req.body,
        {
            new: true
        }
    );

    promise.then((data) => {
        if(!data)
            next({ message: 'The director was not found', code: 404})
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });

});

/* Director Delete */
router.delete('/:director_id', (req, res, next) => {
    const promise = Director.findByIdAndRemove(req.params.director_id);

    promise.then((data) => {
        if(!data)
            res.json({ message: 'The director was not found', code: 404 })
        res.json({ status: true });
    }).catch((err) => {
        res.json(err);
    })

});


module.exports = router;
