const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const readerSchema = new Schema({
    name: String,
    gender: {
        type: String,
        enum: ['male', 'female']
    },
    dob: {
        type: Date
    },
    avatar: String,
    email: String,
    introduce: String,
    address: String
}, { timestamps: true });

const Readers = mongoose.model('Readers', readerSchema);

exports.create = (readerInfo) => {
    const newReader = Readers(readerInfo);
    return newReader.save();
}

exports.read = (readerId) => {
    return new Promise((resolve, reject) => {
        Readers.findById(readerId, (err, reader) => {
            if(err){
                reject(err);
            } else {
                resolve(reader);
            }
        })
    })
}

exports.update = (readerId, readerData) => {
    return new Promise((resolve, reject) => {
        Readers.findById(readerId, (err, reader) => {
            if(err){
                reject(err);
            } else {
                for(let i in readerData){
                    reader[i] = readerData[i];
                }
                reader.save((err, updatedreader) => {
                    if(err){
                        reject(err);
                    } else {
                        resolve(updatedreader);
                    }
                })
            }
        })
    })
}

exports.delete = (readerId) => {
    return new Promise((resolve, reject) => {
        Readers.remove({_id: readerId}, (err) => {
            if(err){
                reject(err);
            } else {
                resolve('successfully deleted ')
            }
        })
    })
}

exports.list = () => {
    return new Promise((resolve, reject) => {
        Readers.find({}, null, { sort: '-createdAt'}, (err, readers) => {
            if(err){
                reject(err);
            } else {
                resolve(readers);
            }
        })
    })
}