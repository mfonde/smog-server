const Sequelize = require('sequelize');
const express = require('express');
const router = express.Router();
const sequelize = require('../db');
const Review = sequelize.import('../models/review');
const validateSession = require('../middleware/validate-session');
const Op = Sequelize.Op;
const fn = Sequelize.QueryTypes;

router.post('/', validateSession, (req, res) => {
    Review.create({
        movieTitle: req.body.movieTitle,
        poster: req.body.poster,
        userId: req.user.id,
        username: req.user.username,
        reviewRating: req.body.reviewRating,
        reviewText: req.body.reviewText,
        imdbId: req.body.imdbId
    })
        .then(review => res.status(200).json(review))
        .catch(err => res.status(500).json(req.errors))
})

router.get('/getall', (req, res) => {
    Review.findAll({
        order: [
            ['id', 'DESC']
        ]
    })
        .then(review => res.status(200).json(review))
        .catch(err => res.status(500).json({ error: err }))
})

router.get('/username/:username', validateSession, (req, res) => {
    Review.findAll({
        where: { username: req.params.username }, order: [
            ['id', 'DESC']
        ]
    })
        .then(review => res.status(200).json(review))
        .catch(err => res.status(500).json({ error: err }))
})

router.get('/imdbid/:imdbId', (req, res) => {
    Review.findAll({
        where: { imdbId: req.params.imdbId }, order: [
            ['id', 'DESC']
        ]
    })
        .then(review => res.status(200).json(review))
        .catch(err => res.status(500).json({ error: err }))
})

router.get('/reviewid/:id', (req, res) => {
    Review.findAll({ where: { id: req.params.id } })
        .then(review => res.status(200).json(review))
        .catch(err => res.json({ error: err }))
})

//SYNTAX FOR MORE COMPLEX QUERIES. Also need to import a NEW version of Sequelize (not just smaller local version from './db'), and set a variable to Sqeuelize.Op. Full list of querying options at https://sequelize.org/master/manual/querying.html
// router.get('/reviewid', (req, res) => {
//     Review.findAll({where: {[Op.or]: 
//         [
//         {id: {[Op.eq]: 2}}, 
//         {id: {[Op.eq]: 4}}
//         ]
//     }})
//     .then(review => res.status(200).json(review))
//     .catch(err => res.json({error: err}))
// })

router.put('/update/:id', validateSession, (req, res) => {
    const review = req.params.id;
    const admin = req.user.admin;
    const reviewText = req.body.reviewText;
    const reviewRating = req.body.reviewRating;

    if (admin == true) {
        Review.update({

            reviewText: req.body.reviewText,
            reviewRating: req.body.reviewRating
        },
            { where: { id: review } })

            .then(rev => res.status(200).json(rev))
            .catch(err => res.json({ error: err }))

    } else {
        Review.update({
            reviewText: req.body.reviewText,
            reviewRating: req.body.reviewRating
        },

            { where: { id: req.params.id, userId: req.user.id } })
            .then(rev => res.status(200).json({
                reviewText: reviewText,
                reviewRating: reviewRating
            }))

            .catch(err => res.json({ error: err }))

    }
})

router.delete('/delete/:id', validateSession, (req, res) => {
    const review = req.params.id;
    const admin = req.user.admin;

    if (admin == true) {
        Review.destroy({ where: { id: review } })
            .then(rev => res.status(200).send(`${rev} Deleted`))
            .catch(err => res.status(500).json({ error: err }))
    } else {
        Review.destroy({ where: { id: review, userId: req.user.id } })
            .then(rev => res.status(200).send(`${rev} Deleted`))
            .catch(err => res.status(500).json({ error: err }))
    }
})

module.exports = router;