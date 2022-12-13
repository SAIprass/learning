const mongoose = require('mongoose')
var autoIncrement = require("mongoose-sequence")(mongoose);
const Schema =mongoose.Schema;
const image = new Schema({
    Image_no: {type:Number},
    Image:{type:String}
})
image.plugin(autoIncrement, {inc_field: 'Image_no'});
module.exports = mongoose.model("image",image)