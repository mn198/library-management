const BookModel = require('../models/book_model');
const { uploader } = require('cloudinary');
const path = require('path');

// converts image buffer to cloudinary format
const Datauri = require('datauri');
const dUri = new Datauri();
const dataUri = req => dUri.format(path.extname(req.file.originalname).toString(), req.file.buffer);

exports.create = (req, res) => {

    if(req.file) {
        const file = dataUri(req).content;
        return uploader.upload(file).then( async (result) => {
          const image = await result.url;
          req.body.image = await image;

          await BookModel.create(req.body);

          return await res.status(200).json({
            messge: 'Your image has been uploded successfully to cloudinary',
            
          })
        }).catch((err) => {
            res.status(400).json({
          messge: 'someting went wrong while processing your request',
          data: {
            err
          }
        })})
        
       } else {
        BookModel.create(req.body)
            .then((result) => {
                res.status(201).send(result);
            })
            .catch((err) => {
                res.status(400).send(err);
            })
       }
}

exports.update = (req, res) => {
    
    if(req.file) {
        const file = dataUri(req).content;
        return uploader.upload(file).then( async (result) => {
          const image = await result.url;
          req.body.image = await image;

          await BookModel.update(req.params.bookId, req.body);

          return await res.status(200).json({
            messge: 'Your image has been uploded successfully to cloudinary',
            
          })
        }).catch((err) => {
            res.status(400).json({
          messge: 'someting went wrong while processing your request',
          data: {
            err
          }
        })})
        
       } else {
        BookModel.update(req.params.bookId, req.body)
            .then((result) => {
                res.status(201).send(result);
            })
            .catch((err) => {
                res.status(400).send(err)
            })
       }

}

exports.list = (req, res) => {
    BookModel.list()
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((err) => {
            res.status(400).send(err);
        })
}

exports.delete = (req, res) => {
    BookModel.delete(req.params.bookId)
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((err) => {
            res.status(400).send(err);
        })
}

exports.read = (req, res) => {
    BookModel.read(req.params.bookId)
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).send(err);
        })
}

exports.changeBookStatus = (req, res) => {
    BookModel.changeStatus(req.params.bookId, req.params.status)
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((err) => {
            res.status(400).send(err);
        })
}