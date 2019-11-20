const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const secret = require('../config/env.config').jwt_secret;

exports.validJWTNeeded = (req, res, next) => {
    if(req.headers['authorization']){
        try {
            let authorization = req.headers['authorization'].split(' ');
            if(authorization[0] !== 'Bearer'){
                return res.status(401).send()
            } else {
                req.jwt = jwt.verify(authorization[1], secret);
                console.log('pass jwtneeded')
                return next();
            }
        } catch(err){
            return res.status(403).send();
        }
    } else {
        return res.status(401).send();
    }
}
