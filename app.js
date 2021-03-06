var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var nodemon = require('nodemon');
var mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/database');
//mongoose.connect('mongodb+srv://honey_behal:88914170Jaimatadi@mycluster-lff62.gcp.mongodb.net/test?retryWrites=true&w=majority');
mongoose.Promise = global.Promise;

//var indexRouter = require('./src/routes/index');
var usersRouter = require('./src/routes/users');
var bodyParser = require('body-parser');

// support parsing of application/json type post data


var app = express();
var cors = require('cors');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(bodyParser.json());

app.use('/', usersRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
