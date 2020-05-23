const express = require('express');
const user = require('../models/user_model');
const isEmpty = require('lodash.isempty');
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
    if (Object.keys(req.body).length !== 0) {
        user.login(req.body, res);
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


module.exports = router;