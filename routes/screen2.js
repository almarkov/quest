var express = require('express');
var router = express.Router();
var http   = require('http');

router.get('/stopped/:parameter', function(req, res, next) {

	devices.get('screen2').state = 'stop';

	var result = {success: 1};
	res.json(result);

	// видео перелёта закончилось
	if (gamers.quest_state == 70) {
		gamers.quest_state = 80; // Стыковка

		// включаем звук прибытия на станцию
		var query = devices.ext_url_for('audio_controller') + "/" +  config.get_command_id('play') + "/0";
		http.get(query, function(res) {
				console.log("Got response: " );
				res.on('data', function(data){

					devices.get('audio_controller').state = "playing";

				});
			}).on('error', function(e) {
				console.log("Got error: ");
		});

		// включаем видео на экране 2
		var query = devices.ext_url_for('screen2') + "/" +  config.get_command_id('play') + "/file=\/storage\/emulated\/0\/Video\/5.mp4";
		http.get(query, function(res) {
				console.log("Got response: " );
				res.on('data', function(data){

					devices.get('screen2').state = "playing";
					
				});
			}).on('error', function(e) {
				console.log("Got error: ");
		});
	// видео прибытия ещё не закончилось, а аудио - закончилось
	} else if (gamers.quest_state == 80) {
		gamers.quest_state = 85; // Стыковка(фикт)

	// закончилось и то и то
	} else if (gamers.quest_state == 85) {
		// включаем звук  стыковки
		var query = devices.ext_url_for('audio_controller') + "/" +  config.get_command_id('play') + "/0";
		http.get(query, function(res) {
				console.log("Got response: " );
				res.on('data', function(data){

					devices.get('audio_controller').state = "playing";

				});
			}).on('error', function(e) {
				console.log("Got error: ");
		});
		gamers.quest_state = 90; // стыковка фикт
	}

	

});


//-----------------------------------------------------------------------------
// эмулятор 'экрана'
//-----------------------------------------------------------------------------
router.get('/play/:parameter', function(req, res, next) {
	var result = {success: 1};
	res.json(result);
});

module.exports = router;