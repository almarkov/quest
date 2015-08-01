var express = require('express');
var router = express.Router();
var http   = require('http');

//-----------------------------------------------------------------------------
// события
//-----------------------------------------------------------------------------
router.get('/game_passed/:code', function(req, res, next) {

	if (gamers.game_state == 'gamers_in_hallway') {
		gamers.game_state = 'gamers_in_powerwall_room';
		//  открываем дверь 7
		helpers.send_get('door_7', 'open', '0', DISABLE_TIMER, ENABLE_MUTEX, 
			function(params){
				devices.get('door_7').state = 'opened';
			}, {}
		);

		helpers.send_get('audio_player_4', 'play_channel_2', config.audio_files[24].value, DISABLE_TIMER, ENABLE_MUTEX,
			function(params){
				var device   = devices.get('audio_player_4');
				device.value = config.audio_files[24].alias;
				device.state = "ch1_play_ch2_play";
			}, {}
		);
	}

	res.json({success: 1});
});

router.get('/force/:parameter', function(req, res, next) {

	helpers.send_get('terminal_3', 'go', "0", DISABLE_TIMER, ENABLE_MUTEX,
		function(params){
			devices.get('terminal_3').state = 'active';
		}, {}
	);
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