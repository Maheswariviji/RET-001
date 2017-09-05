const User=require('../model/user');
const config = require('../config/database'); 
const passport = require('passport');
const LocalStrategy    = require('passport-local').Strategy;
const GoogleStrategy   = require('passport-google-oauth').OAuth2Strategy;

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
                            if (err)
                                return done(err);
                            
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
res.json({ success: true, message: 'not registered!' });
      return res.redirect('/register');
    } else {
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


 router.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

        router.get('/auth/google/callback',
            passport.authenticate('google', function(err, user, info) {
    if (err) { return next(err); }
    if (user) { return res.redirect('/dashboard'); }
    else
      {return res.redirect('/register');}
            }));


passport.use(new GoogleStrategy({
clientID        : '889390166031-ute4b4qihe2mrjdf493ljsn91ss6ji6j.apps.googleusercontent.com',
        clientSecret    : 'acOu8CVZUG8HLwUK5Ys-y91y',
        callbackURL      : 'http://localhost:8080/auth/google/callback',
       passReqToCallback : true 

    },
    function(req, token, refreshToken, profile, done) {

        process.nextTick(function() {

            if (!req.user) {

                User.findOne({ 'google.id' : profile.id }, function(err, user) {
                    if (err)
                        return done(err);

                    if (user) {
                       if (!user.google.token) {
                            user.google.token = token;
                            user.google.name  = profile.displayName;
                            user.google.email = (profile.emails[0].value || '').toLowerCase(); // pull the first email

                            user.save(function(err) {
                                if (err)
                                    return done(err);
                                    
                                return done(null, user);
                            });
                        }

                        return done(null, user);
                    } else {
                        console.log("google");
console.log(profile);
                        var newUser          = new User();

                        newUser.google.id    = profile.id;
                        newUser.google.token = token;
                        newUser.google.name  = profile.displayName;
                        newUser.google.email = (profile.emails[0].value || '').toLowerCase(); // pull the first email

                        newUser.save(function(err) {
                            if (err)
                                return done(err);
                                
                            return done(null, newUser);
                        });
                    }
                });

            } else {
                
                var user               = req.user; 

                user.google.id    = profile.id;
                user.google.token = token;
                user.google.name  = profile.displayName;
                user.google.email = (profile.emails[0].value || '').toLowerCase(); 

                user.save(function(err) {
                    if (err)
                        return done(err);
                        
                    return done(null, user);
                });

            }

        });

    }));

return router;
}
