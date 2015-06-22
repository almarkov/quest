var express = require('express');
var router = express.Router();
var http   = require('http');

router.get('/cooridnates_entered/:coordinates', function(req, res, next) {

	gamers.coordinates = req.params.coordinates;

	if (gamers.coordinates == config.coordinates) {
		

		gamers.quest_state = 220;

		// включаем звук пристегните ремни
		var query = devices.build_query('audio_player_1', 'play_channel_2', config.files[20]);
		http.get(query, function(res) {
				console.log("Got response: " );
				res.on('data', function(data){

					devices.get('audio_player_1').state = "ch1_play_ch2_play";
					devices.get('audio_player_1').value = config.files[20];

				});
			}).on('error', function(e) {
				console.log("Got error: ");
		});

	}

	var result = {success: 1};
	res.json(result);
	
});

router.get('/code_enter_fail', function(req, res, next) {

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