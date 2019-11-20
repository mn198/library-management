const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReservationStatus = ['Waiting', 'Pending', 'Completed', 'Canceled', 'None'];

const bookReservationSchema = new Schema({
    bookId: {
        type: Schema.Types.ObjectId
    },
    userId: {
        type: Schema.Types.ObjectId
    },
    status: {
        type: String,
        enum: ReservationStatus
    }
})

const BookReservation = mongoose.model('bookReservations', bookReservationSchema);

exports.create = (data) => {
    const new_br = BookReservation(data);
    return new_br.save();
}

exports.read = () => {
    return new Promise((resolve, reject) => {
        BookReservation.find({}, (err, brs) => {
            if(err){
                reject(err);
            } else {
                resolve(brs);
            }
        })
    })
}

exports.update = (brId, brData) => {
    return new Promise((resolve, reject) => {
        BookReservation.findById(brId, (err, br) => {
            if(err){
                reject(err);
            } else {
                for(let i in brData){
                    br[i] = brData[i];
                }
                br.save((err, updatedBr) => {
                    if(err){
                        reject(err);
                    } else {
                        resolve(updatedBr);
                    }
                })
            }
        })
    })
}

exports.delete = (brId) => {
    return new Promise((resolve, reject) => {
        BookReservation.remove({_id: brId}, (err) => {
            if(err){
                reject(err);
            } else {
                resolve('deleted successfully!');
            }
        })
    })
}