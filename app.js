const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const body = require('body-parser');
const user = require('./api/user');
const api = require('./api/api');

mongoose.connect("mongodb+srv://peterkameel:@peter2020@fosau-jyv6o.mongodb.net/fosau?retryWrites=true&w=majority",{
    useUnifiedTopology: true,
    useNewUrlParser: true
});

app.use('/',(req,res)=>{
    res.json({massage: 'Hello peter app is perfict'});
});

app.use(morgan('dev'));
app.use(body.urlencoded({extended: false}));
app.use(body.json());


//use app api
app.use('/user', user);
app.use('/api', api);

module.exports = app;