var express = require('express');
var router = express.Router();
var http   = require('http');

//-----------------------------------------------------------------------------
// события
//-----------------------------------------------------------------------------
router.get('/code_entered/:code', function(req, res, next) {

	gamers.quest_error = '';
	var player_number = gamers.quest_state % 10 + 1;
	// сохраняем код
	gamers.codes[player_number-1] = req.params.code;

	// если не предпоследний игрока
	if (   (gamers.quest_state / 10 | 0) == 12
		&& player_number != gamers.count - 1){
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
		var color = config.colos[color_num];
		helpers.send_get('inf_mirror_backlight', 'on', color, DISABLE_TIMER, ENABLE_MUTEX,
			function(params){
				var device   = devices.get('inf_mirror_backlight');
				device.value = color;
				device.state = "on";
			}, {}
		);

	// если предпоследний
	} else if ((gamers.quest_state / 10 | 0) == 12
		&& player_number == gamers.count - 1) {

		//  открываем дверь 3
		helpers.send_get('door_3', 'open', '0', ENABLE_TIMER, ENABLE_MUTEX);

	}

	res.json({success: 1});

});

router.get('/code_enter_fail', function(req, res, next) {

	gamers.quest_error = 'Код введён неверно';

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