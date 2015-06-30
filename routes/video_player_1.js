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

		открываем дверь 2
		helpers.send_get('door_2', 'open', '0', ENABLE_TIMER, ENABLE_MUTEX);
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