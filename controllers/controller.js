const authmodel = require("../models/authmodel");
const learningModel = require("../models/model");
const nodemailer = require("../nodemailer/mailer");

module.exports = {
    insert : async(req,res,next) => {
        const newdata = new learningModel(req.body);
        console.log("nd:",newdata)
        const data = await newdata.save();
        if(data) {
            return res.status(200).send({status:true,message:"data inserted",data});
        }
            return res.status(404).send({status:false,message:"data not inserted"});
    },

    get : async(req,res,next) => {
        const data = await learningModel.find();
        if(!data) {
            console.log("+++++++",data);
            
            return res.status(404).send({status:false,message:"data not found"});
        }
        else {
            await nodemailer.mailer();
            console.log(nodemailer.mailer())
            const datadetails = await learningModel.aggregate([
                { $lookup:
                     {
                       from:"auths",
                       localField:"Name" ,
                       foreignField:"username",
                       as:"NAME"

                     }
                },{
                    $sort:{Age:1}
                },{
                    $match:{Age:{$nin:[26]}}
                },//,{
                //     $group:{_id:null,totalcount:{$sum:"Age"},count:{$sum:1}}
                // }
                ])
                console.log("match",datadetails)
                if(datadetails){
                     return res.status(200).send({status:true,message:"NAME",datadetails})
                 }
                 console.log("NAME",datadetails)
                 //return res.status(200).send({status:true,message:"data",data});
        };
    
        },

     getbyid:async(req,res,next) =>{
        //const data =await learningModel.find({Name:req.body.Name})
        // const data =await learningModel.find({$or:[{ City : req.params.id},{ Name : req.params.id},
        //     { Age : req.params.id}
        // ]});
        const queryoption = {...req.query} ? req.query:""
        const data =await learningModel.find(queryoption)
        if(data){
            console.log("getbyid:",data)
            return res.status(200).send({status:true,message:"data :",data})
        }
        else {
            console.log("#####")
            return res.status(404).send({status:false,message:"data with this name doesnot exist"})
        }

     },

    update:async(req,res,next)=>{
        const data = await learningModel.findOneAndUpdate({Name:req.query.Name},{$set :{
            City:req.body.City,Age:req.body.Age
           }},{new:true})
        if(data){
            console.log("updatedData",data)  
            return res.status(200).send({status:true,message:"data is updated",data})
          }
         
        else{
            console.log("#####update")
            return res.status(404).send({status:false,message:"data unable to update"})
        }
     
    },

    delete:async(req,res,next)=>{
        const data = await learningModel.deleteOne({Name:req.query.Name})
        return res.status(200).send({status:true,message:"data deleted",data})
    }
}