const express = require("express");
const app = express();
const route = require("./route");
const authroute = require('../routes/auth.route');
const imageroute = require('../routes/imageroute')
app.use("/login",authroute)
app.use("/route",route)
app.use("/upload",imageroute)
module.exports = app 