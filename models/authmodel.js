const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const auth = new Schema({

    "username": { type: String , required:true},
    "email":{type:String,required:true},
    "password": { type: String ,required:true},
    "token":{type: String,required:true }
})
module.exports = mongoose.model('auth',auth)