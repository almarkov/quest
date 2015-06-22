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
		var query = devices.build_query('audio_player_2', 'play_channel_2', config.files[10]);
		http.get(query, function(res) {
				console.log("Got response: " );
				res.on('data', function(data){

					devices.get('audio_player_2').value = config.files[10];
					devices.get('audio_player_2').state = "ch1_play_ch2_play";

				});
			}).on('error', function(e) {
				console.log("Got error: ");
		});

		var result = {success: 1};
		res.json(result);
	}
	
});

router.get('/code_enter_fail', function(req, res, next) {

	gamers.quest_error = 'Код введён неверно';

	var result = {success: 1};
	res.json(result);
	
});

//-----------------------------------------------------------------------------
// эмулятор планшета
//-----------------------------------------------------------------------------
// активирован планшет
router.get('/activate/0', function(req, res, next) {

	var result = {success: 1};
	res.json(result);
});

// деактивирован планшет
router.get('/deactivate/0', function(req, res, next) {

	var result = {success: 1};
	res.json(result);
});


module.exports = router;