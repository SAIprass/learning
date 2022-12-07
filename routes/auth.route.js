const express = require('express');
const router = express.Router();
const authcontroller = require('../controllers/auth.controller');
const token = require('../configuration/authtoken')
router.post("/register",authcontroller.register);
router.post("/signin",authcontroller.signin);
router.put("/update",authcontroller.update);
router.put("/updatepassword",authcontroller.updatepassword);
router.delete("/delete",authcontroller.deletebyemail)
router.get("/signout",token.verifyToken,authcontroller.signout)
module.exports = router