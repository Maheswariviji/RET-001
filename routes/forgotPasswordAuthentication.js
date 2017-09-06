var User = require('../model/user'); 
var jwt = require('jsonwebtoken'); 
var secret = 'harrypotter'; 
var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport'); 
var router = require('express').Router();

	var client = nodemailer.createTransport({
        service: 'google',
        auth: {
            user: 'dhiva030295@gmail.com',
            pass: 'dk231425' 
        },
        tls: { rejectUnauthorized: false }
});

    // Route to send reset link to the user
    router.put('/resetpassword', (req, res)=> {
        User.findOne({ local:{email: req.body.email }}).select('username email resettoken ').exec(function(err, user) {
            if (err) {
                res.json({ success: false, message: 'Something went wrong. This error has been logged and will be addressed by our staff. We apologize for this inconvenience!' });
            } else {
                if (!user) {
                    res.json({ success: false, message: 'Email was not found' }); 
                
                } else {
                    user.resettoken = jwt.sign({ username: user.username, email: user.email }, secret, { expiresIn: '24h' }); 
                    
                    user.save((err) => {
                        if (err) {
                            res.json({ success: false, message: err }); 
                        } else {
                            
                            var email = {
                                from: 'dhiva030295@gmail.com',
                                to: user.email,
                                subject: 'Reset Password Request',
                                text: 'Hello ' + user.name + ', You recently request a password reset link. Please click on the link below to reset your password:<br><br><a href="http://localhost:4200/resetpassword/' + user.resettoken,
                                html: 'Hello<strong>'+ user.name + '</strong>,<br><br>You recently request a password reset link. Please click on the link below to reset your password:<br><br><a href="http://localhost:4200/resetpassword/' + user.resettoken + '">Reset link</a>'
                            };
                            
                            client.sendMail(email, function(err, info) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    console.log(info);
                                    console.log('sent to: ' + user.email); 
                                }
                            });
                            res.json({ success: true, message: 'Please check your e-mail for password reset link' }); 
                        }
                    });
                }
            }
        });
    });

    // Route to verify user's e-mail activation link
    router.get('/resetpassword/:token', (req, res)=> {
        User.findOne({ resettoken: req.params.token }).select().exec(function(err, user) {
            if (err) {
                res.json({ success: false, message: 'Something went wrong. This error has been logged and will be addressed by our staff. We apologize for this inconvenience!' });
            } else {
                var token = req.params.token;
                // Function to verify token
                jwt.verify(token, secret, function(err, decoded) {
                    if (err) {
                        res.json({ success: false, message: 'Password link has expired' }); 
                    } else {
                        if (!user) {
                            res.json({ success: false, message: 'Password link has expired' });
                        } else {
                            res.json({ success: true, user: user }); 
                        }
                    }
                });
            }
        });
    });

    // Save user's new password to database
 router.put('/savepassword',(req, res) =>{
        User.findOne({ username: req.body.username }).select('username email  password resettoken').exec(function(err, user) {
            if (err) {
                res.json({ success: false, message: 'Something went wrong. This error has been logged and will be addressed by our staff. We apologize for this inconvenience!' });
            } else {
                if (req.body.password === null || req.body.password === '') {
                    res.json({ success: false, message: 'Password not provided' });
                } else {
                    user.password = req.body.password; 
                    user.resettoken = false; 
                    
                    user.save((err) => {
                        if (err) {
                            res.json({ success: false, message: err });
                        } else {
                            
                            var email = {
                                from: 'dhiva030295@gmail.com',
                                to: user.email,
                                subject: 'Password Recently Reset',
                                text: 'Hello ' + user.name + ', This e-mail is to notify you that your password was recently reset at localhost.com',
                                html: 'Hello<strong> ' + user.name + '</strong>,<br><br>This e-mail is to notify you that your password was recently reset at localhost.com'
                            };
                            
                            client.sendMail(email,(err, info) => {
                                if (err) console.log(err); 
                            });
                            res.json({ success: true, message: 'Password has been reset!' }); 
                        }
                    });
                }
            }
        });
});
 module.exports = router;