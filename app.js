var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var lights = require('./routes/lights');
var music = require('./routes/music');
var lightsConfig = require('./config/lights.json');

var app = express();

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('/tmp/sarah.db');
app.db = db;

app.db.serialize(function() {
	db.run('CREATE TABLE IF NOT EXISTS light_states (id INT, name CHAR(255), room CHAR(255), type CHAR(50), type_protocol CHAR(50), type_detail CHAR(50), state INT)');
	lightsConfig.forEach(function(light, index) {
		db.run('INSERT OR IGNORE INTO light_states VALUES (' + light.id + ', "' + light.name + '", "' + light.room + '", "' + light.type + '", "' + light.type_protocol + '", "' + light.type_detail + '", 0)')
	});
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/lights', lights);
app.use('/music', music);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});


module.exports = app;
