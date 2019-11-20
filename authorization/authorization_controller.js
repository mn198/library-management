const secret = require('../common/config/env.config').jwt_secret;
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

exports.login = (req, res) => {
    try {
        let refreshId = req.body.userId + secret;
        let salt = crypto.randomBytes(16).toString('base64');
        let hash = crypto.createHmac('sha512', salt).update(refreshId).digest('base64');

        req.body.refresh_key = salt;

        let token = jwt.sign(req.body, secret);
        let b = new Buffer(hash);
        let refresh_token = b.toString('base64');

        res.status(201).send({ accessToken: token, refresh_token: refresh_token });
    } catch(err) {
        console.log(err);
        res.status(500).send({errors: 'invalid email or password'})
    }
}

exports.refresh_token = (req, res) => {
    try {
        req.body = req.jwt;
        let token = jwt.sign(req.body, secret);
        res.status(201).send({ id: token })
    } catch(err) {
        res.status(500).send({ errors: err.toString() })
    }
}