const express = require('express');
const router = express.Router();
const imagecontroller = require('../controllers/imagecontroller');
const imageModel = require('../models/imagemodel');
const multer = require('multer');
const path = require('path');
const fileStorage = multer.diskStorage({
    // Destination to store image     
    destination: 'upload', 
      filename: (req, file, cb) => {
        console.log(file)
          cb(null, file.originalname)
    }
  });
      const uploads = multer({
      storage: fileStorage,
      limits: {
      fileSize: 1000000 // 1000000 Bytes = 1 MB
    }
})
router.post("/uploadfile",uploads.single('path'),imagecontroller.postimage),
router.get("/getall",imagecontroller.getimage);
module.exports = router;