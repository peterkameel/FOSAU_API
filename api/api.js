const express = require('express');
const api   = require('../models/api_model');
const router  = express.Router();

//fun for restore data
router.post('/restore', (req, res) => {
    if (Object.keys(req.body).length !== 0) {
        api.restoreSemesters(req, res);
    } else {
        res.json({
            error: true,
            massage: 'Error Try Again'
        });
    };
});

//fun for restore data
router.post('/syncs', (req, res) => {
    if (Object.keys(req.body).length !== 0) {
        for (const item of req.body) {
            api.syncs(item);
        };
        res.json({
            error: false,
            massage: 'sync completed'
        });
    } else {
        res.json({
            error: true,
            massage: 'Error Try Again'
        });
    };
});

//fun for restore data
router.post('/syncc', (req, res) => {
    if (Object.keys(req.body).length !== 0) {
        for (const item of req.body) {
            api.syncC(item);
        };
        res.json({
            error: false,
            massage: 'sync completed'
        });
    } else {
        res.json({
            error: true,
            massage: 'Error Try Again'
        });
    };
});


module.exports = router;