const express = require('express');
const app = express();

app.use('/',(req,res)=>{
    res.json({massage: 'Hello peter app is perfict'});
});

module.exports = app;