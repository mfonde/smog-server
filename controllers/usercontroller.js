const express = require('express');
const router = express.Router();
const sequelize = require('../db');
const User = sequelize.import('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validateSession = require('../middleware/validate-session');

router.post('/create', (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        profilePic: req.body.profilePic,
        admin: req.body.admin
    }).then(function createSuccess(user) {
        let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 });
        res.json({
            user: user,
            message: 'New User Created',
            sessionToken: token
        })
    })
})

router.post('/login', (req, res) => {
    User.findOne({ where: { username: req.body.username } })
        .then(user => {
            if (user) {
                bcrypt.compare(req.body.password, user.password, (err, matches) => {
                    if (matches) {
                        let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 });
                        res.json({
                            user: user,
                            message: 'Logged In',
                            sessionToken: token
                        })
                    } else {
                        res.status(502).send({ error: 'Username or Password is Incorrect' })
                    }
                })
            } else {
                res.status(500).send({ error: 'Username or Password is Incorrect' })
            }
        },
            err => res.status(501).send({ error: 'failed to process' })
        )
})

router.get('/username/:username', validateSession, (req, res) => {
        User.findAll({where: {username: req.params.username}})
        .then(user => res.status(200).json(user))
        .catch(err => res.status(500).json({error: err}))
})

router.delete('/delete/:id', validateSession, function (req, res) {
    const owner = req.params.id; // Id of user (Authorization token)
    const admin = req.user.admin;

    if (admin == true) {
        User.destroy({
            where: { id: owner }
        }).then(
            function deleteUserSuccess(owner) {
                res.send('You have deleted a user');
            }
        )
    } else if (req.user.id == req.params.id) {
        User.destroy({
            where: { id: owner }
        }).then(
            function deleteUserSuccess(owner) {
                res.send('You have deleted yourself');
            },
        )
    } else {
        res.status(403).send({ error: 'You Are Not Authorized To Delete Users' })
    }
    function deleteUserError(err) {
        res.send(500, err.message);
    }
});

router.put('/update/:id', validateSession, (req, res) => {
    const admin = req.user.admin;

    if (admin == true) {
        User.update(req.body.user, { where: { id: req.params.id } })
            .then(user => res.status(200).json(user))
        // .catch(err => res.json({error: err}))
    } else if (req.user.id == req.params.id) {
        User.update({
            username: req.body.user.username,
            email: req.body.user.email,
            password: bcrypt.hashSync(req.body.user.password, 10),
            profilePic: req.body.user.profilePic
        },
            { where: { id: req.params.id } })
            .then(user => res.status(200).json(user))
    }
    else {
        res.status(403).send({ error: 'You Are Not Authorized To Update Users' })

    }
}
)




module.exports = router;