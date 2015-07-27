var express = require('express');
var router = express.Router();
var http   = require('http');

//-----------------------------------------------------------------------------
// события
//-----------------------------------------------------------------------------
router.get('/ch1_playback_finished/:parameter', function(req, res, next) {
	res.json({success: 1});
});

router.get('/ch2_playback_finished/:parameter', function(req, res, next) {
	res.json({success: 1});

	var device = devices.get('audio_player_4');
	device.state = "ch1_play_ch2_stop";
	device.value = config.audio_files[19].alias;

	if (gamers.game_state == 'gamers_returned_in_first_room') {

		// включаем видео 'dвам угрожает опасность' на экране 1
		helpers.send_get('video_player_1', 'play', config.video_files[9].value, DISABLE_TIMER, ENABLE_MUTEX,
			function (params) {
				var device = devices.get('video_player_1');
				device.value = config.video_files[9].alias;
				device.state = 'playing';
			},{}
		);
		// включаем звук восстания
		// var audio_file = config.audio_files[17]; 
		// helpers.send_get('audio_player_4', 'play_channel_2', audio_file.value, DISABLE_TIMER, ENABLE_MUTEX,
		// 	function(params){
		// 		var device   = devices.get('audio_player_4');
		// 		device.value = audio_file.alias;
		// 		device.state = "ch1_play_ch2_play";
		// 	}, {}
		// );

		
		// // пробуждаем планшет-координаты
		// helpers.send_get('terminal_4', 'go', "0/right=" + config.coordinates, DISABLE_TIMER, ENABLE_MUTEX,
		// 	function (params) {
		// 		devices.get('terminal_4').state = 'active';
		// 	},{}
		// );

		//gamers.quest_state = 210; //игроки вводят координаты
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