var express = require('express');
var http   = require('http');
var router = express.Router();
var child_process = require('child_process');

// перезагрузка arduino 
router.get('/reload/:name', function(req, res, next) {
	var num = devices.get(req.params.name).carrier_id;
	child_process.exec('sendcom.exe ' + num, function(error, stdout, stderr){
		simple_log('reloaded: ' + req.params.name + ', carrier_id: ' + num);
	});
	
	res.json({success: 1});
});

// вернулись в команту 2
router.get('/close_power_wall', function(req, res, next) {

	//  закрываем дверь 8
	helpers.send_get('door_8', 'close', '0', ENABLE_TIMER, ENABLE_MUTEX);
	res.json({success: 1});

});

// стартовала игра
router.get('/start/:count', function(req, res, next) {
	if (gamers.quest_state == 5) { // квест готов к запуску

		// начинаем часовой отсчёт
		start_time = new Date();
		// фиксируем число игроков
		gamers.count = parseInt(req.params.count);

		gamers.quest_state = 10;//'Начало игры';

		//  открываем дверь 1
		helpers.send_get('door_1', 'open', '0', ENABLE_TIMER, ENABLE_MUTEX);

		gamers.quest_state = 15; //'Ожидание открытия двери 1';
	}

	res.json({success: 1});

});

// все игроки зашли в комнату
router.get('/allin', function(req, res, next) {

	gamers.quest_state = 20; //'Ожидание закрытия двери 1';
	gamers.active_button = '';

	//  закрываем дверь 1
	helpers.send_get('door_1', 'close', '0', ENABLE_TIMER, ENABLE_MUTEX);

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

// подготовка устройств
router.get('/get_ready', function(req, res, next) {

	// закрываем двери
	for (var i = 1; i <= 8; i++) {
		helpers.send_get('door_' + i, 'close', '0', DISABLE_TIMER, ENABLE_MUTEX);
	}

	// закрываем ячейки
	for (var i = 1; i <= 5; i++) {
		helpers.send_get('cell_' + i, 'close', '0', DISABLE_TIMER, ENABLE_MUTEX);
	}

	// запускаем аудио на первом канале
	helpers.send_get('audio_player_4', 'play_channel_1', config.audio_files[19].value, DISABLE_TIMER, ENABLE_MUTEX,
		function(params){
			var device = devices.get('audio_player_4');
			device.value = config.audio_files[19].alias;
			device.state = "ch1_play_ch2_stop";
		}, {}
	);
	// выключаем аудио на первом канале
	for (var i = 1; i <= 3; i++) {
		helpers.send_get('audio_player_' + i, 'stop_channel_1', '0', DISABLE_TIMER, ENABLE_MUTEX);
	}

	// выключаем аудио на втором канале
	for (var i = 1; i <= 4; i++) {
		helpers.send_get('audio_player_' + i, 'stop_channel_2', '0', DISABLE_TIMER, ENABLE_MUTEX);
	}

	// включаем экраны 1,2,3
	for (var i = 1; i <= 3; i++) {
		helpers.send_get('video_player_' + i, 'play', config.video_files[3].value, DISABLE_TIMER, ENABLE_MUTEX,
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
	helpers.send_get('inf_mirror_backlight', 'off', '0', DISABLE_TIMER, ENABLE_MUTEX);

	// выключаем подсветку статуи
	helpers.send_get('figure', 'backlight_off', '0', DISABLE_TIMER, ENABLE_MUTEX);

	// включаем свет
	helpers.send_get('light', 'on', '0', DISABLE_TIMER, ENABLE_MUTEX);

	// выключаем вибрацию
	helpers.send_get('vibration', 'off', '0', DISABLE_TIMER, ENABLE_MUTEX);

	// выключаем планешеты
	for (var i = 1; i <= 4; i++) {
		helpers.send_get('terminal_' + i, 'black_screen', '0', DISABLE_TIMER, ENABLE_MUTEX);
	}

	// сбрасываем считыватель RFID
	helpers.send_get('card_reader', 'reset', '0', DISABLE_TIMER, ENABLE_MUTEX);

	// запускаем таймер
	http.get(devices.build_query('timer', 'activate', devices.default_timer_value), function(res) {
			res.on('data', function(data){
				var result = JSON.parse(data);
				devices.get('timer').state = result.state.state;
			});
		}).on('error', function(e) {
			console.log("timer activate error: ");
	});

	gamers.quest_state = 1;

	res.json({success: 1});

});

// режим обслуживания
router.get('/service_mode', function(req, res, next) {

	// открываем двери
	for (var i = 1; i <= 8; i++) {
		helpers.send_get('door_' + i, 'open', '0', DISABLE_TIMER, ENABLE_MUTEX);
	}

	// открываем ячейки
	for (var i = 1; i <= 5; i++) {
		helpers.send_get('cell_' + i, 'open', '0', DISABLE_TIMER, ENABLE_MUTEX);
	}

	// открываем шкаф с картой
	helpers.send_get('locker_2', 'open', '0', ENABLE_TIMER, ENABLE_MUTEX);

	for (var i = 1; i <= 8; i++) {
		devices.get('door_' + i).state = 'opened';
	}
	for (var i = 1; i <= 5; i++) {
		devices.get('cell_' + i).state = 'opened';
	}
	devices.get('locker_2').state    = 'opened';

	gamers.quest_state = 2;

	res.json({success: 1});
});

// перезапуск игры
router.get('/reset', function(req, res, next) {

	start_time = null;
	devices.reset();
	gamers.reset();

	res.json({success: 1});
});

// время начала игры
router.get('/start_time', function(req, res, next) {
	if (start_time) {
		res.json({date: start_time.toUTCString()});
	} else {
		res.json({date: null});
	}
});

// точка сбора(для тестов)
router.get('/point1', function(req, res, next) {

	gamers.quest_state = 141;

	gamers.codes[0] = '111';
	gamers.codes[1] = '222';
	gamers.codes[2] = '333';
	gamers.codes[3] = '444';
	gamers.codes[4] = '735';

	// закрываем дверь 1
	helpers.send_get('door_1', 'close', '0', DISABLE_TIMER, ENABLE_MUTEX);
	devices.get('door_1').state = 'closed';

	// открываем дверь 3
	helpers.send_get('door_3', 'open', '0', DISABLE_TIMER, ENABLE_MUTEX);

	// открываем дверь 4
	helpers.send_get('door_4', 'open', '0', ENABLE_TIMER, ENABLE_MUTEX);

	res.json({success: 1});
});

module.exports = router;
