const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rackSchema = new Schema({
    number: {
        type: Number
    },
    locationIdentifier: {
        type: String
    }
})

const Rack = mongoose.model('racks', rackSchema);

exports.create = (rackData) => {
    const newRack = new Rack(rackData);
    return newRack.save();
}

exports.read = () => {
    return new Promise((resolve, reject) => {
        Rack.find({}, (err, racks) => {
            if(err){
                reject(err);
            } else {
                resolve(racks);
            }
        })
    })
}

exports.update = (rackId, rackData) => {
    return new Promise((resolve, reject) => {
        Rack.findById(rackId, (err, rack) => {
            if(err){
                reject(err);
            } else {
                for(let i in rackData){
                    rack[i] = rackData[i];
                }
                rack.save((err, updatedRack) => {
                    if(err){
                        reject(err);
                    } else {
                        resolve(updatedRack);
                    }
                })
            }
        })
    })
}

exports.delete = (rackId) => {
    return new Promise((resolve, reject) => {
        Rack.remove({_id: rackId}, (err) => {
            if(err){
                reject(err);
            } else {
                resolve('successfully deleted ')
            }
        })
    })
}