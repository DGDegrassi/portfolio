require('dotenv').config();
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var xoauth2 = require('xoauth2');
var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

app.post('/contact', function (req, res) {
	//Honeypot for spambots
	// if (req.body.company) {
	// 	res.render('contact', {
	// 		title: 'Contact',
	// 		err: true,
	// 		page: 'contact',
	// 		type: 'empty',
	// 		body: req.body.message,
	// 		name: req.body.name,
	// 		email: req.body.email,
	// 		msg: "Spambot detected!",
	// 		description: 'spam' 
	// 	});
	// 	return;
	// }
	// Check if all required fields are filled
	// if (!req.body.name || !req.body.email || !req.body.message) {
	// 	res.render('contact', {
	// 		title: 'Contact',
	// 		err: true,
	// 		page: 'contact',
	// 		type: 'empty',
	// 		body: req.body.message,
	// 		name: req.body.name,
	// 		email: req.body.email,
	// 		msg: "Please fill in all fields",
	// 		description: 'not successfully sent' 
	// 	});
	// 	return;
	// }

	// Check for valid email
	// var email_check = validator.validate(req.body.email);
	// if (email_check == false) {
	// 	res.render('contact', {
	// 		title: 'Contact',
	// 		err: true,
	// 		page: 'contact',
	// 		type: 'empty',
	// 		body: req.body.message,
	// 		name: req.body.name,
	// 		email: req.body.email,
	// 		msg: "Please use a valid email address.",
	// 		description: 'not successfully sent' 
	// 	});
	// 	return;
	// }

	// nodemailer with OAuth2 authentication
	var transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			type: 'OAuth2',
				user: 'dgdegrassi@gmail.com',
				clientId: process.env.CLIENT_ID,
				clientSecret: process.env.CLIENT_SECRET,
				refreshToken: process.env.REFRESH_TOKEN
		}
	});

	// fill mail options
	var mailOpts = {
		from: req.body.name + '&lt;' + req.body.email + '&gt;',
		to: 'dgdegrassi@gmail.com',
		subject: 'Contact from Portfolio',
		text: 'Message:' + req.body.message + ' || Name:' + req.body.name + " || Email:" + req.body.email
	};

	// sends a mail out for testing.  will need to figure out how
	// to configure front end to do this when a form is filled
	transporter.sendMail(mailOpts, function(err, info, next) {
		if(err){
			console.log('error log')
		} else {
			console.log('success log');
		}
	});

});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
