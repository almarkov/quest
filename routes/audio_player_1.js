var express = require('express');
var router = express.Router();
var http   = require('http');

//-----------------------------------------------------------------------------
// события
//-----------------------------------------------------------------------------
router.get('/ch1_playback_finished/:parameter', function(req, res, next) {
	res.json({success: 1});
});

router.get('/ch2_playback_finished/:parameter', function(req, res, next) {

	var device = devices.get('audio_player_1');
	device.state = "ch1_play_ch2_stop";
	device.value = config.audio_files[19].alias;

	res.json({success: 1});

	// подготовка к перелёту
	if (gamers.game_state == 'playing_ready_to_flight') {

		//приглушаем свет
		helpers.send_get('light', 'off', '0', DISABLE_TIMER, ENABLE_MUTEX,
			function (params) {
				devices.get('light').state = "off";
			},{}
		);
		// включаем видео на экране 1
		helpers.send_get('video_player_1', 'play', config.video_files[5].value, DISABLE_TIMER, ENABLE_MUTEX,
			function (params) {
				var device = devices.get('video_player_1');
				device.value = config.video_files[5].alias;
				device.state = 'playing';
			},{}
		);

		// включаем вибрацию
		helpers.send_get('vibration', 'on', '0', DISABLE_TIMER, ENABLE_MUTEX,
			function (params) {
				devices.get('vibration').state = "on";
			},{}
		);

		gamers.game_state = 'flight'; //'Перелёт';
	}
});


//-----------------------------------------------------------------------------
// эмулятор аудиоплеера
//-----------------------------------------------------------------------------
router.get('/play_channel_1/:parameter', function(req, res, next) {
	res.json({success: 1});
});

router.get('/play_channel_2/:parameter', function(req, res, next) {
	res.json({success: 1});
});

router.get('/stop_channel_1/:parameter', function(req, res, next) {
	res.json({success: 1});
});

router.get('/stop_channel_2/:parameter', function(req, res, next) {
	res.json({success: 1});
});

module.exports = router;