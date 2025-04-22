const {db} = require("../db.js");
const multer = require("multer");




exports.uploadPostImage = (req,res) =>{
    console.log(req.file);
    const file = req.file;
    res.status(200).json({message : file?.filename});
}