var express = require('express');
var router = express.Router();
var http   = require('http');

//-----------------------------------------------------------------------------
// события
//-----------------------------------------------------------------------------
router.get('/power_ok/:code', function(req, res, next) {

	if (gamers.quest_state == 190) {
		devices.get('power_wall').state = 'passed';
		//  открываем дверь 8
		helpers.send_get('door_8', 'open', '0', DISABLE_TIMER, ENABLE_MUTEX,
			function(params){
				devices.get('door_8').state = 'opened';
			}, {}
		);

		// включаем звук на канале 2 плеера 4 
		helpers.send_get('audio_player_4', 'play_channel_2', config.audio_files[21].value, DISABLE_TIMER, ENABLE_MUTEX,
			function(params){
				var device   = devices.get('audio_player_4');
				device.value = config.audio_files[21].alias;
				device.state = "ch1_play_ch2_stop";
			}, {}
		);
		gamers.quest_state = 200; // Игроки вернулись в комнату 2
	}

	res.json({result: 1});
});

module.exports = router;