const express = require("express")
const app = express.Router()
const controller = require("../controllers/controller")
const token = require("../configuration/authtoken")

app.post("/insert", controller.insert)
app.get("/get",token.verifyToken,controller.get)
app.get("/getbyid/:id",controller.getbyid)
app.put("/update",controller.update)
app.delete("/deletebyid",controller.delete)

module.exports=app;