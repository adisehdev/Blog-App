const express = require("express");
const multer = require('multer')
const upload = multer({dest : "uploads/"})
const router = express.Router();
const controller = require('../controllers/postController')


router
    .get("/:id",controller.getPost)
    .delete("/:id",controller.deletePost)
    .patch("/:id",upload.single('file'),controller.editPost)
    .post("/",upload.single('file'),controller.createPost)
    .get("/",controller.getAllPosts)



exports.router = router