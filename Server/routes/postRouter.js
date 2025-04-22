const express = require("express");

const postController = require("../controllers/post");

const router = express.Router();



router.get("/",postController.getAllPosts);
router.post("/",postController.addPost);
router.get("/:id",postController.getPost);
router.put("/:id",postController.updatePost);
router.delete("/:id",postController.deletePost);



module.exports = router;




