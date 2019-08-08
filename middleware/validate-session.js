const jwt = require('jsonwebtoken');
const User = require('../db').import('../models/user');

const validateSession = (req, res, next) => {
    if(req.method == 'OPTIONS'){
        next()
    }else {
        const token = req.headers.authorization
        console.log(token)
        if(!token) return res.status(403).send({auth: false, message: 'No token provided'});
        else {
            jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
                if(!err && decodedToken){
                    User.findOne({where: {id: decodedToken.id}})
                    .then(user => {
                        if(!user) throw 'err'
                        req.user = user
                        return next()
                    })
                    .catch(err => next(err))
                } else {
                    req.errors = err
                    return res.status(500).send('Not Authorized');
                }
            })
        }
    }
}

module.exports = validateSession;