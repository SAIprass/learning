 const bodyParser =require("body-parser");// an npm module used to process data sent in an HTTP request body
 const express = require("express");//Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
 //const mongoose = require("mongoose");//Mongoose is a Object Data Modeling (ODM) library for MongoDB distributed as an npm package.
 const app = express();
 require('dotenv').config()
 const chalk = require("chalk")//The chalk module is a third-party library that can be used for styling of texts(the display of string in terminal can be in colour we choose)
 const cors = require("cors")//CORS-Cross-Origin Resource Sharing.CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
 const mongoose = require ("./configuration/configs")//defining the config.js file path
 mongoose.connect()
 const port = 3030;//defining port value 
 const path = require('path');//The Path module provides a way of working with directories and file paths.
 //app.use ()- The app.use() function is used to mount the specified middleware function (are the functions that have access to the request object and response object, or we can call it a response-request cycle) at the path which is being specified. 
app.use(express.json());//The express.json() function is a built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser.
app.use(bodyParser.urlencoded({extended:true}));//The express.urlencoded() function is a built-in middleware function in Express. It parses incoming requests with urlencoded payloads and is based on body-parser.
app.use("/upload", express.static(path.join(__dirname, 'upload')));//__dirname:Returns the directories of a path//join():Joins the specified paths into one//The express.static() function is a built-in middleware function in Express. It serves static files and is based on serve-static. Syntax:express.static(root, [options])
app.listen(port,() =>{
    console.log (chalk.magenta(`SERVER IS RUNNING ON ${port}`))
}//The app. listen() function is used to bind and listen the connections on the specified host and port.Here port is 3030
)
app.use("/",require("./routes/index"))//calling index file path
