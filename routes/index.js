const express = require("express");
const app = express();
const route = require("./route");
const authroute = require('../routes/auth.route');
app.use("/login",authroute)
app.use("/route",route)
module.exports = app 