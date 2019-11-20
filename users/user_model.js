const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String },
    email: { type: String, unique: true},
    password: { type: String },
    permissionLevel: { type: Number }
})

const User = mongoose.model('Users', userSchema);

exports.createUser = (userData) => {
    const newUser = User(userData);
    return newUser.save();
}

exports.updateUser = (userId, userData) => {
    return new Promise((resolve, reject) => {
        User.findById(userId, (err, usr) => {
            if(err){
                reject(err);
            } else {
                for(let i in userData){
                    usr[i] = userData[i];
                }
                usr.save((err, updatedUser) => {
                    if(err){
                        reject(err);
                    } else {
                        resolve(updatedUser);
                    }
                })
            }
        })
    })
}

exports.readUser = (userId) => {
    return new Promise((resolve, reject) => {
        User.findById(userId)
            .then((usr) => {
                resolve(usr);
            })
            .catch((err) => {
                reject(err);
            })
    })
}

exports.deleteUser = (userId) => {
    return new Promise((resolve, reject) => {
        User.remove({_id: userId}, (err) => {
            if(err){
                reject(err);
            } else {
                resolve(err);
            }
        })
    })
}

exports.findByEmail = (email) => {
    return new Promise((resolve, reject) => {
        User.find({ email }, (err, usr) => {
            if(err){
                reject(err);
            } else {
                resolve(usr);
            }
        })
    })
} 

exports.list = () => {
    return new Promise((resolve, reject) => {
        User.find({}, (err, usrs) => {
            if(err){
                reject(err);
            } else {
                resolve(usrs);
            }
        })
    })
}