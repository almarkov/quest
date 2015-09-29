var express = require('express');
var router = express.Router();
var http   = require('http');

//-----------------------------------------------------------------------------
// события
//-----------------------------------------------------------------------------
router.get('/code_entered/:code', function(req, res, next) {
	res.json({success: 1});

	gamers.quest_error = '';
	var player_number = parseInt(gamers.game_states['scaning_gamer'].args[0]);
	// сохраняем код
	gamers.codes[player_number-1] = req.params.code;

	// если не предпоследний игрока
	if (gamers.game_state == 'scaning_gamer') {

		gamers.dashboard_buttons.StopScan = 1;
		gamers.active_button = 'StopScan';
		if (player_number != gamers.count - 1) {

			gamers.set_game_state('scaning_not_outlaw_ended', [gamers.game_states['scaning_gamer'].args[0]]);

			// открываем дверь 4
			helpers.send_get('door_4', 'open', '0', DISABLE_TIMER, ENABLE_MUTEX, 
				function(params){
					devices.get('door_4').state = 'opened';
				}, {}
			);
			var audio_num = 8 + player_number;
			if (player_number == gamers.count) {
				audio_num = audio_num - 1;
			}
			var audio_file = config.audio_files[audio_num];
			// включаем звук на канале 2 плеера 2
			helpers.send_get('audio_player_2', 'play_channel_2', audio_file.value, DISABLE_TIMER, ENABLE_MUTEX,
				function (params) {
					var device = devices.get('audio_player_2');
					device.value = audio_file.alias;
					device.state = 'ch1_play_ch2_play';
				},{}
			);
			// бесконечное зеркало нужным цветом
			var color_num = player_number - 1;
			if (player_number == gamers.count) {
				color_num = color_num - 1;
			}
			var color = config.colors[color_num];
			helpers.send_get('inf_mirror_backlight', 'on', color, DISABLE_TIMER, ENABLE_MUTEX,
				function(params){
					var device   = devices.get('inf_mirror_backlight');
					device.value = color;
					device.state = "on";
				}, {}
			);

			//  открываем дверь 4
			// helpers.send_get('door_4', 'open', '0', helpers.get_timeout('T1'), ENABLE_MUTEX);
		} else {
			gamers.set_game_state('scaning_outlaw_ended', [gamers.game_states['scaning_gamer'].args[0]]);

			// открываем дверь 3
			helpers.send_get('door_3', 'open', '0', DISABLE_TIMER, ENABLE_MUTEX, 
				function(params){
					devices.get('door_3').state = 'opened';
				}, {}
			);
			// включаем звук на канале 2 плеера 2
			var audio_file = config.audio_files[20];
			helpers.send_get('audio_player_2', 'play_channel_2', audio_file.value, DISABLE_TIMER, ENABLE_MUTEX,
				function (params) {
					var device = devices.get('audio_player_2');
					device.value = audio_file.alias;
					device.state = 'ch1_play_ch2_play';
				},{}
			);
		}
			// //  открываем дверь 3
			// helpers.send_get('door_3', 'open', '0', helpers.get_timeout('T1'), ENABLE_MUTEX);
			// }
	}

});

router.get('/code_enter_fail', function(req, res, next) {

	gamers.quest_error = 'Код введён неверно';

	res.json({success: 1});
});

router.get('/force/:parameter', function(req, res, next) {

	helpers.send_get('terminal_1', 'go', "0", DISABLE_TIMER, ENABLE_MUTEX,
		function(params){
			devices.get('terminal_1').state = 'active';
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