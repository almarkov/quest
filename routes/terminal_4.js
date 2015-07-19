var express = require('express');
var router = express.Router();
var http   = require('http');

//-----------------------------------------------------------------------------
// события
//-----------------------------------------------------------------------------
// router.get('/coordinates_entered/:coordinates', function(req, res, next) {

// 	gamers.coordinates = req.params.coordinates;

// 	if (gamers.coordinates == config.coordinates) {

// 		gamers.quest_state = 240; // квест пройден

// 		// включаем звук квест пройден
// 		helpers.send_get('audio_player_1', 'play_channel_2', config.audio_files[18].value, DISABLE_TIMER, ENABLE_MUTEX,
// 			function (params) {
// 				var device = devices.get('audio_player_1');
// 				device.value = config.audio_files[18].alias;
// 				device.state = 'ch1_play_ch2_play';
// 			},{}
// 		);

// 		// открываем дверь 1
// 		helpers.send_get('door_1', 'open', '0', DISABLE_TIMER, ENABLE_MUTEX);
// 	}

// 	res.json({success: 1});
// });

router.get('/coordinates_entered_false/:coordinates', function(req, res, next) {

	// гасим планшет 4
	helpers.send_get('terminal_4', 'black_screen', '0', helpers.get_timeout('T5'), ENABLE_MUTEX,
		function(params){
			devices.get('terminal_4').state = 'sleep';
		}, {}
	);

	res.json({success: 1});
});

router.get('/coordinates_entered_true/:coordinates', function(req, res, next) {

	gamers.quest_state = 240; // квест пройден

	// включаем звук квест пройден
	helpers.send_get('audio_player_1', 'play_channel_2', config.audio_files[18].value, DISABLE_TIMER, ENABLE_MUTEX,
		function (params) {
			var device = devices.get('audio_player_1');
			device.value = config.audio_files[18].alias;
			device.state = 'ch1_play_ch2_play';
		},{}
	);

	// открываем дверь 1
	helpers.send_get('door_1', 'open', '0', DISABLE_TIMER, ENABLE_MUTEX);

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