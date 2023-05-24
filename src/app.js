var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./database.db');

var indexRouter = require('./routes/index');
var menuRouter = require('./routes/menu');
var signInRouter = require('./routes/sign_in');
var signUpRouter = require('./routes/sign_up');
var activitiesRouter = require('./routes/activities');
var classroomsRouter = require('./routes/classrooms');
var criteriaRouter = require('./routes/criteria');
var gradesRouter = require('./routes/grades');
var questionsRouter = require('./routes/questions');
var registrationsRouter = require('./routes/registrations');
var studentsRouter = require('./routes/students');

var app = express();

// Connect to DB
app.use(function (req, res, next) {
    req.db = db;
    next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/menu', menuRouter);
app.use('/sign_in', signInRouter);
app.use('/sign_up', signUpRouter);
app.use('/activities', activitiesRouter);
app.use('/classrooms', classroomsRouter);
app.use('/criteria', criteriaRouter);
app.use('/grades', gradesRouter);
app.use('/questions', questionsRouter);
app.use('/registrations', registrationsRouter);
app.use('/students', studentsRouter);

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
    res.json({error: err.message})
});

module.exports = app;
