var express = require('express');
var router = express.Router();
var http   = require('http');

router.get('/code_entered/:code', function(req, res, next) {

	gamers.quest_error = '';

	// сохраняем код
	gamers.codes[gamers.quest_state % 10] = req.params.code;

	// если не предпоследний игрока
	if (   (gamers.quest_state / 10 | 0) == 12){

		// включаем звук на канале 2 плеера 2
		helpers.send_get('audio_player_2', 'play_channel_2', config.files[24], DISABLE_TIMER, ENABLE_MUTEX,
			function (params) {
				var device = devices.get('audio_player_2');
				device.value = config.files[24];
				device.state = 'ch1_play_ch2_play';
			},{}
		);

		res.json({success: 1});
	}

});

router.get('/code_enter_fail', function(req, res, next) {

	gamers.quest_error = 'Код введён неверно';

	res.json({success: 1});
});

//-----------------------------------------------------------------------------
// эмулятор планшета
//-----------------------------------------------------------------------------
// активирован планшет
router.get('/activate/0', function(req, res, next) {
	res.json({success: 1});
});

// деактивирован планшет
router.get('/deactivate/0', function(req, res, next) {
	res.json({success: 1});
});


module.exports = router;