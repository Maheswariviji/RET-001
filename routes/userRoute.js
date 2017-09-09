const User=require('../model/user');
const config = require('../config/database'); 
const passport = require('passport');
const LocalStrategy    = require('passport-local').Strategy;
const nodemailer = require('nodemailer');



module.exports=(router)=>{

passport.serializeUser(function(user, done) {
        done(null, user.id);
    });


    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

passport.use('local-signup', new LocalStrategy({
      usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true 
    },
    function(req, email, password, done) {
        if (email)
            email = email.toLowerCase(); 
          console.log(email);
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
var id= Math.floor((1 + Math.random()) * 0x10000).toString(4).substring(1);
   console.log(id);
   var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'sampletask04@gmail.com',
    pass: 'sampletask004'
  }
});

var mailOptions = {
  from: 'sampletask04@gmail.com',
  to: req.body.email,
  subject: 'Sending User Credential',
  text:'Hi User',
  html: "<b>Hello</b>"+req.body.username+'<br>'+'<br>'+"<b>UserName</b>"+req.body.email+'<br>'+'<br>'+"<b>Password</b>"+id
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});

                        // newuser.local.password = newuser.generateHash(req.body.password);
                           newuser.local.password = newuser.generateHash(id);
                          
                      newuser.save(function (err) {
                            if (err)
                              return done(err);
                              console.log("newuser saved");
                            console.log(newuser)
                            return done(null,newuser);
                        });
                    }
 });
          }
          
        });

    }));


router.post('/registerauth',(req, res,next) => {

  passport.authenticate('local-signup', function(err, user, info) {
if (user === false) {
res.json({ success: true, message: 'Not Registered Try Again ' });
      return res.redirect('/register');
    } else {
    res.json({ success: true, message: 'Account Registered!' });
     
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






return router;
}
