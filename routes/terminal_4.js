var express = require('express');
var router = express.Router();
var http   = require('http');

router.get('/cooridnates_entered/:coordinates', function(req, res, next) {

	gamers.coordinates = req.params.coordinates;

	if (gamers.coordinates == config.coordinates) {

		gamers.quest_state = 220; // подготовка к перелёту

		// включаем звук пристегните ремни
		helpers.send_get('audio_player_1', 'play_channel_2', config.files[20], DISABLE_TIMER, ENABLE_MUTEX,
			function (params) {
				var device = devices.get('audio_player_1');
				device.value = config.files[20];
				device.state = 'ch1_play_ch2_play';
			},{}
		);
	}

	res.json({success: 1});
});

//-----------------------------------------------------------------------------
// эмулятор планшета
//-----------------------------------------------------------------------------
// активирован планшет
router.get('/activate/:parameter', function(req, res, next) {
	res.json({success: 1});
});

// деактивирован планшет
router.get('/deactivate/:parameter', function(req, res, next) {
	res.json({success: 1});
});


module.exports = router;