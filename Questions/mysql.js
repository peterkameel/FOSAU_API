const mysql = require('mysql');

const connection = mysql.createConnection({
    host: "remotemysql.com",
    user: "x10iz9BAkt",
    password: "sFhWhZWj9L",
    database: "x10iz9BAkt"
});

exports.connect = (sql, res) => connection.connect(function (err) {
    if (err)
        res.json({
            error: true,
            message: 'Can not connect database'
        });
    else {
        connection.query(sql, function (err, result) {
            if (err) res.json({
                error: true,
                message: 'No Match Required'
            });
            else res.json({
                error: false,
                message: 'Done',
                questions: result
            });
        });
    };
});