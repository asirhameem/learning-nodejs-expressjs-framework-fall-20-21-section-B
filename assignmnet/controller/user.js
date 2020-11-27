const express = require('express');
const userModel = require.main.require('./models/userModel');
const cartModel = require.main.require('./models/userModel');
const productModel = require.main.require('./models/productModel');
//const noticeModel = require.main.require('./models/notice-model');
const router = express.Router();
const fs = require('fs');
const { check, validationResult } = require('express-validator');
var msg = "";

router.get('/', (req, res) => {

    productModel.getProducts(function(results) {
        res.render('user/home', { Products: results });
    })
})

router.get('/navbar', (req, res) => {

    res.render('shared/navbar', { name: req.cookies["uname"] });

})
router.get('/showproduct/:str', (req, res) => {

    productModel.getProductByCategory(req.params.str, function(results) {
        console.log(results);
        res.render('user/showproduct', { Products: results });
    })

})

router.post('/add/:id', (req, res) => {
    cartModel.addCart(req.params.id, req.cookies["Id"], function(status) {
        if (status) {
            res.redirect('../cart');
        } else {
            console.log("Server Error");
        }
    })
})




module.exports = router;