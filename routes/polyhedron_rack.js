var express = require('express');
var router = express.Router();
var http   = require('http');

// активирована подставка
router.get('/activated/:parameter', function(req, res, next) {

	devices.get('polyhedron_rack').state = 'active';

	//выключаем свет
	var query = devices.ext_url_for('light') + "/" +  config.get_command_id('turn_off') + "/0";
	http.get(query, function(res) {
			console.log("Got response: " );
			res.on('data', function(data){

				devices.get('light').state = "off";

			});
		}).on('error', function(e) {
			console.log("Got error: ");
	});

	// включаем видео на экране 2
	var query = devices.ext_url_for('screen2') + "/" +  config.get_command_id('play') + "/file=\/storage\/emulated\/0\/Video\/2.mp4";
	http.get(query, function(res) {
			console.log("Got response: " );
			res.on('data', function(data){

				devices.get('screen2').state = "playing";
				
			});
		}).on('error', function(e) {
			console.log("Got error: ");
	});

	// включаем видео на экране 1
	var query = devices.ext_url_for('screen1') + "/" +  config.get_command_id('play') + "/file=\/storage\/emulated\/0\/Video\/3.mp4";
	http.get(query, function(res) {
			console.log("Got response: " );
			res.on('data', function(data){

				devices.get('screen1').state = "playing";

			});
		}).on('error', function(e) {
			console.log("Got error: ");
	});

	gamers.quest_state = 60; //'Подготовка к перелёту';

	var result = {success: 1};
	res.json(result);
});

// активирована подставка
router.get('/deactivated/:parameter', function(req, res, next) {

	var result = {success: 1};
	res.json(result);
});

module.exports = router;