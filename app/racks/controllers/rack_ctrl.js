const RackModel = require('../models/rack_model');

exports.create = (req, res) => {
    RackModel.create(req.body)
        .then((result) => {
            res.status(201).send(result);
        })
        .catch((err) => {
            res.status(200).send(err);
        })
}

exports.read = (req, res) => {
    RackModel.read()
        .then((result) => {
            res.status(201).send(result);
        })
        .catch((err) => {
            res.status(200).send(err);
        })
}

exports.update = (req, res) => {
    const data = req.body;

    RackModel.update(req.params.rackId, data)
        .then((result) => {
            res.status(201).send(result);
        })
        .catch((err) => {
            res.status(200).send(err);
        })
}

exports.delete = (req, res) => {
    RackModel.delete(req.params.rackId)
        .then((result) => {
            res.status(201).send(result);
        })
        .catch((err) => {
            res.status(200).send(err);
        })
}