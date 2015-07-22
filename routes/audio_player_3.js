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

	var device = devices.get('audio_player_3');
	// если закончился звук аннигиляции
	if (device.value == config.audio_files[13].alias) {

		// пробуждаем планшет
		helpers.send_get('terminal_2', 'go', "right=0;6;7;9;14", DISABLE_TIMER, ENABLE_MUTEX,
			function (params) {
				devices.get('terminal_2').state = 'active';
			},{}
		);

		// включаем звук на канале 2 плеера 3
		var audio_file = config.audio_files[14];
		helpers.send_get('audio_player_3', 'play_channel_2', audio_file.value, DISABLE_TIMER, ENABLE_MUTEX,
			function (params) {
				var device = devices.get('audio_player_3');
				device.value = audio_file.alias;
				device.state = 'ch1_play_ch2_play';
			},{}
		);
		
		// включаем звук для номера игрока
		// var audio_file = config.audio_files[gamers.quest_state%10 + 3]; 
		// helpers.send_get('audio_player_1', 'play_channel_2', audio_file.value, DISABLE_TIMER, ENABLE_MUTEX,
		// 	function(params){
		// 		var device   = devices.get('audio_player_1');
		// 		device.value = audio_file.alias;
		// 		device.state = "ch1_play_ch2_play";
		// 	}, {}
		// );

	// если закончился звук 'укажите квадраты'
	} else if (device.value == config.audio_files[14].alias){
		device.value = "";
		device.state = "ch1_play_ch2_stop";
	// если закончился звук неверной игры на терминале 2
	} else if (device.value == config.audio_files[15].alias){
		device.value = "";
		device.state = "ch1_play_ch2_stop";

		// пробуждаем планшет
		helpers.send_get('terminal_2', 'go', "right=0;6;7;9;14", DISABLE_TIMER, ENABLE_MUTEX,
			function (params) {
				devices.get('terminal_2').state = 'active';
			},{}
		);
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