const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/user_model');
const { JWT_TOKEN } = require('./../../keys');


const authController = {

    signup: async function (req, res) {

        try {
            const userData = req.body;
            const email = req.body.email;
            console.log(email);
            const founduser = await UserModel.findOne({ email: email });
            const foundemail = await UserModel.findOne({ email: email });
            if (founduser) {

                return res.status(400).json({ success: false, error: "Username already registered" });

            }
            if(foundemail){
                return res.status(400).json({ success: false, error: "Email already registered" } );
            }
            const password = userData.password;
            const salt = await bcrypt.genSalt(10);
            const hashpassword = await bcrypt.hash(password, salt);
            userData.password = hashpassword;
            const newUser = new UserModel(userData);
            await newUser.save();
            return res.json({ success: true, message: "User Registered Successfully" });
        } catch (err) {
            console.log(err);
            return res.json({ success: false, error: err });
        }
    },


    login: async function (req, res) {
        try {
            const userName = req.body.userName;
            const password = req.body.password;
            const founduser = await UserModel.findOne({ userName: userName });
            
            if (!founduser) {
                console.log(userName);
                res.status(400).json({ success: false, error: "No user found" });
                return;
            }
            const correctPassword = await bcrypt.compare(password, founduser.password);
            if (!correctPassword) {
                res.status(400).json({ success: false, error: "Incorrect password" });
                return;
            }

            const token = jwt.sign({ _id: founduser._id }, JWT_TOKEN);

            return res.json({ success: true, token: token, data: founduser })


        } catch (e) {
            console.log(e);
            return res.json({ success: false, error: "Something went wrong" });
        }
    },
}



module.exports = authController;