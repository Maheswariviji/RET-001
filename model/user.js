const mongoose = require('mongoose');
const bcrypt   = require('bcrypt-nodejs');


let emailLengthChecker = (email) => {

  if (!email) {
    return false; 
  } else {
    
    if (email.length < 5 || email.length > 30) {
      return false; 
    } else {
      return true; 
    }
  }
};

let validEmailChecker = (email) => {
  
  if (!email) {
    return false; 
  } else {
    
    const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    return regExp.test(email); 
  }
};


const emailValidators = [
  {
    validator: emailLengthChecker,
    message: 'E-mail must be at least 5 characters but no more than 30'
  },
  
  {
    validator: validEmailChecker,
    message: 'Must be a valid e-mail'
  }
];


let usernameLengthChecker = (username) => {
  
  if (!username) {
    return false; 
  } else {
   
    if (username.length < 3 || username.length > 15) {
      return false; 
    } else {
      return true; 
    }
  }
};


let validUsername = (username) => {
 
  if (!username) {
    return false; 
  } else {
  
    const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
    return regExp.test(username); 
  }
};

const usernameValidators = [

  {
    validator: usernameLengthChecker,
    message: 'Username must be at least 3 characters but no more than 15'
  },

  {
    validator: validUsername,
    message: 'Username must not have any special characters'
  }
];


let passwordLengthChecker = (password) => {

  if (!password) {
    return false; 
  } else {
   
    if (password.length < 8 || password.length > 35) {
      return false; 
    } else {
      return true; 
    }
  }
};

let validPassword = (password) => {
  if (!password) {
    return false; 
  } else {
    const regExp = new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/);
    return regExp.test(password); 
  }
};


const passwordValidators = [
  {
    validator: passwordLengthChecker,
    message: 'Password must be at least 8 characters but no more than 35'
  },

  {
    validator: validPassword,
    message: 'Must have at least one uppercase, lowercase, special character, and number'
  }
];



var userSchema = mongoose.Schema({

    local            : {
    	username: { type: String, required: true, unique: true, lowercase: true, validate: usernameValidators },
        email        :{ type:String,required: true, unique: true, lowercase: true,validate: emailValidators },
        password     : {type:String,required: true, validate: passwordValidators}
    },
    facebook         : {
        id           : String,
        token        : String,
        email        : {type:String,required: true, unique: true, lowercase: true},
        name         : {type:String,required: true, unique: true, lowercase: true}
    },
    twitter          : {
        id           : String,
        token        : String,
        displayName  : String,
        username     : {type:String,required: true, unique: true, lowercase: true}
    },
    google           : {
        id           : String,
        token        : String,
        email        : {type:String,required: true, unique: true, lowercase: true},
        name         : {type:String,required: true, unique: true, lowercase: true}
    }

});


userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};


userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};


module.exports = mongoose.model('User', userSchema);