const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId
    },
    content: {
        type: String
    },
    isRead: {
        type: Boolean,
        default: false
    }

}, {timestamp: true});

const Notification = mongoose.model('notifications', notificationSchema);

exports.create = (data) => {
    const newNot = Notification(data);
    return newNot.save();
}

exports.read = (userId) => {
    return new Promise((resolve, reject) => {
        Notification.find({ userId: userId}, (err, nots) => {
            if(err){
                reject(err);
            } else {
                resolve(nots);
            }
        })
    })
}

exports.delete = (notificationId) => {
    return new Promise((resolve, reject) => {
        Notification.remove({_id: notificationId}, (err) => {
            if(err){
                reject(err);
            } else {
                resolve('deleted successfully!');
            }
        })
    })
}

exports.markAsRead = (notificationId) => {
    return new Promise((resolve, reject) => {
        Notification.find({_id: notificationId}, (err, not) => {
            if(err){
                reject(err);
            } else {
                not.isRead = true;
                not.save((err, updatedNot) => {
                    if(err){
                        reject(err);
                    } else {
                        resolve('Marked as read');
                    }
                })
            }
        })
    })
}