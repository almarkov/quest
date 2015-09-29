var express = require('express');
var http   = require('http');
var router = express.Router();
var child_process = require('child_process');
var fs = require('fs');

// полный сброс
router.get('/reset', function(req, res, next) {

	// сбрасываем параметры
	face.reset();
 	devices.reset();
	gamers.reset();
	queue.reset();

	// выключаем устройства
	helpers.turn_off_devices();

  	gamers.set_game_state('devices_off', []);
  	timers.start(helpers.get_timeout("A"));

	// удаляем старые файлы лога
	var log_files = fs.readdirSync('log');
	for (var i = 0; i < log_files.length - 2; i++) {
		fs.unlinkSync('log/' + log_files[i]);
	}

	res.json({success: 1});
});

// старт игры
router.get('/start/:count', function(req, res, next) {
	if (gamers.game_state == 'ready_to_go') { // квест готов к запуску

		face.button_disable('start');
		face.button_disable('get_ready');

		// начинаем часовой отсчёт
		gamers.start_time = new Date();
		// фиксируем число игроков
		gamers.count = parseInt(req.params.count);

		gamers.game_state = 'opening_door_1_and_waiting';

		//  открываем дверь 1
		helpers.send_get('door_1', 'open', '0', DISABLE_TIMER, ENABLE_MUTEX, 
			function(params){
				devices.get('door_1').state = 'opened';
			}, {}
		);

		face.button_enable('all_in');
		face.button_highlight_on('all_in');
	}

	res.json({success: 1});

});

// вернулись в команту 2
router.get('/close_power_wall', function(req, res, next) {

	//  закрываем дверь 8
	helpers.send_get('door_8', 'close', '0', ENABLE_TIMER, ENABLE_MUTEX);
	res.json({success: 1});

});

// все игроки зашли в комнату
router.get('/allin', function(req, res, next) {

	gamers.game_state = 'closing_door_1'; //'Ожидание закрытия двери 1';
	gamers.active_button = '';
	gamers.dashboard_buttons.AllIn = 0;

	//  закрываем дверь 1
	helpers.send_get('door_1', 'close', '0', helpers.get_timeout('B'), ENABLE_MUTEX);

	res.json({success: 1});

});

// 'в очередь' 
router.get('/queue', function(req, res, next) {

	helpers.send_get('audio_player_1', 'play_channel_2', config.audio_files[8].value, DISABLE_TIMER, ENABLE_MUTEX,
		function(params){
			var device   = devices.get('audio_player_1');
			device.value = config.audio_files[8].alias;
			device.state = "ch1_play_ch2_stop";
		}, {}
	);

	helpers.send_get('audio_player_2', 'play_channel_2', config.audio_files[8].value, DISABLE_TIMER, ENABLE_MUTEX,
		function(params){
			var device   = devices.get('audio_player_2');
			device.value = config.audio_files[8].alias;
			device.state = "ch1_play_ch2_stop";
		}, {}
	);

	res.json({success: 1});

});


// 'подсказка по многограннику' 
router.get('/polyhedron_prompt', function(req, res, next) {

	// включаем видео на экране 1
	helpers.send_get('video_player_1', 'play', config.video_files[10].value, DISABLE_TIMER, ENABLE_MUTEX,
		function (params) {
			var device = devices.get('video_player_1');
			device.value = config.video_files[10].alias;
			device.state = 'playing';
		},{}
	);

	gamers.dashboard_buttons.PolyhedronPrompt = 0;
	gamers.active_button = '';

	res.json({success: 1});

});

