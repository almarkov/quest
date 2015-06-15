var express = require('express');
var router = express.Router();
var http   = require('http');

// ремни пристёгнуты
router.get('/fasten/:parameter', function(req, res, next) {

	devices.get('chairs').state = "fasten";
	var result = {success: 1};
	res.json(result);

	// включаем звук
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
	var query = devices.ext_url_for('screen2') + "/" +  config.get_command_id('play') + "/file=\/storage\/emulated\/0\/Video\/4.mp4";
	http.get(query, function(res) {
			console.log("Got response: " );
			res.on('data', function(data){

				devices.get('screen2').state = "playing";
				
			});
		}).on('error', function(e) {
			console.log("Got error: ");
	});

	// включаем вибрацию
	var query = devices.ext_url_for('chairs') + "/" +  config.get_command_id('vibrate') + "/0";
	http.get(query, function(res) {
			console.log("Got response: " );
			res.on('data', function(data){

				devices.get('chairs').state = "vibrating";
				
			});
		}).on('error', function(e) {
			console.log("Got error: ");
	});

	gamers.quest_state = 70; //'Перелёт';


});


// эмуляция кресла 
router.get('/vibrate/:parameter', function(req, res, next) {
	var result = {success: 1};
	res.json(result);

});
router.get('/stop_vibrate/:parameter', function(req, res, next) {
	var result = {success: 1};
	res.json(result);
});

module.exports = router;