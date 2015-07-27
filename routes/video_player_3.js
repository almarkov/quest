var express = require('express');
var router = express.Router();
var http   = require('http');

//-----------------------------------------------------------------------------
// события
//-----------------------------------------------------------------------------
router.get('/playback_finished/:parameter', function(req, res, next) {

	devices.get('video_player_3').state = 'stopped';

	res.json({success: 1});

	if (gamers.game_state == 'gamers_in_restroom') {
		// включаем видео на экране 3
		helpers.send_get('video_player_3', 'play', config.video_files[11].value, DISABLE_TIMER, ENABLE_MUTEX,
			function (params) {
				var device = devices.get('video_player_3');
				device.value = config.video_files[11].alias;
				device.state = 'playing';
			},{}
		);

		gamers.set_game_state('gamers_opening_cells', '0');
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