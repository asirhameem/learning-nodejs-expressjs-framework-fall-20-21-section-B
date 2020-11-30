const express = require('express');
const userModel = require.main.require('./models/crud-model');
const router = express.Router();
// const mailgun = require("mailgun-js");
// require('dotenv').config();
const { check, validationResult } = require('express-validator');
var msg = "";

router.get('/', (req, res) => {
    if (req.cookies["cred"] != null) {
        res.redirect("/userdash");
    } else {
        res.render('index/registration', { msg: msg });
    }
})

router.post('/', [
    check('username', 'Invalid Username')
    .exists()
    .isLength({ min: 4 }),
    check('email', 'Invalid Email')
    .exists()
    .isEmail(),
    check('bloodgroup', 'Invalid bloodgroup')
    .exists()
    .isLength({ min: 2 }),

    check("password", "invalid password")
    .exists()
    .isLength({ min: 4 }),
    check("confirmpass", "Doesnt Match with password")
    .custom((val, { req }) => {
        if (val !== req.body.password) {
            throw new Error("Passwords don't match");
        } else {
            return val;
        }
    }),
    check("gender", "invalid gender")
    .exists()
    .isLength({ min: 2 })
], (req, res) => {
    userModel.getByEmail(req.body.email, function(result) {

        if (result.length > 0) {
            msg = "exists";
            res.render('index/registration', { msg: msg });
        } else {
            msg = "";
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                console.log("validation failed");
                const alert = errors.array();
                alert.forEach(myFunction);

                function myFunction(item) {
                    console.log(item);
                }

            } else {

                res.cookie('verification', req.body.email);
                var user = {
                    username: req.body.username,
                    email: req.body.email,
                    bloodgroup: req.body.bloodgroup,

                    password: Buffer.from(req.body.password).toString('base64'),
                    profilepic: "...",
                    type: "User",
                    status: "Verified",
                    gender: req.body.gender
                };
                msg = "";

                userModel.insert(user, function(status) {
                    if (status) {


                        console.log("success");
                        res.redirect('/login');
                    } else {
                        console.log("server failure");
                    }
                });
            }
        }
    })
})


module.exports = router;