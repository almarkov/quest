var express = require('express');
var router = express.Router();
var http   = require('http');

//-----------------------------------------------------------------------------
// события
//-----------------------------------------------------------------------------
router.get('/playback_finished/:parameter', function(req, res, next) {

	var device = devices.get('video_player_2');
	device.state = 'stopped';

	res.json({success: 1});

	if (device.value == config.video_files[7].alias) {
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