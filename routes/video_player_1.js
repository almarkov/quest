var express = require('express');
var router = express.Router();
var http   = require('http');

//-----------------------------------------------------------------------------
// события
//-----------------------------------------------------------------------------
router.get('/playback_finished/:parameter', function(req, res, next) {
	res.json({success: 1});

	var video_player_1 = devices.get('video_player_1');
	video_player_1.state = 'stopped';

	// закончилось видео 'приготовьтесь к перелёту' после активации многогранника
	if (gamers.game_state == 'gamers_watching_prepare_video') {

		gamers.game_state = 'gamers_sitting_and_fasten'; //Игроки должны сесть и пристегнуться';
		// включаем видео на экране 1 звёздное небо
		helpers.send_get('video_player_1', 'play', config.video_files[3].value, DISABLE_TIMER, ENABLE_MUTEX,
			function (params) {
				var device = devices.get('video_player_1');
				device.value = config.video_files[3].alias;
				device.state = 'playing';
			},{}
		);

		if (gamers.fastened_count >= gamers.count) {
			gamers.game_state = 'playing_ready_to_flight';
			// включаем звук на канале 2 плеера 1
			helpers.send_get('audio_player_1', 'play_channel_2', config.audio_files[1].value, DISABLE_TIMER, ENABLE_MUTEX,
				function (params) {
					var device = devices.get('audio_player_1');
					device.value = config.audio_files[1].alias;
					device.state = 'ch1_play_ch2_play';
				},{}
			);
		}

	// видео перелёта закончилось
	} else if (gamers.game_state == 'flight') {

		// включаем видео на экране 1
		helpers.send_get('video_player_1', 'play', config.video_files[6].value, DISABLE_TIMER, ENABLE_MUTEX,
			function (params) {
				var device = devices.get('video_player_1');
				device.value = config.video_files[6].alias;
				device.state = 'playing';
			},{}
		);
		gamers.game_state = 'gamers_watch_video_scan_invitation'; // Прилетели

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
	} else if (gamers.game_state == 'gamers_watch_video_scan_invitation') {
		// включаем видео на экране 1 мультики
		helpers.send_get('video_player_1', 'play', config.video_files[13].value, DISABLE_TIMER, ENABLE_MUTEX,
			function (params) {
				var device = devices.get('video_player_1');
				device.value = config.video_files[13].alias;
				device.state = 'playing';
			},{}
		);

		gamers.set_game_state('scan_invitation', '1'); // Приглашение на сканирование

		// включаем звук для номера игрока
		var gamer_num = parseInt(gamers.game_states['scan_invitation'].arg) + 2;
		var audio_file = config.audio_files[gamer_num]; 
		helpers.send_get('audio_player_1', 'play_channel_2', audio_file.value, DISABLE_TIMER, ENABLE_MUTEX,
			function(params){
				var device   = devices.get('audio_player_1');
				device.value = audio_file.alias;
				device.state = "ch1_play_ch2_play";
			}, {}
		);

		gamers.dashboard_buttons.Queue = 1;
		gamers.active_button = 'Queue';
		// открываем дверь 2
		helpers.send_get('door_2', 'open', '0', helpers.get_timeout('C'), ENABLE_MUTEX); 

		

	} else if (gamers.game_state == 'gamers_returned_in_first_room') {
		gamers.game_state = 'gamers_entering_coordinates';
		// включаем звук восстания
		var audio_file = config.audio_files[17]; 
		helpers.send_get('audio_player_4', 'play_channel_2', config.audio_files[17].value, DISABLE_TIMER, ENABLE_MUTEX,
			function(params){
				var device   = devices.get('audio_player_4');
				device.value = config.audio_files[17].alias;
				device.state = "ch1_play_ch2_play";
			}, {}
		);

		
		// пробуждаем планшет-координаты
		helpers.send_get('terminal_4', 'go', "0/right=" + config.coordinates, DISABLE_TIMER, ENABLE_MUTEX,
			function (params) {
				devices.get('terminal_4').state = 'active';
			},{}
		);
	}
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