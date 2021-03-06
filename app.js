/*
custom server codes: 
  550 - database action returned an error
  551 - database 'update' query didn't modify anything, but didn't have errors
  552 - database 'delete' didn't have errors, but returned unexpected result
*/ 

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

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

// Static Folder
app.use('/app',
  express.static(path.join(__dirname, "app"))
);
app.use('/service-worker.js',
express.static(path.join(__dirname, "service-worker.js"))
);

// JWT authentication stuff
var expressJWT = require('express-jwt');

var JWTSecret = require('./_jwt/secret');

// Routes without authorization
app.use(
  expressJWT({secret: JWTSecret}).unless({
  path: [
  /\/login\//i, '/', 
  // App pages
  '/recipe-dash', 
  /^\/friends/i, 
  /^\/recipes/i,
  /^\/settings/i
]
}));

// API 
var login = require('./api/login');
var userData = require('./api/userData');
var recipes = require('./api/recipes');
var friends = require('./api/friends');
app.use('/api/login', login);
app.use('/api/user', userData);
app.use('/api/recipes', recipes);
app.use('/api/friends', friends);


// Catch all always returns app js
app.use(function(req, res, next) {
  res.sendFile(path.join(__dirname, 'app', 'index.html'));
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
