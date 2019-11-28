const BookLendingModel = require('../models/bookLending_model');

exports.create = (req, res) => {
    BookLendingModel.create(req.body)
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((err) => {
            res.status(400).send(err);
        })
} 

exports.list = (req, res) => {
    BookLendingModel.list()
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((err) => {
            res.status(400).send(err);
        })
}

exports.isDeletedList = (req, res) => {
    BookLendingModel.isDeletedList()
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((err) => {
            res.status(400).send(err);
        })
}

exports.update = (req, res) => {
    BookLendingModel.update(req.params.lendingId, req.body)
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((err) => {
            res.status(400).send(err);
        })
}

exports.delete = (req, res) => {
    BookLendingModel.delete(req.params.lendingId)
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((err) => {
            res.status(400).send(err);
        })
}

exports.returnBook = (req, res) => {
    BookLendingModel.returnBook(req.params.lendingId, req.params.bookId)
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((err) => {
            res.status(400).send(err);
        })
}