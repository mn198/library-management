const BookReservationModel = require('../models/bookReservation');

exports.create = (req, res) => {
    
    // Validate data from client !
    
    BookReservationModel.create(req.body)
        .then((result) => {
            res.status(201).send(result);
        })
        .catch((err) => {
            res.status(202).send(err);
        })
}

exports.read = (req, res) => {

    BookReservationModel.read()
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((err) => {
            res.status(202).send(err);
        })
}

exports.update = (req, res) => {

    // Validate data from client !
    
    BookReservationModel.update(req.params.bookReservationId, req.body)
        .then((result) => {
            res.status(201).send(result);
        })
        .catch((err) => {
            res.status(202).send(err);
        })
}

exports.delete = (req, res) => {
    BookReservationModel.delete(req.params.bookReservationId)
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((err) => {
            res.status(202).send(err);
        })
}
