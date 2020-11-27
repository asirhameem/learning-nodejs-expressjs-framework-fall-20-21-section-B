const express = require('express');
const regModel = require.main.require('./models/userRegistration');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('registration/Register');
})

router.post('/', (req, res) => {

    var user = {
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
        gender: req.body.gender,
        dp: "",
        type: "Customer"

    };

    regModel.insert(user, function(status) {
        if (status) {
            res.redirect('/login');
        } else {
            res.redirect('user/create');
        }
    });
});



module.exports = router;


//validation -> express-validator (https://www.npmjs.com/package/express-validator)
//file upload -> express-fileupload (https://www.npmjs.com/package/express-fileupload)