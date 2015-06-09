var express = require('express');
var router = express.Router();
var http   = require('http');
//var devices = require('./devices.js');

// запрос состояния модели
router.get('/all', function(req, res, next) {

	// уменьшаем таймер
	// если таймер активен
	if (devices._timer.state == 'active') {
		var new_current_value = devices._timer.current_value - 0.5;
		// если таймер не досчитал - уменьшаем
		if (new_current_value > 0) {
			devices._timer.current_value = new_current_value;
			// отправляем на сервер текущее значение
			http.get(web_server_url + "/timer/current_value/" + new_current_value.toString(),
					function(res) {
						console.log("Got response: " );
					}).on('error', function(e) {
						console.log("Got error: ");
			});
		// если таймер досчитал - обнуляем, 
		} else {
			console.log('sending ready');
			devices._timer.state         = 'ready';
			devices._timer.current_value = '';

			// отправляем событие ready
			http.get(web_server_url + "/timer/ready", function(res) {
					console.log("Got response: " );
				}).on('error', function(e) {
					console.log("Got error: ");
			});
		}
	}

	// передача модели в GUI
	var result = devices;

	var str = gamers.quest_states[gamers.quest_state];
	if (gamers.quest_state > 110 && gamers.quest_state < 120) {
		str += ' ' + parseInt(gamers.count - gamers.quest_state % 10) + ' человек';
	}

	result.quest_state = str;

	result.codes = gamers.codes;

	result.quest_error = gamers.quest_error;

	res.json(result);

});

module.exports = router;