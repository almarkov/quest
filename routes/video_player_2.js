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