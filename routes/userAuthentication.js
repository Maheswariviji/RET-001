const User=require('../model/user');
const config = require('../config/database'); 
const passport = require('passport');
const LocalStrategy    = require('passport-local').Strategy;
const nodemailer = require('nodemailer');
const router = require('express').Router();

passport.use('local-signup', new LocalStrategy({
      usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true 
    },
    function(req, email, password, done) {
    	
        if (email)
            email = email.toLowerCase(); 
        process.nextTick(function() {
          if(req.body.email){
 User.findOne({ 'local.email' :  email }, function(err, user) {
  if (err)
                        return done(err);
                    
                    if (user) {
                        return done(null, false, {message: 'That email is already taken.'});
                        
                    } else {
                    	 
                        var newuser = new User();
                        newuser.local.email = req.body.email;
                        newuser.local.username = req.body.username;
                        newuser.local.password = newuser.generateHash(req.body.password);
                        newuser.save(function (err) {
                            if (err){
                            	
                                return done(err);
                            }else{
                            	
                            return done(null,newuser);
                           
                            }
                        });
                    }
 });
          }
          
        });

    }));


router.post('/registerauth',(req, res,next) => {

  passport.authenticate('local-signup', function(err, user, info) {
if (user === false) {
res.json({ success: true, message: 'not registered!' });
      return res.redirect('/register');
    } else {
    	 var transporter = nodemailer.createTransport({
             service: 'gmail',
             auth: {
               user: 'sampletask04@gmail.com',
               pass: 'sampletask004'
             }
           });

           var mailOptions = {
             from: 'sampletask04@gmail.com',
             to: user.local.email,
             subject: 'Sending User Credential',
             html:
                 "<header align='center'>" +
                 "<a> <img  src='http://www.roundsedge.com/dev/images/retlogo.png' width='60' height='70'/>" +
                "</a><h1 align='center'>Round's Edge Technologies Pvt Ltd</h1>" +
                  "</header> " +
                  "<div align='center'> Hello  <strong>"+ user.local.username + "</strong>,<br><br> welcome to RET chatApp,your are account was successfully registered."+
                 "</div><div class='flex-container'>" +
                  " <footer align='center'>Copyright &copy; RoundsEdge.com</footer>" +
                  "</div> "
           };

           transporter.sendMail(mailOptions, function(error, info){
             if (error) {
               console.log(error);
             } else {
               console.log('Email sent: ' + info.response);
             }
           });
    res.json({ success: true, message: 'Acount registered!' });
     
    }
  })(req, res, next);
});

router.get('/checkEmail/:email', (req, res) => {
   
    if (!req.params.email) {
      res.json({ success: false, message: 'E-mail was not provided' }); 
    } else {
      
      User.findOne({ 'local.email': req.params.email.toLowerCase() }, (err, user) => {
        if (err) {
          res.json({ success: false, message: err }); 
        } else {
          
          if (user) {
            res.json({ success: false, message: 'E-mail is already taken' }); 
          } else {
            res.json({ success: true, message: 'E-mail is Available' }); 
          }
        }
      });
    }
  });
router.get('/checkEmailForLogin/:email', (req, res) => {
	   
    if (!req.params.email) {
      res.json({ success: false, message: 'E-mail was not provided!!' }); 
    } else {
      
      User.findOne({ 'local.email': req.params.email.toLowerCase() }, (err, user) => {
        if (err) {
          res.json({ success: false, message: err }); 
        } else {
          
          if (user) {
        	  console.log(user);
            res.json({ success: true, message: 'E-mail is Available!!' }); 
          } else {
            res.json({ success: false, message: 'E-mail not found!!' }); 
          }
        }
      });
    }
  });


 
  router.get('/checkUsername/:username', (req, res) => {
    
    if (!req.params.username) {
      res.json({ success: false, message: 'Username was not provided' }); 
    } else {
      
      User.findOne({ 'local.username': req.params.username.toLowerCase()}, (err, user) => { 
        if (err) {
          res.json({ success: false, message: err }); 
        } else {
          
          if (user) {
            res.json({ success: false, message: 'Username is already taken' }); 
          } else {
            res.json({ success: true, message: 'Username is Available' }); 
          }
        }
      });
    }
  });

module.exports =router;