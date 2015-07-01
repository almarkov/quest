var express = require('express');
var router = express.Router();
var http   = require('http');

router.get('/game_passed/:code', function(req, res, next) {

	gamers.last_player_pass = 1;

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

	if (gamers.quest_state == 140) {
		gamers.quest_state = 141;

		//  открываем дверь 3
		helpers.send_get('door_3', 'open', '0', DISABLE_TIMER, ENABLE_MUTEX);

		//  открываем дверь 4 и включаем таймер
		helpers.send_get('door_4', 'open', '0', ENABLE_TIMER, ENABLE_MUTEX);
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
// активирован планшет
router.get('/activate/0', function(req, res, next) {
	res.json({success: 1});
});

// деактивирован планшет
router.get('/deactivate/0', function(req, res, next) {
	res.json({success: 1});
});


module.exports = router;