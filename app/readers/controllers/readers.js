const ReaderModel = require('../models/readers');
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
          req.body.avatar = await image;

          await ReaderModel.create(req.body);

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
           ReaderModel.create(req.body)
            .then((result) => {
                res.status(200).send(result);
            })
            .catch((err) => {
                res.status(400).send(err);
            })
       }


    
}

exports.list = (req, res) => {
    ReaderModel.list()
        .then((result) => {
            res.status(201).send(result);
        })
        .catch((err) => {
            res.status(200).send(err);
        })
}

exports.update = (req, res) => {
    const data = req.body;
    
    if(req.file) {
        const file = dataUri(req).content;
        return uploader.upload(file).then( async (result) => {
          const image = await result.url;
          req.body.avatar = await image;

          await ReaderModel.update(req.params.readerId, req.body);

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
            ReaderModel.update(req.params.readerId, data)
            .then((result) => {
                res.status(201).send(result);
            })
            .catch((err) => {
                res.status(400).send(err);
            })
       }
    
    
}

exports.delete = (req, res) => {
    ReaderModel.delete(req.params.readerId)
        .then((result) => {
            res.status(201).send(result);
        })
        .catch((err) => {
            res.status(200).send(err);
        })
}

exports.read = (req, res) => {
    ReaderModel.read(req.params.readerId)
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((err) => {
            res.status(400).send(err);
        })
}