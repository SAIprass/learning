const authModel = require('../models/authmodel');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');//The bcrypt npm package is a JavaScript implementation of the bcrypt password hashing function that allows you to easily create a hash out of a password string .
const salt = bcrypt.genSaltSync(10);
//salt npm = A salt is a random piece of data that is used as an additional input to a one-way function that hashes data or a password. 
const nodemailer = require('../nodemailer/mailer')
const getOtp = require('../nodemailer/otp')
module.exports = {
    register:async(req,res,next) => {
        const checkemail = await authModel.findOne({email:req.body.email});//checking if the email exists or not
        if(checkemail){//if exists it should display the below message
            return res.status(400).send({status:false,message:"email already exists"});
        }
        const newregister = new authModel({
            username:req.body.username,
            email:req.body.email,
            password:bcrypt.hashSync(req.body.password,salt)
        })
        const registerdata = await newregister.save();
        if(!registerdata){
             return res.status(400).json({status:false,message:"failed to register"});
        }
            return res.status(200).json({status:true,message:"user registered successfully",registerdata});

    },

    
    signin:async(req,res,next) => {
        const checkdetails = await authModel.findOne({email:req.body.email});
        if(!checkdetails){
            console.log("data",checkdetails)
            return res.status(400).json({status:false,message:"invalid crendentials! please check your email"});
             };
        console.log("checkdetails:",checkdetails)
        const checkpassword = bcrypt.compareSync(req.body.password,checkdetails.password)
        console.log("checkdetails.password",checkdetails.password)
        if(!checkpassword){
            console.log("passworddetails:",checkpassword)
            return res.status(400).json({status:false,message:"invalid password"});
            }
        const token = jwt.sign({id:checkdetails.id},process.env.JWT_SECRET);
            return res.status(200).send({username:checkdetails.username,token:token});
        
        }, 
        
    sendotp:async(req,res,next) =>{
        const sendotp = await authModel.findOne({email:req.query.email});
        console.log("sendotp",sendotp)
        var n = 0
        if(sendotp){
            let otp = await getOtp.mailotp();
            let updateValue = await authModel.updateOne({email:req.query.email},{$set:{otp}})
            console.log("updateValue", updateValue)
            await nodemailer.mailer(otp)
            console.log("otp:",otp)
            
            return res.status(200).send({status:true, message:"OTP SENT SUCCESSFULLY"})
        }
            return res.status(400).send({status:false,messaage:"Email not found"});
    },
    
    verifyotp:async(req,res,next) =>{
        const  {email, otp}  = req.body;
        const recheckemail = await authModel.findOne({email:email});
        if(!recheckemail){
            return res.status(400).send({status:false,message:"email not found"})
        }
        if(recheckemail.otp == otp){
            return res.status(200).send({status:true,message:"otp verified"});
        }else{
            return res.status(402).send({status:false,message:"Invalid otp"});
        }
    },

    update: async(req,res,next) =>{
            const updatedetails = await authModel.findOneAndUpdate({email:req.query.email},{$set:
                {email:req.body.email , username:req.body.username}});
            if(updatedetails){
                return res.status(200).send({status:"true",message:"updated successful"});
    
            }
                return res.status(400).send({status:false, message:"couldn't update the details"})
        },
    
    updatepassword:async(req,res,next) =>{
            const updatepassword = await authModel.findOneAndUpdate({email:req.query.email},{$set:
                {password:bcrypt.hashSync(req.body.password,salt)} });
                console.log("updatepassword",updatepassword)
            if(updatepassword){
                console.log("####",updatepassword)
                return res.status(200).send({status:"true",message:"password updated successfully"});
            }
                return res.status(400).send({status:false,message:"could not update the password"})
        },
        
    deletebyemail:async(req,res,next) =>{
           const deletecollection = await authModel.deleteOne({email:req.query.email});
        if(deletecollection){
            console.log("*****")
           return res.status(200).send({status:true,message:"email deleted successful"})
        }
           return res.status(400).send({status:false,message:"couldnot delte the requested email"})

    },
    

    signout:async(req,res,next)=>{
        req.session=null;
        return res.status(200).send({status:true,message:"logout successful"})
    }
}