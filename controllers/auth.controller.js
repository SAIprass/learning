const authModel = require('../models/authmodel');
const bcrypt = require('bcryptjs');//The bcrypt npm package is a JavaScript implementation of the bcrypt password hashing function that allows you to easily create a hash out of a password string .
const salt = bcrypt.genSaltSync(10)
//salt npm = A salt is a random piece of data that is used as an additional input to a one-way function that hashes data or a password. 
module.exports = {
    register:async(req,res,next) => {
        const checkemail = await authModel.findOne({email:req.body.email});//checking if the email exists or not
        if(checkemail){//if exists it should display the below message
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
    },
    signin:async(req,res,next) => {
        const checkdetails = await authModel.findOne({email:req.body.email},{password:req.body.password});
        if(!checkdetails){
            console.log("data",checkdetails)
            return res.status(400).send({status:false,message:"invalid crendentials! please check your crendtials"});

        }
        else{
            console.log("datain",checkdetails)
            return res.status(200).send({status:true,message:"login successful"})
        }
        

    },
    signout:async(req,res,next)=>{
        req.session=null;
        return res.status(200).send({status:true,message:"logout successful"})
    }
}