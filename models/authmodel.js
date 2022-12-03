const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const auth = new Schema({

    "username": { type: String },
    "email":{type:String},
    "password": { type: String },
})
module.exports = mongoose.model('auth',auth)