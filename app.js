var express      = require('express')
var path         = require('path')
var favicon      = require('serve-favicon')
var logger       = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser   = require('body-parser')
var PythonShell  = require('python-shell')
var child_process = require('child_process')

//произв.
benchmarks       = require("./benchmarks.js")

// вспомогат. ф-ции
routines         = require("./routines.js")

// логгинг
mlog             = require("./mlog.js")
mlog.reset()

// глобальные константы из config.json
globals          = require('./globals.js')
globals.load()

// константы(убрать)
SUCCESS_RESULT = {success: 1}
WATCHDOG_FAIL_TICKS_COUNT = globals.get('watchdog_fail_ticks_count')

// разделы системы
var routes       = require('./routes/index')

// управление статистикой
var stats        = require('./routes/stats')
// апи для статистики
var api          = require('./routes/api')
license          = require('./license.js')

// управление квестом
var game         = require('./routes/game')
var sendcom      = require('./routes/sendcom')
var watchdog     = require('./routes/watchdog')

var app          = express()

// СУБД))
mbd              = require("./mbd.js")

// конфигурация устройств
config = require("./config.js")
config.load()

// логика квеста
logic = require("./logic.js")
logic.load()

// объекты на сервере, соответствующие устройствам
devices = require("./devices.js")
devices.reset()

// таймеры
mtimers = require("./mtimers.js")

// интерфейс оператора
face   = require("./face.js")
face.reset()

// ф-ции, сокращающие запросы
helpers = require("./helpers.js")

// реализация http get-запросов к устройствам с помощью FIFO
queue = require("./queue.js")

// gpio
gpio = require("./gpio.js")

// реализация "modbus"-протокола общения с устройствами с помощью FIFO
modbus_queue = require("./modbus_queue.js")
//modbus_queue.reset()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

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

// index.html
app.use('/', routes)

// cтатистика
app.use('/stats', stats)

// игры
var games = require('./routes/stats/games')
stats.use('/games', games)

// операторы
var operators = require('./routes/stats/operators')
stats.use('/operators', operators)

// апи для статистики
app.use('/api', api)

var api_games = require('./routes/api/games')
api.use('/games', api_games)

var api_operators = require('./routes/api/operators')
api.use('/operators', api_operators)

// модули, доступные через http ('API' квеста)
// нужны для прямой передачи из интерфейса
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
console.log('NODE_ENV: '+ process.env.NODE_ENV);
console.log('NODE_ENV: '+ app.get('env'));
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500)
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

// инициализируем gpio
// !!добавить выполнение скрипта, который создаёт gpio18, если нужно
gpio.init()

// инициализация логики квеста
logic.init()

module.exports = app