// подготовка устройств
router.get('/get_ready', function(req, res, next) {

	gamers.set_game_state('preparation', []);

	for (var i = 1; i <= 8; i++) {
		queue.push('door_' + i, 'close', '0', DISABLE_TIMER);
	}

	// закрываем ячейки
	for (var i = 1; i <= 5; i++) {
		queue.push('cell_' + i, 'close', '0', DISABLE_TIMER);
	}

	// запускаем аудио на первом канале
	queue.push('audio_player_4', 'play_channel_1', config.audio_files[19].value, DISABLE_TIMER,
		function(params){
			var device = devices.get('audio_player_4');
			device.value = config.audio_files[19].alias;
			device.state = "ch1_play_ch2_stop";
		}, {}
	);
	// выключаем аудио на первом канале
	for (var i = 1; i <= 3; i++) {
		queue.push('audio_player_' + i, 'stop_channel_1', '0', DISABLE_TIMER);
	}

	// выключаем аудио на втором канале
	for (var i = 1; i <= 4; i++) {
		queue.push('audio_player_' + i, 'stop_channel_2', '0', DISABLE_TIMER);
	}

	// включаем экраны 1,2,3
	for (var i = 1; i <= 3; i++) {
		queue.push('video_player_' + i, 'play', config.video_files[3].value, DISABLE_TIMER,
			function(params){
				var device = devices.get('video_player_' + params.index);
				device.value = config.video_files[3].alias;
				device.state = 'playing';
			}, 
			{
				index: i
			}
		);
	}

	// выключаем подсветку
	queue.push('inf_mirror_backlight', 'off', '0', DISABLE_TIMER);

	// включаем подсветку статуи
	queue.push('figure', 'backlight_on', '0', DISABLE_TIMER);

	// включаем свет
	queue.push('light', 'on', '0', DISABLE_TIMER);

	// выключаем вибрацию
	queue.push('vibration', 'off', '0', DISABLE_TIMER);

	// выключаем планешеты
	for (var i = 1; i <= 4; i++) {
		queue.push('terminal_' + i, 'black_screen', '0', DISABLE_TIMER);
	}

	// сбрасываем считыватель RFID
	queue.push('card_reader', 'reset', '0', DISABLE_TIMER);

	timers.start(helpers.get_timeout('B'));

	res.json({success: 1});

});

// режим обслуживания
router.get('/service_mode', function(req, res, next) {

	//  режим обслуживания
	gamers.set_game_state('service_mode', []);

	// открываем двери
	for (var i = 1; i <= 8; i++) {
		queue.push('door_' + i, 'open', '0', DISABLE_TIMER);
	}

	// открываем ячейки
	for (var i = 1; i <= 5; i++) {
		queue.push('cell_' + i, 'open', '0', DISABLE_TIMER);
	}

	// открываем шкаф с картой
	queue.push('locker_2', 'open', '0', 2);

	for (var i = 1; i <= 8; i++) {
		devices.get('door_' + i).state = 'opened';
	}
	for (var i = 1; i <= 5; i++) {
		devices.get('cell_' + i).state = 'opened';
	}
	devices.get('locker_2').state    = 'opened';

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

//открыть.закрыть двери
router.get('/doors/:command', function(req, res, next) {
	
	var command = req.params.command;


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



// точка сбора(для тестов)
router.get('/point1', function(req, res, next) {

	gamers.game_state = 'gamers_saved_outlaw';

	gamers.codes[0] = '111';
	gamers.codes[1] = '222';
	gamers.codes[2] = '333';
	gamers.codes[3] = '444';
	gamers.codes[4] = '735';

	// включаем звук  прошёл
	helpers.send_get('audio_player_3', 'play_channel_2', config.audio_files[16].value, DISABLE_TIMER, ENABLE_MUTEX,
		function (params) {
			var device = devices.get('audio_player_3');
			device.value = config.audio_files[16].alias;
			device.state = 'ch1_play_ch2_play';
		},{}
	);

	// зажигаем подсветку
	helpers.send_get('inf_mirror_backlight', 'on', 'blue', DISABLE_TIMER, ENABLE_MUTEX,
		function (params) {
			var device = devices.get('inf_mirror_backlight');
			device.value = 'blue';
			device.state = 'on';
		},{}
	);

	// закрываем дверь 1
	helpers.send_get('door_1', 'close', '0', DISABLE_TIMER, ENABLE_MUTEX);
	devices.get('door_1').state = 'closed';

	// открываем дверь 3
	helpers.send_get('door_3', 'open', '0', DISABLE_TIMER, ENABLE_MUTEX);

	// открываем дверь 4
	helpers.send_get('door_4', 'open', '0', ENABLE_TIMER, ENABLE_MUTEX);

	res.json({success: 1});
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
					if (_device.wd_state) {
						_device.wd_state -= 1;
					};
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

	if (var _command = device.commands[command]) {
		var url = "http://"
					+ device.ip + ":"
					+ device.port + "/" 
					+ device.id + "/"
					+ _command.code + "/"
					+ parameter;
		helpers.send_get_with_timeout(device, url, 3, 500);
	}
	if (var _event = device.events[command]) {
		var url =  config.web_server_url + '/' + device.name + '/'+ command + '/' + parameter;
		http.get(url, function(res) {
				res.on('data', function(data){
				});
				res.on('error', function(data){
				});
			}).on('error', function(e) {
				simple_log("get after emulate_command " + device.name +  " " + url + " error");
		});
	}
});

module.exports = router;
