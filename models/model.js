const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const learning = new Schema({

    
    "Name": { type: String },
    "City": { type: String },
    "Age":{type:Number}


})
module.exports = mongoose.model('learning',learning)