require('dotenv').config();
const express = require('express');
const router = express.Router();
const userModel = require('../model/user-model');
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");
const auth = require("../middleware/auth");
router.use(cookieParser());

//base url path: http://localhost:8000/userapi/register

router.get("/about", (req, res) => {
    res.send("heelo jwttokendfgdsgdsgsdsfasfsafsafadfafa");
    console.log(`this is the about us page cookie ${req.cookies.jwt}`)
});

router.post('/register', async (req, res) => {
    try {
        const password = req.body.password;
        const cpassword = req.body.cpassword;
        if (password === cpassword) {
            const registerUser = new userModel({
                fullName: req.body.fullName,
                email: req.body.email,
                phone: req.body.phone,
                address: req.body.address,
                password: req.body.password,
                cpassword: req.body.cpassword,
            });
            // console.log("the Success part" + registerUser);

            const token = await registerUser.generateAuthToken();
            // console.log("the Token part" + token);

            // res.cookie("jwt", token, {
            //     expires: new Date(Date.now() + 60000),
            //     httpOnly: true
            // });
            // console.log(cookie);
            const registeredUser = await registerUser.save();
            res.status(200).json("User Register Successfully!!");
            // console.log(registeredUser);
        } else {
            res.json("password and Confirm passwords are not matching!!")
        }
    } catch (err) {
        res.status(500).json(`Unable To Register User ${err}`);
    }
});

router.post("/login", async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const userEmail = await userModel.findOne({ email: email });
        const isMatch = await bcrypt.compare(password, userEmail.password);
        const token = await userEmail.generateAuthToken();

        // res.cookie("jwt", token, {
            //     expires: new Date(Date.now() + 60000),
            //     httpOnly: true
            // });
            // console.log(cookie); 

        if (isMatch) {
            res.status(200).json("User Login Successfully!!");
            console.log("user Login successfully!!");
        } else {
            console.log("Password are not matching");
        }
    } catch (err) {
        res.status(400).json("Envalid Login Credential !!");
    }
});

module.exports = router;