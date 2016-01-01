var express       = require('express')
var http          = require('http')
var child_process = require('child_process')
var fs            = require('fs')
var request       = require('request')
var router        = express.Router()

// запрос состояния модели
router.get('/all', function(req, res, next) {
	//benchmarks.add('gamejs_all')
	// передача модели в GUI
	var result = {}

	result.devices = devices.list

	// сделать адаптивно - отправлять только изменения
	result.face = face.get()

	res.json(result)

})

// запрос состояния модели
router.get('/all_light', function(req, res, next) {
	//benchmarks.add('gamejs_all_light')
	// передача модели в GUI
	var result = {}

	result.devices = []
	result.face = {
		dashboard_buttons: {},
		dashboard_fields:  {},
	}

	devices.list.forEach(function (_device) {
		// if (_device.prev_value != _device.value
		// 	|| _device.prev_state != _device.state) {
		// 	result.devices.push(_device);
		// }
		result.devices.push({
			state:_device.state,
			value:_device.value,
			name: _device.name,
			states: _device.states,
			wd_emulate: _device.wd_emulate
		})
	});

	// сделать адаптивно - отправлять только изменения
	var face_d = face.get()
	for (var button_name in face_d.dashboard_buttons) {
		var button = face_d.dashboard_buttons[button_name]
		if (button.to_send) {
			button.to_send -= 1;
			result.face.dashboard_buttons[button_name] = button;
		}
	}

	for (var field_name in face_d.dashboard_fields) {
		var field = face_d.dashboard_fields[field_name]
		if (field.to_send) {
			field.to_send -= 1;
			result.face.dashboard_fields[field_name] = field;
		}
	}
	res.json(result)

})


// --------------------------------------------------------------------
// системные команды(как-то сконнектить с logic.js)
// --------------------------------------------------------------------
// выключение устройств
router.get('/devices_off', function(req, res, next) {
	//benchmarks.add('gamejs_devices_off')
	// выключаем устройства
	helpers.turn_off_devices()

	res.json(SUCCESS_RESULT)
})

// включение и проверка устройств
router.get('/devices_on', function(req, res, next) {
	//benchmarks.add('gamejs_devices_on')
	// включаем устройства
	helpers.turn_on_devices()

	// включаем проверку(через 2 секунды после включения)(тоже как-то вписать в логику)
	setTimeout(function(){
		//benchmarks.add('gamejs_devices_on_settimeout_1')
		helpers.turn_on_wd_check()

		// ещё через 5 секунд смотрим результаты
		setTimeout(function(){
			//benchmarks.add('gamejs_devices_on_settimeout_2')
			helpers.wd_check_result()
		}, 5000)

	}, 2000)

	res.json(SUCCESS_RESULT)

})

// 'запуск' сервера
router.get('/start', function(req, res, next) {
	//benchmarks.add('gamejs_start')
	res.json(SUCCESS_RESULT)
})

// кнопка сбросить
router.get('/reset_all', function(req, res, next) {
	//benchmarks.add('gamejs_reset_all')
	helpers.reset()
	res.json(SUCCESS_RESULT)
})

// переключить на этап(для тестов)
router.get('/switch_stage', function(req, res, next) {
	//benchmarks.add('gamejs_all')
	logic.switch_stage(req.query.new_stage)
	res.json(SUCCESS_RESULT)
})

// сохранить данные о прохождении в бд
router.get('/dump_result', function(req, res, next) {
	//benchmarks.add('gamejs_dump_result')
	mlog.dev('dump_result')
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
			mlog.dev('req_res')
			mlog.dev(error)
			mlog.dev(response)
			mlog.dev(body)
			if (!error && response.statusCode == 200) {
			}
		}
	)
	res.json(SUCCESS_RESULT)
})

// кнопка 'Начать игру'
router.get('/start_game', function(req, res, next) {
	//benchmarks.add('gamejs_start_game')
	res.json(SUCCESS_RESULT)

	//face.field_disable('gamers_count')
	face.field_disable('operator_id')
	face.field_disable('language')
	face.field_disable('light_type')

	//logic.set_variable('gamers_count', parseInt(req.query.gamers_count))
	logic.set_variable('operator_id',  req.query.operator_id)
	logic.set_variable('light_type',   req.query.light_type)
	logic.set_variable('language',     req.query.language)
	logic.set_variable('dt_start',     new Date())

	logic.submit_event('Нажата кнопка', 'Начать игру')

})

// нажатие обычных кнопок
router.get('/dashboard_button_pushed', function(req, res, next) {
	//benchmarks.add('gamejs_dashboard_button_pushed')
	logic.submit_event('Нажата кнопка', req.query.title)
	res.json(SUCCESS_RESULT)

})

// проверка wd - каждую секунду счётчик wd уменьшаем на 1
// если счётчик < 0 - перестаём 
//     статус устройства - 'не определено', отображается красным
// если включена эмуляция
//     посылаем wd вручную, отображается синим
router.get('/setinterval', function(req, res, next) {
	//benchmarks.add('gamejs_setinterval')
	if (globals.get('enable_watchdog')) {

		devices.wd_interval_object = setInterval(function(){
			//benchmarks.add('gamejs_devices_on_setinterval_1')
			var query = devices.modbus_state_query;
			modbus_queue.push(query);

		}, globals.get('watchdog_send_timer'))

		devices.intervalObject = setInterval(function() {
			//benchmarks.add('gamejs_devices_on_setinterval_2')
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
	//benchmarks.add('gamejs_emulate_watchdog')
	var device_name = req.params.device_name

	var device = devices.get(device_name)

	//вкл/выкл
	device.wd_emulate = device.wd_emulate ? 0 : 1

	res.json(SUCCESS_RESULT)
})

// Обработка кнопок
router.get('/emulate_command/:device/:command/:parameter', function(req, res, next) {
	//benchmarks.add('gamejs_emulate_command')
	res.json(SUCCESS_RESULT)

	var device = devices.get(req.params.device)
	var command = req.params.command
	var parameter = req.params.parameter

	// mlog.simple('request from button: ' + device.name + ' ' + command + ' ' + parameter)
	// mlog.dev('request from button: ' + device.name + ' ' + command + ' ' + parameter)

	var _command = device.commands[command];
	if (_command) {
		devices.build_and_exec_query(device.name, command, parameter )
		return
	}

	logic.submit_event('Рапорт устройства', '' + device.name + '/' + command, parameter)

})

module.exports = router
