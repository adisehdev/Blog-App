const model = require("../models/postModel");
const fs = require("fs");
require('dotenv').config()
const { v2: cloudinary } = require("cloudinary");
const jwt = require("jsonwebtoken");
const path = require("path");
const multer = require("multer");
const publicKey = process.env.PUBLIC_KEY;
const Post = model.Post;

exports.createPost = async (req, res) => {
  try {
    let newPath = "uploads/defaultBlog.png";
    let defaultUploaded = true;

    if (req.file) {
      let { originalname, path } = req.file;
      const parts = originalname.split(".");
      const ext = parts[1];
      newPath = path + "." + ext;
      fs.renameSync(path, newPath);
      defaultUploaded = false;
    }

    //cloudinary configuration
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    let cover = "";

    const uploadResult = await cloudinary.uploader
      .upload(newPath)
      .catch((error) => {
        console.log(error);
      });

    if (uploadResult) {
      cover = uploadResult.secure_url;
      if (!defaultUploaded) {
        fs.unlink(newPath, (err) => {
          if (err) throw err;
          console.log("file deleted from local storage");
        });
      }
    }

    console.log(req.headers.cookie)

    const token = req.headers.cookie.split("=")[1];
    const { title, summary, content } = req.body;

    jwt.verify(token, publicKey, { algorithms: "RS256" }, async (err, info) => {
      if (err) throw err;

      const newPost = new Post({
        title,
        summary,
        content,
        cover: cover,
        author: info.id,
      });
      const addedPost = await newPost.save();

      res.status(200).json(addedPost);
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", ["username"])
      .sort({ updatedAt: -1 })
      .limit(20);
    res.status(200).json(posts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getPost = async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id }).populate("author", [
      "username",
    ]);
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.editPost = async (req, res) => {
  try {
    let newPath = null;
    let cover = "";

    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    if (req.file) {
      let { originalname, path } = req.file;
      const parts = originalname.split(".");
      const ext = parts[1];
      newPath = path + "." + ext;
      fs.renameSync(path, newPath);

      const uploadResult = await cloudinary.uploader
        .upload(newPath)
        .catch((error) => {
          console.log(error);
        });

      if (uploadResult) {
        cover = uploadResult.secure_url;

        fs.unlink(newPath, (err) => {
          if (err) throw err;
          console.log("file deleted from local storage");
        });
      }
    }

    const token = req.headers.cookie.split("=")[1];

    jwt.verify(token, publicKey, { algorithms: "RS256" }, async (err, info) => {
      if (err) {
        console.log("error in edit post : ", err);
        throw err;
      }

      const oldPost = await Post.findOne({ _id: req.params.id });

      if (JSON.stringify(info.id) === JSON.stringify(oldPost.author)) {
        const deletedPost = await Post.findOneAndUpdate(
          { _id: req.params.id },
          { ...req.body, cover: newPath ? newPath : oldPost.cover },
          { new: true }
        );
        res.status(200).json(deletedPost);
      } else {
        res
          .status(400)
          .json({ error: "post author not same as logged in user" });
      }
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    const token = req.headers.cookie.split("=")[1];

    console.log(token)

    jwt.verify(token, publicKey, { algorithms: "RS256" }, async (err, info) => {
      if (err) {
        console.log("error in delete post : ", err);
        throw err;
      }

      console.log(info)

      

      const oldPost = await Post.findOne({ _id: id });

      if(JSON.stringify(info.id)===JSON.stringify(oldPost?.author)){
        const deletedPost = await Post.findOneAndDelete({_id : id},{new : true})
        res.status(200).json(deletedPost)
      }
      else{
        res.status(400).json({error : "error in deleting post, login mismatch"})
      }
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
