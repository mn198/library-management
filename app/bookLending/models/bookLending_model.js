const BookModel = require('../../books/models/book_model');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookLendingSchema = new Schema({
    dueDate: {
        type: Date
    },
    returnDate: {
        type: Date
    },
    userId: {
        type: Schema.Types.ObjectId
    },
    book: {
        type: Schema.Types.ObjectId
    },
    isDeleted: {
        type: Schema.Types.Boolean,
        default: false
    }
}, { timestamps: true})

const BookLending = mongoose.model('bookLending', bookLendingSchema);

exports.create = (data) => {
    const newBL = BookLending(data);
    BookModel.changeStatus(data.book, 'Loaned');
    return newBL.save();
}

exports.list = () => {
    return new Promise((resolve, reject) => {
       BookLending.aggregate([
           {$match: {
               isDeleted: false
           }},
        { $lookup: {
         from: 'readers',
         localField: 'userId',
         foreignField: '_id',
         as: 'reader'
        }}, {
            $lookup: {
                from: 'books',
                localField: 'book',
                foreignField: '_id',
                as: 'book'
            }
        }, {
            $sort: {
                createdAt: -1
            }
        }
    ], function(err, result) {
        if(err){
            reject(err)
        } else {
            resolve(result);
        }
    })
    })
}


exports.isDeletedList = () => {
    return new Promise((resolve, reject) => {
       BookLending.aggregate([
           { $match: {
               isDeleted: true
           }},
        { $lookup: {
         from: 'readers',
         localField: 'userId',
         foreignField: '_id',
         as: 'reader'
        }}, {
            $lookup: {
                from: 'books',
                localField: 'book',
                foreignField: '_id',
                as: 'book'
            }
        }, {
            $sort: {
                createdAt: -1
            }
        }
    ], function(err, result) {
        if(err){
            reject(err)
        } else {
            resolve(result);
        }
    })
    })
}

exports.update = (bookLendingId, bookLendingData) => {
    return new Promise((resolve, reject) => {
        BookLending.findById(bookLendingId, (err, thisBookLending) =>{
            if(err){
                reject(err);
            } else {
                for(let i in bookLendingData){
                    thisBookLending[i] = bookLendingData[i];
                }
                thisBookLending.save((err, updatedBookLending) => {
                    if(err){
                        reject(err);
                    } else {
                        resolve(updatedBookLending);
                    }
                })
            }
        })
    })
}

exports.delete = (bookLendingId) => {
    return new Promise((resolve, reject) => {
        BookLending.remove({_id: bookLendingId}, (err) => {
            if(err){
                reject(err);
            } else {
                resolve('deleted successfully!');
            }
        })
    })
}

exports.returnBook = (lendingId, bookId) => {
    return new Promise((resolve, reject) => {
        BookLending.findById(lendingId, (err, thisLending) => {
            if(err){
                reject(err);
            } else {
                thisLending.isDeleted = true;
                thisLending.returnDate = new Date();
                BookModel.changeStatus(bookId, 'Available');
                thisLending.save((err, updatedLending) => {
                    if(err){
                        reject(err);
                    } else {
                        resolve(updatedLending);
                    }
                })
            }
        })
    })
}