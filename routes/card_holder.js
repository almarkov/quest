var express = require('express');
var router = express.Router();
var http   = require('http');

router.get('/given/:parameter', function(req, res, next) {

	devices.get('card_holder').state = "given";

	// включаем видео на экране 4
	helpers.send_get('video_player_4', 'play', config.files[18], DISABLE_TIMER, ENABLE_MUTEX,
		function (params) {
			var device = devices.get('video_player_4');
			device.value = config.files[18];
			device.state = 'playing';
		},{}
	);

	res.json({success: 1});
});


//-----------------------------------------------------------------------------
// эмулятор кардхолдера
//-----------------------------------------------------------------------------
router.get('/give/:parameter', function(req, res, next) {
	res.json({success: 1});
});
router.get('/take/:parameter', function(req, res, next) {
	res.json({success: 1});
});



module.exports = router;