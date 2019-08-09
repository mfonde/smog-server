const express = require('express');
const router = express.Router();
const sequelize = require('../db');
const Favorite = sequelize.import('../models/favorite');
const validateSession = require('../middleware/validate-session');

router.post('/', validateSession, (req, res) => {
    Favorite.create({
        movieTitle: req.body.favorite.movieTitle,
        poster: req.body.favorite.poster,
        userId: req.user.id,
        username: req.user.username,
        imdbId: req.body.favorite.imdbId
    }).then(favorite => res.status(200).json(favorite))
    .catch(err => res.status(500).json(req.errors))
})

router.get('/myfavorites', validateSession, (req, res) => {
    Favorite.findAll({where: {userId: req.user.id}})
    .then(favorite => res.status(200).json(favorite))
    .catch(err => res.status(500).json({error: err}))
})

router.get('/username/:username', validateSession, (req, res) => {
    Favorite.findAll({where: {username: req.params.username}})
    .then(favorite => res.status(200).json(favorite))
    .catch(err => res.status(500).json({error: err}))
})

router.delete('/delete/:id', validateSession, (req, res) => {
    const favorite = req.params.id;
    const admin = req.user.admin;

    if(admin == true){
        Favorite.destroy({where: {id: favorite}})
        .then(fav => res.status(200).send(`${fav} Deleted`))
        .catch(err => res.status(500).json({error: err}))
    } else {
    Favorite.destroy({where: {id: favorite, userId: req.user.id}})
    .then(fav => res.status(200).send(`${fav} Deleted`))
    .catch(err => res.status(500).json({error: err}))
    }
})

module.exports = router;