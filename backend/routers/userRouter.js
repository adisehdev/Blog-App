const express = require("express");
const router = express.Router();
const controller = require('../controllers/userController')


router
    .post("/register",controller.registerUSer)
    .post("/login",controller.loginUser)
    .get("/getProfile",controller.getProfile)
    .post("/logout",controller.logoutUser)




exports.router = router