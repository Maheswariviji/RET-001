const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan=require('morgan');
const router = express.Router();
const mongoose=require('mongoose');
const config =require('./config/database');
const path=require('path');
const loginAuth = require('./routes/loginAuthentication')(router);
const forgotAuth = require('./routes/forgotPasswordAuthentication');
const cors = require('cors');
const passport = require('passport');
const Register=require('./routes/userAuthentication');
const socialAuth=require('./routes/socialAuthentication');
const session = require('express-session');
const cookieParser = require('cookie-parser');

mongoose.Promise=global.Promise;
mongoose.connect(config.uri,(err)=>{
	if(err){
		console.log('cannot connect to database');
		
	}else{
		console.log('database sucessfully connected');
	}
		
});

app.use(cors({
	origin:'http://localhost:4200'
}));


app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({secret: 'whatever', resave: true, saveUninitialized: true}));
app.use(express.static(__dirname+'/client/dist/'));
app.use('/loginAuthentication', loginAuth);
app.use('/forgotPasswordAuthentication', forgotAuth);
app.use('/socialAuthentication',socialAuth);
app.use('/reg',Register);

app.use(passport.initialize());
app.use(passport.session());


app.get('/twitter/return',socialAuth);
app.get('/auth/google/callback',socialAuth);
app.get('/auth/facebook/callback',socialAuth);
app.get('/auth/linkedin/callback',socialAuth);
app.get('*', (req,res) => {
	res.sendFile(path.join(__dirname+'/client/dist/index.html'));
});




app.listen(8080,()=> {
	console.log('Listening on port 8080');
});