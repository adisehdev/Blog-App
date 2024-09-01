const model = require("../models/userModel");
const User = model.User;
const bcrypt = require("bcrypt");
const path = require("path");
const jwt = require("jsonwebtoken");
const fs = require("fs");
require("dotenv").config();
const privateKey = process.env.PRIVATE_KEY;

const publicKey = process.env.PUBLIC_KEY;

exports.registerUSer = async (req, res) => {
  //api to register new user
  try {
    let { username, password } = req.body;
    password = bcrypt.hashSync(password, 10);
    const newUser = new User({ username, password });
    const registeredUser = await newUser.save();
    res.status(201).json(registeredUser);
  } catch (error) {
    res
      .status(400)
      .json({ error: "could not register user : " + error.message });
  }
};

exports.loginUser = async (req, res) => {
  //api to login user
  try {
    let { username, password } = req.body;
    const user = await User.findOne({ username });
    const passOk = bcrypt.compareSync(password, user.password);

    if (passOk) {
      //password match->generate token
      const payload = { username, id: user._id };
      const secret = privateKey;
      const callback = (err, token) => {
        if (err) {
          res.status(400).json({ error: "could not login user : , " + err });
          throw err;
        }
        res
          .cookie("token", token, {
            httpOnly: true,
            secure: true, // set to true if using HTTPS
            sameSite: "None",
          })
          .json(payload); //putting token inside cookie
      };
      jwt.sign(payload, secret, { algorithm: "RS256" }, callback);
    } else {
      res.status(400).json({ error: "invalid credentials" });
    }
  } catch (error) {
    res.status(400).json({ error: "could not login user : ," + error.message });
  }
};

exports.getProfile = async (req, res) => {
  //api to get profile of user
  //cookie se profile nikalega
  try {
    const { token } = req.cookies; //token created

    jwt.verify(token, publicKey, { algorithms: "RS256" }, (err, info) => {
      //extract payload from token
      if (err) {
        console.log("error in getting profile : ", err);

        throw err;
      }
      res.status(200).json(info); //info me payload pada he
    });
  } catch (error) {
    console.log("could not load profile ", error);
    res.status(400).json({ error: "could not get profile : " + error.message });
  }
};

exports.logoutUser = async (req, res) => {
  //api to logout user
  try {
    res.cookie("token", "").json({ cookies: res.cookies }).status(200); //resetting cookie
  } catch (error) {
    res.status(400).json({ error: "could not logout user : " + error.message });
  }
};
