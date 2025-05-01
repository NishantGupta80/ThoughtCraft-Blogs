const express = require("express");
const multer = require("multer");
 //const m = require("./../../client/src/uploads");

const uploadController = require("../controllers/uploadController");

const router = express.Router();


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      //cb(null, "./uploads")
      cb(null,"./../client/public/uploads");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname);
    }
  })


const upload = multer({storage : storage});

router.post("/postImage",upload.single("file"),uploadController.uploadPostImage);


module.exports = router;