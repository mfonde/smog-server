const express = require('express');
const router = express.Router();
const sequelize = require('../smog-server/db');
const Favorite = sequelize.import('../models/favorite');
const validateSession = require('../smog-server/middleware/validate-session');

// router.post('/', validateSession, (req, res) => {
//     Favorite.create({
//         movieTitle: req.body.movieTitle,
//         poster: req.body.poster,
//         userId: req.user.id,
//         username: req.user.username,
//         imdbId: req.body.imdbId
//     }).then(favorite => res.status(200).json(favorite))
//     .catch(err => res.status(500).json(req.errors))
// })

router.post('/', (req, res) => {
    Favorite.create({
        movieTitle: req.body.movieTitle,
        poster: req.body.poster,
        imdbId: req.body.imdbId,
        ranking: req.body.ranking
    }).then(favorite => res.status(200).json(favorite))
        .catch(err => res.status(500).json(req.errors))
})

// router.get('/myfavorites', validateSession, (req, res) => {
//     Favorite.findAll({where: {userId: req.user.id}, order:[
//         ['ranking']
//     ]})
//     .then(favorite => res.status(200).json(favorite))
//     .catch(err => res.status(500).json({error: err}))
// })

router.get('/myfavorites', (req, res) => {
    Favorite.findAll({
        order: [
            ['ranking']
        ]
    })
        .then(favorite => res.status(200).json(favorite))
        .catch(err => res.status(500).json({ error: err }))
})

router.get('/username/:username', validateSession, (req, res) => {
    Favorite.findAll({ where: { username: req.params.username } })
        .then(favorite => res.status(200).json(favorite))
        .catch(err => res.status(500).json({ error: err }))
})

router.put('/update/:id', validateSession, (req, res) => {
    const favorite = req.params.id;
    const admin = req.user.admin;

    if (admin == true) {
        Favorite.update(req.body.ranking, { where: { id: favorite } })
            .then(rev => res.status(200).json(rev))
            .catch(err => res.json({ error: err }))

    } else {
        Favorite.update(req.body.ranking, { where: { id: req.params.id, userId: req.user.id } })
            .then(rev => res.status(200).json(rev))
            .catch(err => res.json({ error: err }))

    }
})

router.delete('/delete/:id', validateSession, (req, res) => {
    const favorite = req.params.id;
    const admin = req.user.admin;

    if (admin == true) {
        Favorite.destroy({ where: { id: favorite } })
            .then(fav => res.status(200).send(`${fav} Deleted`))
            .catch(err => res.status(500).json({ error: err }))
    } else {
        Favorite.destroy({ where: { id: favorite, userId: req.user.id } })
            .then(fav => res.status(200).send(`${fav} Deleted`))
            .catch(err => res.status(500).json({ error: err }))
    }
})

module.exports = router;