const mongoose = require('mongoose');
const chalk = require('chalk')
//The main purpose of module.exports is to achieve modular programming.
// Modular programming refers to separating the functionality of a program into independent, interchangeable modules, such that each contains everything necessary to execute only one aspect of the desired functionality.
 exports.connect = ()=>{
     mongoose.connect("mongodb://localhost:27017/learning",{
        useNewUrlParser: true,// allow users to fall back to the old parser if they find a bug in the new parser.
        useUnifiedTopology: true})//Set to true to opt in to using the MongoDB driver's new connection management engine.
//mongoose.connect = connects your MongoDB clusters or collections with your Node.js app.
// It enables you to create schemas for your documents.
// Mongoose provides a lot of functionality when creating and working with schemas.
//mongoose.connect("mongodb connection server link",{OPTIONS:refer=="https://arunrajeevan.medium.com/understanding-mongoose-connection-options-2b6e73d96de1"})
console.log(chalk.green("CONNECTED TO DB"));
}

