var express = require('express');
var router = express.Router();

const Movie = require('../models/Movie');

router.get('/', function (req, res) {
    /*
    const promise = Movie.find({});
    promise.then((data) => {
        res.json(data)
    })
    promise.catch((err) => {
        res.json(err)
    }) */

    Movie.find({})
        .then((data) => {
            res.json(data)
        })
        .catch((err) => {
            res.json(err)
        })

});

router.post('/', function (req, res) {


    const movie = new Movie({
        title: req.body.title,
        category: req.body.category,
        countrty: req.body.countrty,
        year: req.body.year,
        imdb_score: req.body.imdb_score

    });

    movie.save((err, data) => {
        if (err) {
            res.json(err)
        }
        res.json(data)
    })

});

router.get('/top10', (req, res) => {
    const promise = Movie.find({}).limit(10).sort({ imdb_score: -1 });

    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    })
});

router.get('/:movie_id', (req, res, next) => {
    const promise = Movie.findById(req.params.movie_id);

    promise.then((movie) => {
        console.log(movie);
        if (!movie)
            next({ message: 'The movie was not found.', code: 99 });

        res.json(movie);
    }).catch((err) => {
        res.json(err);
    });
});

router.put('/:movie_id', (req, res, next) => {
    const promise = Movie.findOneAndUpdate(req.params.movie_id, req.body, { new: true });
    promise.then((data) => {
        if (!data)
            next({ message: 'The movie was not found.', code: 99 });

        res.json(data);
    })
    promise.catch((err) => {
        res.json(err);
    });
});

router.delete('/:movie_id', (req, res, next) => {
    const promise = Movie.findByIdAndRemove(req.params.movie_id);

    promise.then((movie) => {
        if (!movie)
            next({ message: 'The movie was not found.', code: 99 });

        res.json({ status: 1 });
    }).catch((err) => {
        res.json(err);
    });
});



module.exports = router;
