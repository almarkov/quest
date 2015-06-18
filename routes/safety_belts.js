var express = require('express');
var router = express.Router();
var http   = require('http');

// ремни пристёгнуты
router.get('/number_of_fastened/:parameter', function(req, res, next) {

	devices.get('safety_belts').value = req.params.parameter;

	// все пристёгнуты?
	if (parseInt(gamers.count) <= parseInt(req.params.parameter)) {

		// включаем звук на канале 2 плеера 1
		var query = devices.build_query('audio_player_1', 'play_channel_2', config.files[4]);
		http.get(query, function(res) {
				console.log("Got response: " );
				res.on('data', function(data){

					devices.get('audio_player_1').value += config.files[4];
					devices.get('audio_player_1').state = "ch1_play_ch2_play";

				});
			}).on('error', function(e) {
				console.log("Got error: ");
		});

		// включаем видео на экране 2
		var query = devices.build_query('video_player_2', 'play', config.files[5]);
		http.get(query, function(res) {
				console.log("Got response: " );
				res.on('data', function(data){

					devices.get('video_player_2').state = "playing";
					devices.get('video_player_2').value = config.files[5];
					
				});
			}).on('error', function(e) {
				console.log("Got error: ");
		});

		// включаем вибрацию
		var query = devices.build_query('vibration', 'on', '0');
		http.get(query, function(res) {
				console.log("Got response: " );
				res.on('data', function(data){

					devices.get('vibration').state = "on";
					
				});
			}).on('error', function(e) {
				console.log("Got error: ");
		});

		gamers.quest_state = 70; //'Перелёт';

	}

	var result = {success: 1};
	res.json(result);

});

module.exports = router;