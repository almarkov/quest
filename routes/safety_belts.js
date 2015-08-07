var express = require('express');
var router = express.Router();
var http   = require('http');

//-----------------------------------------------------------------------------
// события
//-----------------------------------------------------------------------------
router.get('/number_of_fastened/:parameter', function(req, res, next) {

	devices.get('safety_belts').value = req.params.parameter;

	// все пристёгнуты?
	gamers.fastened_count = parseInt(req.params.parameter);
	if (gamers.count <= gamers.fastened_count) {

		// если подготовка к перелёту(1)
		if (gamers.game_state == 'gamers_sitting_and_fasten') {
			gamers.game_state = 'playing_ready_to_flight';
			// включаем звук на канале 2 плеера 1
			helpers.send_get('audio_player_1', 'play_channel_2', config.audio_files[1].value, DISABLE_TIMER, ENABLE_MUTEX,
				function (params) {
					var device = devices.get('audio_player_1');
					device.value = config.audio_files[1].alias;
					device.state = 'ch1_play_ch2_play';
				},{}
			);
		}
	}

	res.json({success: 1});

});

module.exports = router;