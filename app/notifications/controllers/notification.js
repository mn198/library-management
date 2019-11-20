const NotificationModel = require('../models/notification');

exports.create = (req, res) => {

    // validate data

    NotificationModel.create(req.body)
        .then((result) => {
            res.status(201).send(result);
        })
        .catch((err) => {
            res.status(202).send(err);
        })
}

exports.read = (req, res) => {
    NotificationModel.read(req.params.userId)
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((err) => {
            res.status(202).send(err);
        })
}

exports.delete = (req, res) => {
    NotificationModel.delete(req.params.notificationId)
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((err) => {
            res.status(202).send(err);
        })
}

exports.markAsRead = (req, res) => {
    NotificationModel.markAsRead(req.params.notificationId)
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((err) => {
            res.status(202).send(err);
        })
}