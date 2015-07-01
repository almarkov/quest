var express = require('express');
var router = express.Router();
var http   = require('http');

router.get('/playback_finished/:parameter', function(req, res, next) {

	var video_player_1 = devices.get('video_player_1');
	video_player_1.state = 'stopped';

	// закончилось видео 'приготовьтесь к перелёту' после активации многогранника
	if (video_player_1.value == config.video_files[4].alias
		&& gamers.quest_state == 50) {

		// включаем видео на экране 1 звёздное небо
		helpers.send_get('video_player_1', 'play', config.video_files[3].value, DISABLE_TIMER, ENABLE_MUTEX,
			function (params) {
				var device = devices.get('video_player_1');
				device.value = config.video_files[3].alias;
				device.state = 'playing';
			},{}
		);

		gamers.quest_state = 60; //'Подготовка к перелёту';

	// видео перелёта закончилось
	} else if (gamers.quest_state == 70) {

		// включаем видео на экране 1
		helpers.send_get('video_player_1', 'play', config.video_files[6].value, DISABLE_TIMER, ENABLE_MUTEX,
			function (params) {
				var device = devices.get('video_player_1');
				device.value = config.video_files[6].alias;
				device.state = 'playing';
			},{}
		);
		gamers.quest_state = 75; // Прилетели

		// включаем свет
		helpers.send_get('light', 'on', '0', DISABLE_TIMER, ENABLE_MUTEX,
			function (params) {
				devices.get('light').state = "on";
			},{}
		);

		// выключаем вибрацию
		helpers.send_get('vibration', 'off', '0', DISABLE_TIMER, ENABLE_MUTEX,
			function (params) {
				devices.get('vibration').state = "off";
			},{}
		);
	} else if (gamers.quest_state == 75) {
		// включаем видео на экране 1 звёздное небо
		helpers.send_get('video_player_1', 'play', config.video_files[3].value, DISABLE_TIMER, ENABLE_MUTEX,
			function (params) {
				var device = devices.get('video_player_1');
				device.value = config.video_files[3].alias;
				device.state = 'playing';
			},{}
		);

		gamers.quest_state = 100; // Приглашение на сканирование

		// открываем дверь 2
		helpers.send_get('door_2', 'open', '0', ENABLE_TIMER, ENABLE_MUTEX);

		// включаем звук для номера игрока
		var audio_file = config.audio_files[gamers.quest_state%10 + 3]; 
		helpers.send_get('audio_player_1', 'play_channel_2', audio_file.value, DISABLE_TIMER, ENABLE_MUTEX,
			function(params){
				var device   = devices.get('audio_player_1');
				device.value = audio_file.alias;
				device.state = "ch1_play_ch2_stop";
			}, {}
		);
	} else if (gamers.quest_state == 140) {
		// включаем клипы
		helpers.send_get('video_player_2', 'play', config.video_files[2].value, DISABLE_TIMER, ENABLE_MUTEX,
			function (params) {
				var device = devices.get('video_player_2');
				device.value = config.video_files[2].alias;
				device.state = 'playing';
			},{}
		);

		// если последний прошёл игру
		if (gamers.last_player_pass) {
			gamers.quest_state = 141;
			//  открываем дверь 3
			helpers.send_get('door_3', 'open', '0', DISABLE_TIMER, ENABLE_MUTEX);

			//  открываем дверь 4
			helpers.send_get('door_4', 'open', '0', ENABLE_TIMER, ENABLE_MUTEX);
		} 
	} else if (gamers.quest_state == 200) {
		// включаем звук восстания
		var audio_file = config.audio_files[17]; 
		helpers.send_get('audio_player_1', 'play_channel_2', audio_file.value, DISABLE_TIMER, ENABLE_MUTEX,
			function(params){
				var device   = devices.get('audio_player_1');
				device.value = audio_file.alias;
				device.state = "ch1_play_ch2_stop";
			}, {}
		);

		// пробуждаем планшет-координаты
		helpers.send_get('terminal_4', 'go', "right=" + config.coordinates, DISABLE_TIMER, ENABLE_MUTEX,
			function (params) {
				devices.get('terminal_4').state = 'active';
			},{}
		);

		gamers.quest_state = 210; //игроки вводят координаты
	}


	// закончилось видео приглашения на сканирование
	// if (gamers.quest_state == 90) {

	// 	//открываем дверь 2
	// 	helpers.send_get('door_2', 'open', '0', ENABLE_TIMER, ENABLE_MUTEX);

	// 	gamers.quest_state = 100; // Приглашение на сканирование

	// // закончилось видео 
	// } else if (gamers.quest_state == 200) {
	// 	// пробуждаем планшет-координаты
	// 	helpers.send_get('terminal_4', 'activate', "0", DISABLE_TIMER, ENABLE_MUTEX,
	// 		function (params) {
	// 			devices.get('terminal_4').state = 'active';
	// 		},{}
	// 	);

	// 	gamers.quest_state = 210;//вводят координаты
	// }
	res.json({success: 1});
});

//-----------------------------------------------------------------------------
// эмулятор видеоплеера
//-----------------------------------------------------------------------------
router.get('/play/:parameter', function(req, res, next) {
	res.json({success: 1});
});
router.get('/stop/:parameter', function(req, res, next) {
	res.json({success: 1});
});

module.exports = router;