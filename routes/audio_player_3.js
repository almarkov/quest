var express = require('express');
var router = express.Router();
var http   = require('http');

router.get('/ch1_playback_finished/:parameter', function(req, res, next) {
	res.json({success: 1});
});


router.get('/ch2_playback_finished/:parameter', function(req, res, next) {
	res.json({success: 1});

	var device = devices.get('audio_player_3');
	// если закончился звук аннигиляции
	if (device.value == config.files[13]) {

		// включаем звук на канале 2 плеера 3
		helpers.send_get('audio_player_3', 'play_channel_2', config.files[14], DISABLE_TIMER, ENABLE_MUTEX,
			function (params) {
				var device = devices.get('audio_player_3');
				device.value = config.files[14];
				device.state = 'ch1_play_ch2_play';
			},{}
		);

	// если закончился звук 'укажите квадраты'
	} else if (device.value == config.files[14]){
		device.value = "";
		device.state = "ch1_play_ch2_stop";
		// пробуждаем планшет
		helpers.send_get('terminal_2', 'activate', "right=1;2;3;5", DISABLE_TIMER, ENABLE_MUTEX,
			function (params) {
				devices.get('terminal_2').state = 'active';
			},{}
		);
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