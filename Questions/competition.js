const express = require('express');
const mysql   = require('../Questions/mysql');
const router  = express.Router();

//fun for restore data
router.post('/rand', (req, res) => {
    if (Object.keys(req.body).length !== 0) {
        const sql = "SELECT * FROM questions WHERE hardness = " + req.body.hard +
            " ORDER BY RAND() LIMIT " + req.body.limit;
        mysql.connect(sql, res);
    } else {
        res.json({
            error: true,
            message: 'Error Try Again'
        });
    };
});

//fun for restore data
router.post('/type', (req, res) => {
    if (Object.keys(req.body).length !== 0) {
    const sql = "SELECT * FROM questions WHERE type = " + req.body.type;
    mysql.connect(sql,res);
    }else {
        res.json({
            error: true,
            message: 'Error Try Again'
        });
    };
});

module.exports = router;