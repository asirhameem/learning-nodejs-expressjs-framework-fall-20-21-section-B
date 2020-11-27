const express = require('express');
const userModel = require.main.require('./models/userModel');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('login/index')
})

router.post('/', (req, res) => {

    var user = {
        email: req.body.email,
        password: req.body.password
    };

    userModel.validate(user, function(status) {
        if (status) {
            userModel.getByEmail(user.email, function(results) {
                res.cookie('email', req.body.email);
                res.cookie('name', results[0].name);
                res.cookie('gender', results[0].gender);
                res.cookie('type', results[0].type)

                res.redirect('/home');
            });

        } else {
            res.redirect('/login');
        }
    });

})

module.exports = router;