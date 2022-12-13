const imageModel = require('../models/imagemodel');

module.exports = {
    postimage:async (req,res,next) => {
    let newfile = new imageModel({
        Image:`${req.file.path}`
    })
    const files = await newfile.save()
        console.log("files-----",files);
    if (!files|| files.length===0){
      return res.status(400).send({status:false,message:"unable to upload an image"})
    }
      return res.status(200).send({status:true,message:"image uploaded successfully"})
    },
    getimage:async (req,res,next) => {
        const imagedata = await imageModel.find();
        if(!imagedata) {
            return res.status(400).send({status:false,message:"unable to retrieve the image"})
        }
            return res.status(200).send({status:true,message:"file retrieved successfully",imagedata});
        }
    }