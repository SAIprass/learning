const authModel = require('../models/authmodel');
const bcrypt = require('bcryptjs');
//const salt = bcrypt.genSaltSync(10)

module.exports = {
    register:async(req,res,next) => {
        const checkemail = await authModel.findOne({email:req.body.email});
        if(checkemail){
            return res.status(400).send({status:false,message:"email already exists"});
        }
        const newregister = new authModel({
            username:req.body.username,
            email:req.body.email,
            password:bcrypt.hashSync(req.body.password)
        })
        const registerdata = await newregister.save();
        if(!registerdata){
            return res.status(400).json({status:false,message:"failed to register"});
        }
            return res.status(200).json({status:true,message:"user registered successfully",registerdata});
    }
}