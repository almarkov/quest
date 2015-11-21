var express       = require('express')
var http          = require('http')
var child_process = require('child_process')
var fs            = require('fs')
var request       = require('request')
var router        = express.Router()

// запрос состояния модели
router.get('/all', function(req, res, next) {

	// передача модели в GUI
	var result = {}

	result.devices = devices.list

	// сделать адаптивно - отправлять только изменения
	result.face = face.get()

	res.json(result)

})

// --------------------------------------------------------------------
// системные команды(как-то сконнектить с logic.js)
// --------------------------------------------------------------------
// выключение устройств
router.get('/devices_off', function(req, res, next) {
	// выключаем устройства
	helpers.turn_off_devices()

	res.json(SUCCESS_RESULT)
})

// включение и проверка устройств
router.get('/devices_on', function(req, res, next) {

	// включаем устройства
	helpers.turn_on_devices()

	// включаем проверку(через 2 секунды после включения)(тоже как-то вписать в логику)
	setTimeout(function(){
		helpers.turn_on_wd_check()

		// ещё через 5 секунд смотрим результаты
		setTimeout(function(){
			helpers.wd_check_result()
		}, 5000)

	}, 2000)

	res.json(SUCCESS_RESULT)

})

// 'запуск' сервера
router.get('/start', function(req, res, next) {
	res.json(SUCCESS_RESULT)
})

// кнопка сбросить
router.get('/reset_all', function(req, res, next) {
	helpers.reset()
	res.json(SUCCESS_RESULT)
})

// переключить на этап(для тестов)
router.get('/switch_stage', function(req, res, next) {
	logic.switch_stage(req.query.new_stage)
	res.json(SUCCESS_RESULT)
})

// сохранить данные о прохождении в бд
router.get('/dump_result', function(req, res, next) {
	
	request.post(
		globals.get('web_server_url') + '/api/games/create',
		{
			form: {
				operator_id: logic.get_variable('operator_id'),
				duration:    logic.get_variable('quest_time'),
				dt_start:    logic.get_variable('dt_start'),
			}
		},
		function (error, response, body) {
			if (!error && response.statusCode == 200) {
			}
		}
	)
	res.json(SUCCESS_RESULT)
})

// кнопка 'Начать игру'
router.get('/start_game', function(req, res, next) {

	res.json(SUCCESS_RESULT)

	face.field_disable('gamers_count')
	face.field_disable('operator_id')

	logic.set_variable('gamers_count', parseInt(req.query.gamers_count))
	logic.set_variable('operator_id',  req.query.operator_id)
	logic.set_variable('dt_start',     new Date())

	logic.submit_event('Нажата кнопка', 'Начать игру')

})

// нажатие обычных кнопок
router.get('/dashboard_button_pushed', function(req, res, next) {

	logic.submit_event('Нажата кнопка', req.query.title)
	res.json(SUCCESS_RESULT)

})

// проверка wd - каждую секунду счётчик wd уменьшаем на 1
// если счётчик < 0 - перестаём 
//     статус устройства - 'не определено', отображается красным
// если включена эмуляция
//     посылаем wd вручную, отображается синим
router.get('/setinterval', function(req, res, next) {

	if (globals.get('enable_watchdog')) {

		devices.intervalObject = setInterval(function() {

			for (var carrier_id in devices.list_by_carrier_id ) {
				var query = devices.build_modbus_state_query(carrier_id);
				modbus_queue.push(query);
			}

			devices.list.forEach(function (_device) {
				if (_device.wd_enabled) {
					if (_device.wd_state > 0) {
						_device.wd_state -= 1
					} else {
						_device.state = 'undef'
					}
				}

				if (_device.wd_emulate) {
					helpers.emulate_watchdog(_device)
				}
			});
		}, globals.get('watchdog_check_timer'))
	}

	res.json(SUCCESS_RESULT)

})

// вкл/выкл эмуляцию wd для устройства
router.get('/emulate_watchdog/:device_name/', function(req, res, next) {

	var device_name = req.params.device_name

	var device = devices.get(device_name)

	//вкл/выкл
	device.wd_emulate = device.wd_emulate ? 0 : 1

	res.json(SUCCESS_RESULT)
})

// Обработка кнопок
router.get('/emulate_command/:device/:command/:parameter', function(req, res, next) {
	res.json(SUCCESS_RESULT)

	var device = devices.get(req.params.device)
	var command = req.params.command
	var parameter = req.params.parameter

	mlog.simple('request from button: ' + device.name + ' ' + command + ' ' + parameter)
	mlog.dev('request from button: ' + device.name + ' ' + command + ' ' + parameter)

	var _command = device.commands[command];
	if (_command) {
		queue.push(device.name, command, parameter )
		return
	}

	logic.submit_event('Рапорт устройства', '' + device.name + '/' + command, parameter)

})

module.exports = router
