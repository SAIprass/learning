const express = require('express');
const router = express.Router();
const authcontroller = require('../controllers/auth.controller');
router.post("/register",authcontroller.register);
router.post("/signin",authcontroller.signin);
router.get("/signout",authcontroller.signout)
module.exports = router