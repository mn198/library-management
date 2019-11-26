const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookFormat = ['Hardcover', 'Paperback', 'Audiobook', 'Ebook', 'Newspaper', 'Magazine', 'Journal'];
const bookStatus = ['Available', 'Reserved', 'Loaned', 'Lost'];

const bookSchema = new Schema({
    isbn: { 
        type: String 
    },
    title: {
        type: String 
    },
    subject: { 
        type: String 
    },
    publisher: { 
        type: String 
    },
    numberOfPages: { 
        type: String 
    },
    author: { 
        type: String 
    },
    barcode: { 
        type: String 
    },
    borrowed: { 
        type: Date
    },
    dueDate: { 
        type: Date 
    },
    format: { 
        type: String,
        enum: bookFormat 
    },
    status: {
        type: String,
        enum: bookStatus
    },
    dateOfPurchased: {
        type: Date
    },
    publicationYear: {
        type: String
    },
    image: {
        type: String
    },
    rack: { type: Schema.Types.ObjectId }
}, { timestamps: true })

const Book = mongoose.model('book', bookSchema);

exports.create = (bookData) => {
    const newBook = Book(bookData);
    return newBook.save();
}

exports.list = () => {
    return new Promise((resolve, reject) => {
        
        Book.find({}, (err, books) => {
            if(err){
                reject(err);
            } else {
                
                resolve(JSON.stringify(books));
            }
        })
        
       /*
       Book.aggregate([
           { $lookup: {
            from: 'racks',
            localField: 'rack',
            foreignField: '_id',
            as: 'rack'
           }}
       ], function(err, result) {
           if(err){
               reject(err)
           } else {
               resolve(result);
           }
       })
       */
    })
}

exports.read = (bookId) => {
    return new Promise((resolve, reject) => {
        Book.aggregate([
            {$match: {
                _id: mongoose.Types.ObjectId(bookId)
            }},
            {$lookup: {
                from: 'racks',
                localField: 'rack',
                foreignField: '_id',
                as: 'rack'
            }},
            { $sort: {
                createdAt: -1
            }}
        ], function(err, result) {
            if(err){
                console.log(err);
                reject(err)
            } else {
                resolve(result);
            }
        })
    })
}

exports.update = (bookId, bookData) => {
    return new Promise((resolve, reject) => {
        Book.findById(bookId, (err, book) => {
            if(err){
                reject(err);
            } else {
                for(let i in bookData){
                    book[i] = bookData[i];
                }
                book.save((err, updatedBook) => {
                    if(err){
                        reject(err);
                    } else {
                        resolve(updatedBook);
                    }
                })
            }
        })
    })
}

exports.delete = (bookId) => {
    return new Promise((resolve, reject) => {
        Book.remove({_id: bookId}, (err) => {
            if(err){
                reject(err);
            } else {
                resolve('deleted successfully!');
            }
        })
    })
}

exports.changeStatus = (bookId, status) => {
    return new Promise((resolve, reject) => {
        Book.findById(bookId, (err, book) => {
            if(err){
                reject(err);
            } else {
                book.status = status;
                book.save((err) => {
                    if(err){
                        reject(err);
                    } else {
                        resolve('changed status successfully!');
                    }
                })
            }
        })
    })
}