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
var scanner = require('./routes/scanner');



// эмулятор для пассивных устройств
var door   = require('./routes/door');

// обработчики устройств
var audio_player_1 = require('./routes/audio_player_1');
var audio_player_2 = require('./routes/audio_player_2');
var audio_player_3 = require('./routes/audio_player_3');
var audio_player_4 = require('./routes/audio_player_4');

var video_player_1 = require('./routes/video_player_1');
var video_player_2 = require('./routes/video_player_2');
var video_player_3 = require('./routes/video_player_3');

var locker_1_button = require('./routes/locker_1_button');

var locker_1     = require('./routes/locker_1');

var light        = require('./routes/light');

var polyhedron   = require('./routes/polyhedron');

var safety_belts = require('./routes/safety_belts');

var vibration    = require('./routes/vibration');

var terminal_1   = require('./routes/terminal_1');
var terminal_2   = require('./routes/terminal_2');
var terminal_3   = require('./routes/terminal_3');
var terminal_4   = require('./routes/terminal_4');

var cell         = require('./routes/cell');

var figure       = require('./routes/figure');

var locker_2     = require('./routes/locker_2');

var card_reader  = require('./routes/card_reader');

var power_wall   = require('./routes/power_wall');

var smoke        = require('./routes/smoke');

var wd           = require('./routes/wd');

var app = express();

ENABLE_TIMER  = 1;
DISABLE_TIMER = 0;

ENABLE_MUTEX  = 1;
DISABLE_MUTEX = 0;

DEV_MODE      = 1;
PROD_MODE     = 0;

EMULATOR_MODE = 0;
REAL_MODE     = 1;

// вспомогат. ф-ции
routines       = require("./routines.js");
// адрес самого сервера
web_server_url = "http://localhost:3000";

// время начала квеста
start_time = null;

// конфигурация
config = require("./config.js");


// глобальные объекты на сервере, соответствующие устройствам
// в эмуляторе - меняются по запросу сервера, либо пользователем и отправляют состояние на сервер
devices = require("./devices.js");
devices.reset();
// игроки
gamers = require("./gamers.js");

// ф-ции, сокращающие запросы
helpers = require("./helpers.js");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
var fs = require('fs');
var util = require('util');
var log_file = fs.createWriteStream(__dirname + '/log/' + routines.ymd_date() + 'debug.log', {flags : 'a'});
var log_stdout = process.stdout;

console.log = function(d) {
    log_file.write(routines.ymdhms_date() + "       " + util.format(d) + '\r\n');
    log_stdout.write(util.format(d) + '\n');
};

simple_log = function(d) {
  log_file.write(routines.ymdhms_date() + "       " + util.format(d) + '\r\n');
  if (DEV_MODE) {
    log_stdout.write(util.format(d) + '\n');
  } 
};

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
app.use('/scanner', scanner);

app.use('/door_1', door);
app.use('/door_2', door);
app.use('/door_3', door);
app.use('/door_4', door);
app.use('/door_5', door);
app.use('/door_6', door);
app.use('/door_7', door);
app.use('/door_8', door);

app.use('/audio_player_1', audio_player_1);
app.use('/audio_player_2', audio_player_2);
app.use('/audio_player_3', audio_player_3);
app.use('/audio_player_4', audio_player_4);

app.use('/video_player_1', video_player_1);
app.use('/video_player_2', video_player_2);
app.use('/video_player_3', video_player_3);

app.use('/locker_1_button', locker_1_button);

app.use('/locker_1', locker_1);

app.use('/polyhedron', polyhedron);

app.use('/light', light);

app.use('/safety_belts', safety_belts);

app.use('/vibration', vibration);

app.use('/terminal_1', terminal_1);
app.use('/terminal_2', terminal_2);
app.use('/terminal_3', terminal_3);
app.use('/terminal_4', terminal_4);

app.use('/cell_1', cell);
app.use('/cell_2', cell);
app.use('/cell_3', cell);
app.use('/cell_4', cell);
app.use('/cell_5', cell);

app.use('/figure', figure);

app.use('/locker_2', locker_2);

app.use('/card_reader', card_reader);

app.use('/power_wall', power_wall);

app.use('/smoke', smoke);

app.use('/wd', wd);


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
