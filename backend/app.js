var createError = require('http-errors');
var express = require('express');

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require('passport');
const bodyParser = require('body-parser');

var cors = require('cors')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var providersRouter = require('./routes/providers')
var apiRouter = require('./api/routes/main.routes')

// for authorization
require('./api/auth/auth');

const routes = require('./api/routes/routes');
const secureRoute = require('./api/routes/secure-routes');


var app = express();
app.use(cors({'origin': 'http://localhost:4200'}))  // this gives angular app running on 4200 access the backend express app.
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(bodyParser.urlencoded({ extended: false }));   // for authorization
// app.use(bodyParser.json());   // for authorization

app.use('/', routes);
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/providers', providersRouter)
app.use('/api', apiRouter)
app.use('./*', indexRouter)


// Plug in the JWT strategy as a middleware so only verified users can access this route.
app.use('/user', passport.authenticate('jwt', { session: false }), secureRoute);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
