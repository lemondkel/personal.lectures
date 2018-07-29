var rootPath = process.cwd();
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var Sequelize = require('sequelize');
var db = require(rootPath + '/routes/config/db').info;
var sequelize = new Sequelize(db.dbname, db.username, db.password, db.server);

var userDao = require(rootPath + '/routes/dao/User');
var lectureDao = require(rootPath + '/routes/dao/Lecture');
var lectureItemDao = require(rootPath + '/routes/dao/LectureItem');

const User = sequelize.define('User', userDao.info, userDao.desc);
const Lecture = sequelize.define('Lecture', lectureDao.info, lectureDao.desc);
const LectureItem = sequelize.define('LectureItem', lectureItemDao.info, lectureItemDao.desc);

User.sync();
Lecture.sync();
LectureItem.sync();

var index = require('./routes/index');
var admin = require('./routes/admin');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
	secret: 'ambc@!vsmkv#!&*!#EDNAnsv#!$()_*#@',
	resave: false,
	saveUninitialized: true
}));


app.use(function (req, res, next) {
	res.locals.user_id = req.session.user_id;

	next();
});

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/admin', admin);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
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
