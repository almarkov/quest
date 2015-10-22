var express = require('express');
var http   = require('http');
var router = express.Router();
var child_process = require('child_process');
var fs = require('fs');
var request = require('request')

// запрос состояния модели
router.get('/all', function(req, res, next) {

	// проверяем окончание времени
	var now = new Date();
	if (gamers.start_time && gamers.game_state != 'quest_failed') {
		if ((now - gamers.start_time - 60*60*1000) > 0) {
			http.get(config.web_server_url + "/game/time_ended",
				function(res) {
					simple_log("time_ended ok");
				}).on('error', function(e) {
					simple_log("time_ended error");
			});
		}
	}

	// передача модели в GUI
	var result = {};

	result.codes = gamers.codes;


	if (gamers.start_time) {
		var now = new Date();
		var diff = gamers.start_time - now + 60*60*1000 ;
		var ms = diff % 1000;
		s  = ((diff - ms)/1000) % 60;
		m  = ((diff - ms - s* 1000)/60000) % 60;
		result.game_timer = ('0' + m).slice(-2)	+ ':' + ('0' + s).slice(-2);
	} else {
		result.game_timer = 'NA';
	}

	result.quest_error = gamers.quest_error;

	result.last_player_pass = gamers.last_player_pass;

	result.active_button = gamers.active_button;

	result.gamers_count = gamers.count;

	result.quest_completed = (gamers.game_state == 'quest_completed' ? 1 : 0);

	//result.timer_state = timers.get();

	result.devices = devices.list;


	// !!!!!! сделать адаптивно - отправлять только изменения!!!
	result.face = face.get();

	res.json(result);

});

// выключение устройств
router.get('/devices_off', function(req, res, next) {
	// выключаем устройства
	helpers.turn_off_devices();

	res.json({success: 1});
});

// включение и проверка устройств
router.get('/devices_on', function(req, res, next) {
	// включаем устройства
	helpers.turn_on_devices();

	// включаем проверку(через 2 секунды после включения)
	setTimeout(function(){
		helpers.turn_on_wd_check();

		// ещё через 5 секунд смотрим результаты
		setTimeout(function(){
			helpers.wd_check_result();
		}, 5000);

	}, 2000);

	res.json({success: 1});
});

// 'запуск' сервера
router.get('/start', function(req, res, next) {
	res.json({success: 1});
});

// кнопка сбросить
router.get('/reset_all', function(req, res, next) {

	helpers.reset();

	res.json({success: 1});
});

// переключить на этап(для тестов)
router.get('/switch_stage', function(req, res, next) {
	res.json({success: 1})
	dev_log('switch_stage by button')
	logic.switch_stage(req.query.new_stage)
})

// сохранить данные о прохождении в бд
router.get('/dump_result', function(req, res, next) {
	
	var req1 = request.post(
		config.web_server_url + '/api/games/create',
		{
			form: {
				operator_id: logic.get_variable('operator_id'),
				duration:    logic.get_variable('quest_time'),
				dt_start:    logic.get_variable('dt_start'),
			}
		},
		function (error, response, body) {
			if (!error && response.statusCode == 200) {
				console.log(body)
			}
			console.log(error)
		}
	);
	res.json({success: 1})
})


// старт игры
router.get('/start_game', function(req, res, next) {

	res.json({success: 1});
	face.field_disable('gamers_count');
	face.field_disable('operator_id');
	logic.set_variable('gamers_count', parseInt(req.query.gamers_count));
	logic.set_variable('operator_id',  req.query.operator_id);
	logic.set_variable('dt_start',  new Date());
	dev_log('start_pushed');
	logic.submit_event('Нажата кнопка', 'Начать игру');

});

router.get('/dashboard_button_pushed', function(req, res, next) {

	logic.submit_event('Нажата кнопка', req.query.title);

	res.json({success: 1});

});

// вернулись в команту 2
router.get('/close_power_wall', function(req, res, next) {

	//  закрываем дверь 8
	helpers.send_get('door_8', 'close', '0', ENABLE_TIMER, ENABLE_MUTEX);
	res.json({success: 1});

});

// время начала игры
router.get('/start_time', function(req, res, next) {
	if (gamers.start_time) {
		res.json({date: gamers.start_time.toUTCString()});
	} else {
		res.json({date: null});
	}
});

// время закончилось
router.get('/time_ended', function(req, res, next) {
	gamers.game_state = 'quest_failed';
	gamers.start_time = null;

	var command = 'open';
	helpers.send_get('door_1', command, '0', DISABLE_TIMER, ENABLE_MUTEX);
	helpers.send_get('door_2', command, '0', DISABLE_TIMER, ENABLE_MUTEX);
	helpers.send_get('door_3', command, '0', DISABLE_TIMER, ENABLE_MUTEX);
	helpers.send_get('door_5', command, '0', DISABLE_TIMER, ENABLE_MUTEX);

	setTimeout(function () {
		helpers.send_get('door_4', command, '0', DISABLE_TIMER, ENABLE_MUTEX);
		helpers.send_get('door_7', command, '0', DISABLE_TIMER, ENABLE_MUTEX);
		setTimeout(function () {
			helpers.send_get('door_6', command, '0', DISABLE_TIMER, ENABLE_MUTEX);
			helpers.send_get('door_8', command, '0', DISABLE_TIMER, ENABLE_MUTEX);
				
		}, 2*1000);
	}, 2*1000);
	res.json({result: 1});
});

// проверка wd - каждую секунду счётчик wd уменьшаем на 1
// если счётчик < 0 - перестаём 
//     статус устройства - 'не определено', отображается красным
// если включена эмуляция
//     посылаем wd вручную, отображается синим
router.get('/setinterval', function(req, res, next) {

	if (config.watchdog_enabled) {

		gamers.intervalObject = setInterval(function() {

			devices.list.forEach(function (_device) {
				if (_device.wd_enabled) {
					if (_device.wd_state > 0) {
						_device.wd_state -= 1;
					} else {
						_device.state = 'undef';
					}
				}

				if (_device.wd_emulate) {
					helpers.emulate_watchdog(_device);
				}
			});
		}, 1000);
	}

	res.json({success: 1});

});

// вкл/выкл эмуляцию wd для устройства
router.get('/emulate_watchdog/:device_name/', function(req, res, next) {

	var device_name = req.params.device_name;

	var device = devices.get(device_name);

	device.wd_emulate = device.wd_emulate ? 0 : 1;

	res.json({success: 1});
});

// Обработка кнопок
router.get('/emulate_command/:device/:command/:parameter', function(req, res, next) {
	res.json({success: 1});

	var device = devices.get(req.params.device);
	var command = req.params.command;
	var parameter = req.params.parameter;

	simple_log('request from button: ' + device.name + ' ' + command + ' ' + parameter);

	logic.submit_event('Рапорт устройства', '' + device.name + '/' + command, parameter);

});

module.exports = router;
