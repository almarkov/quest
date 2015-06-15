var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var game = require('./routes/game');
var timer = require('./routes/timer');
var devices_list = require('./routes/devices_list');
var locker_button = require('./routes/locker_button');
var save_button = require('./routes/save_button');
var polyhedron_rack = require('./routes/polyhedron_rack');
var scanner = require('./routes/scanner');
var cell1   = require('./routes/cell1');
var cell2   = require('./routes/cell2');
var personal_code_pad = require('./routes/personal_code_pad');
var entrance_door = require('./routes/entrance_door');
var locker_door = require('./routes/locker_door');
var room2_door = require('./routes/room2_door');
var room3_door = require('./routes/room3_door');
var room4_door = require('./routes/room4_door');
var room5_door = require('./routes/room5_door');
var room6_door = require('./routes/room6_door');
var room7_door = require('./routes/room7_door');
var light = require('./routes/light');

var app = express();

// адрес самого сервера
web_server_url = "http://localhost:3000";

// время начала квеста
start_time = null;

// конфигурация
config = require("./config.js");


// глобальные объекты на сервере, соответствующие устройствам
// в эмуляторе - меняются по запросу сервера, либо пользователем и отправляют состояние на сервер
devices = require("./devices.js");

// игроки
gamers = require("./gamers.js");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// заголовок для cors
app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.use('/', routes);
app.use('/game', game);
app.use('/timer', timer);
app.use('/devices_list', devices_list);
app.use('/locker_button', locker_button);
app.use('/save_button', save_button);
app.use('/polyhedron_rack', polyhedron_rack);
app.use('/scanner', scanner);
app.use('/cell1', cell1);
app.use('/cell2', cell2);
app.use('/personal_code_pad', personal_code_pad);
app.use('/entrance_door', entrance_door);
app.use('/room2_door', room2_door);
app.use('/room3_door', room3_door);
app.use('/room4_door', room4_door);
app.use('/room5_door', room5_door);
app.use('/room6_door', room6_door);
app.use('/room7_door', room7_door);
app.use('/locker_door', locker_door);
app.use('/light', light);

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
