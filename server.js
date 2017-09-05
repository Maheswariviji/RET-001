const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan=require('morgan');
const router = express.Router();
const mongoose=require('mongoose');
const config =require('./config/database');
const path=require('path');
const cors = require('cors');
const passport = require('passport');
const Register=require('./routes/userRoute')(router);

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
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname+'/client/dist/'));


app.use(passport.initialize());
app.use(passport.session());


app.use('/reg',Register);

app.get('/login', (req,res) => {
	res.sendFile(path.join(__dirname+'/client/dist/index.html'));
});

app.get('/dashboard', (req,res) => {
	res.sendFile(path.join(__dirname+'/client/dist/index.html'));
});
app.get('/register', (req,res) => {
	res.sendFile(path.join(__dirname+'/client/dist/index.html'));
});

app.listen(8080,()=> {
	console.log('Listening on port 8080');
});