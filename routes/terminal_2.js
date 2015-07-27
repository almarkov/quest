var express = require('express');
var router = express.Router();
var http   = require('http');

//-----------------------------------------------------------------------------
// события
//-----------------------------------------------------------------------------
router.get('/game_passed/:code', function(req, res, next) {

	gamers.last_player_pass = 1;

	if (gamers.game_state == 'gamers_gathered_to_save_outlaw') {

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

		//  открываем дверь 3
		helpers.send_get('door_3', 'open', '0', DISABLE_TIMER, ENABLE_MUTEX);

		//  открываем дверь 4 и включаем таймер
		helpers.send_get('door_4', 'open', '0', helpers.get_timeout('B'), ENABLE_MUTEX);
	}


	res.json({success: 1});
});

router.get('/game_failed/:code', function(req, res, next) {

	// включаем звук не прошёл
	helpers.send_get('audio_player_3', 'play_channel_2', config.audio_files[15].value, DISABLE_TIMER, ENABLE_MUTEX,
		function (params) {
			var device = devices.get('audio_player_3');
			device.value = config.audio_files[15].alias;
			device.state = 'ch1_play_ch2_play';
		},{}
	);

	res.json({success: 1});
});

//-----------------------------------------------------------------------------
// эмулятор планшета
//-----------------------------------------------------------------------------
router.get('/go/:parameter', function(req, res, next) {
	res.json({success: 1});
});

router.get('/black_screen/:parameter', function(req, res, next) {
	res.json({success: 1});
});


module.exports = router;