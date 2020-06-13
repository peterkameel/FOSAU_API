const express = require('express');
const user = require('../models/user_model');
const router = express.Router();



router.post('/signup', (req, res) => {
    if (Object.keys(req.body).length !== 0) {
        user.signup(req.body, res);
    } else {
        res.json({
            error: true,
            massage: 'Error Try Again'
        });
    };
});

router.post('/login', (req, res) => {
    var email = req.body.email;
    var password = req.body.password;
    if (email !== 0 && password !== 0) {
        user.login(email, password, res);
    } else {
        res.json({
            error: true,
            massage: 'Error Try Again'
        });
    };
});

router.post('/forget', (req, res) => {
    if (Object.keys(req.body).length !== 0) {
        user.forgetpassword(req.body, res);
    } else {
        res.json({
            error: true,
            massage: 'Error Try Again'
        });
    };
});


router.post('/username',(req,res) => {
    if (Object.keys(req.body).length !== 0) {
        user.username(req.body,res);
    }else {
        res.json({
            error: true,
            massage: 'Error Try Again'
        });
    };
});

router.post('/userpassword',(req,res) => {
    if (Object.keys(req.body).length !== 0) {
        user.userpass(req.body,res);
    }else {
        res.json({
            error: true,
            massage: 'Error Try Again'
        });
    };
});


module.exports = router;