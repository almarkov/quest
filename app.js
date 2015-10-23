var express      = require('express')
var path         = require('path')
var favicon      = require('serve-favicon')
var logger       = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser   = require('body-parser')
var http         = require('http')
var fs           = require('fs')
var util         = require('util')

// константы(убрать)
ENABLE_TIMER  = 1
DISABLE_TIMER = 0

ENABLE_MUTEX  = 1
DISABLE_MUTEX = 0

DEV_MODE      = 1
PROD_MODE     = 0

EMULATOR_MODE = 0
REAL_MODE     = 1

SUCCESS_RESULT = {success: 1}

// разделы системы
var routes       = require('./routes/index')

// управление статистикой
var stats        = require('./routes/stats')
var api          = require('./routes/api')

// управление квестом
var game         = require('./routes/game')
var sendcom      = require('./routes/sendcom')
var watchdog     = require('./routes/watchdog')

var app          = express()

// вспомогат. ф-ции
routines         = require("./routines.js")

// СУБД))
mbd              = require("./mbd.js")

// логгинг(в модуль)
log_file = fs.createWriteStream(__dirname + '/log/' + routines.ymd_date() + 'debug.log', {flags : 'a'})
var dev_log_file = fs.createWriteStream(__dirname + '/log/' + routines.ymd_date() + 'dev.log', {flags : 'a'})
var log_stdout = process.stdout

console.log = function(d) {
	log_file.write(routines.ymdhms_date() + "       " + util.format(d) + '\r\n')
	log_stdout.write(util.format(d) + '\n')
};

simple_log = function(d) {
	log_file.write(routines.ymdhms_date() + "       " + util.format(d) + '\r\n')
	if (DEV_MODE) {
		log_stdout.write(util.format(d) + '\n')
	}
}

dev_log = function(d) {
	dev_log_file.write(routines.ymdhms_date() + "       " + util.format(d) + '\r\n')
}

// конфигурация
config = require("./config.js")
config.load()

// логика квеста
logic = require("./logic.js")
logic.load()

// по умолчанию - время таймер в ENABLE_TIMER(убрать)
ENABLE_TIMER  = config.default_timer_value

// глобальные объекты на сервере, соответствующие устройствам
devices = require("./devices.js")
devices.reset()

// новый таймер
timers = require("./timers.js")
// новый таймеры
mtimers = require("./mtimers.js")
// ф-ции для изменения фронта
face   = require("./face.js")
// ф-ции, сокращающие запросы
helpers = require("./helpers.js")
// реализация http get-запросов с помощью FIFO
queue = require("./queue.js")

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.ico'))
app.use(logger('dev'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// заголовок для cors
app.all('/*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*")
	res.header("Access-Control-Allow-Headers", "X-Requested-With")
	next()
})

app.use('/', routes)

app.use('/stats', stats)

var games = require('./routes/stats/games')
stats.use('/games', games)

var operators = require('./routes/stats/operators')
stats.use('/operators', operators)

app.use('/api', api)

var api_games = require('./routes/api/games')
api.use('/games', api_games)

var api_operators = require('./routes/api/operators')
api.use('/operators', api_operators)

app.use('/game', game)

app.use('/sendcom', sendcom)

app.use('/watchdog', watchdog)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found')
	err.status = 404
	next(err)
})

// error handlers

// development error handler
// will print stacktrace
console.log(app.get('env'))
if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		})
	})
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
	res.status(err.status || 500)
	res.render('error', {
		message: err.message,
		error: {}
	})
})

// инициализируем квест
logic.init()

module.exports = app
