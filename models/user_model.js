const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

const UserSchema = mongoose.Schema({
       username:String,
       email:String,
       password:String
},{ versionKey: false,
    collection:'user'});

const User = mongoose.model('user',UserSchema);

//signup function
exports.signup = (body, res) => {
    const user = new User({
        username: body.username,
        email: body.email,
        password: body.password
    });
    //check if user exist
    User.find({ email: user.email })
        .exec()
        .then(result => {
            if (result.length === 0)
                user.save().then(result => {
                    res.json({
                        error: false,
                        massage: 'Singup Successfull',
                        user: result
                    });
                }).catch(err => console.log(err));
            else res.json({
                error: true,
                massage: 'User exsist'
            });
        });
};

//Login function
exports.login = (email,password, result1) => {
    User.find({ password:password }).exec().then(res => {
        if (res.length > 0)
            User.find({ email: email, password: password })
                .exec()
                .then(result => {
                    if (result.length > 0) {
                        result1.json({
                            error: false,
                            massage: 'Login Successfull',
                            user: result[0]
                        });
                    } else result1.json({
                        error: true,
                        massage: 'Check Your Email'
                    });
                });
        else result1.json({
            error: true,
            massage: 'Check Your Password'
        });
    });
};

exports.forgetpassword = (body, result) => {
    User.find({ email: body.email })
        .exec().then(res => {
            if (res.length > 0) {
                sendMail(res, result);
            } else result.json({
                error: true,
                massage: 'Check Your Email'
            });
        });
};

const sendMail = (body, result) => {
    var transporter = nodemailer.createTransport({
        service: 'outlook.com',
        auth: {
            user: 'pkameel@outlook.com',
            pass: '@peter2020'
        }
    });

    var mailOptions = {
        from:'pkameel@outlook.com' ,
        to: body.email,
        subject: 'Restore Password',
        text: 'Use this password to login: ${body.password}'
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            result.json({err: error});
        } else {
            result.json({err: false,massage: info.massage});
        }
    });
};
