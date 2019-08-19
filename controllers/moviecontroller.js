const router = require('express').Router();
const Movie = require('../db').import('../models/movie');
const validateSession = require('../middleware/validate-session');

router.post('/', validateSession, (req, res) => {
    Movie.create({
        movieTitle: req.body.movie.movieTitle,
        released: req.body.movie.released,
        rated: req.body.movie.rated,
        runtime: req.body.movie.runtime,
        genre: req.body.movie.genre,
        director: req.body.movie.director,
        actors: req.body.movie.actors,
        poster: req.body.movie.poster,
        imdbId: req.body.movie.imdbId,
        plot: req.body.movie.plot
    })
        .then(movie => res.status(200).json(movie))
        .catch(err => res.status(500).json(req.errors))
})

router.get('/getall', validateSession, (req, res) => {
    Movie.findAll()
        .then(movie => res.status(200).json(movie))
        .catch(err => res.status(500).json({ error: err }))
})

router.get('/getmovie/:movietitle', (req, res) => {
    Movie.findAll({ where: { movieTitle: req.params.movietitle } })
        .then(movie => res.status(200).json(movie))
        .catch(err => res.status(500).json({ error: err }))
})

router.put('/update/:id', validateSession, (req, res) => {
    const admin = req.user.admin;

    if (admin == true) {
        Movie.update(req.body.movie, { where: { id: req.params.id } })
            .then(movie => res.status(200).json(movie))
            .catch(err => res.status(500).json({ error: err }))
    }
    else {
        res.status(403).send({ error: 'You Are Not Authorized To Update Movies' })
    }
})

router.delete('/delete/:id', validateSession, (req, res) => {
    const admin = req.user.admin;

    if (admin == true) {
        Movie.destroy({ where: { id: req.params.id } })
            .then(movie => res.status(200).json(movie))
            .catch(err => res.status(500).json({ error: err }))
    }
    else {
        res.status(403).send({ error: 'You Are Not Authorized To Delete Movies' })
    }
})



module.exports = router;