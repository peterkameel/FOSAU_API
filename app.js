const express = require('express');
const app = express();
const mongoose = require('mongoose');
const body = require('body-parser');
const user = require('./api/user');
const api = require('./api/api');
const competition = require('./Questions/competition');


mongoose.connect("mongodb+srv://peterkameel:@peter2020@fosau-jyv6o.mongodb.net/fosau?retryWrites=true&w=majority",{
    useUnifiedTopology: true,
    useNewUrlParser: true
});

app.use(body.urlencoded({extended: false}));
app.use(body.json());


//use app api
app.use('/user', user);
app.use('/api', api);
app.use('/competition', competition);


app.use('/',(req,res)=>{
    res.json({massage: 'Hello peter app is perfict'});
});


module.exports = app;