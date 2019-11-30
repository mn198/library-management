const  UserModel = require('./user_model');
const crypto = require('crypto');

exports.create = (req, res) => {
    let salt = crypto.randomBytes(16).toString('base64');
    let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest('base64');
    req.body.password = salt + '$' + hash;

    let userData = req.body;
    // !!! validate user data

    UserModel.createUser(userData)
        .then((result) => {
            res.status(201).send({ id: result._id });
        })
        .catch((err) => {
            res.status(201).send({error: err})
        })
    
}

exports.read = (req, res) => {
    let userId = req.params.userId;
    UserModel.readUser(userId)
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((err) => {
            res.status(200).send({ error: err});
        })
}


exports.update = (req, res) => {
    if(req.body.password){
        let salt = crypto.randomBytes(16).toString('base64');
        let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest('base64');
        req.body.password = salt + '$' + hash;   
    }

    // !!! validate user data

    UserModel.updateUser(req.params.userId, req.body)
        .then((result) => {
            res.status(204).send(result);
        })
}

exports.delete = (req, res) => {
    UserModel.deleteUser(req.params.userId)
        .then((result) => {
            res.status(204).send(result);
        })
}

exports.list = (req, res) => {
    UserModel.list()
        .then((result) => {
            res.status(200).send(result);
        })
}