const express = require('express');
const userModel = require.main.require('./models/userModel');
const router = express.Router();

router.get('/', (req, res) => {

    if (req.cookies['email'] != null && req.cookies['type'] == "Customer") {
        res.render('home/Home');
    } else {
        res.redirect('/login');
    }
})


router.get('/navbar', (req, res) => {
    res.render('shared/navbar');
})


module.exports = router;