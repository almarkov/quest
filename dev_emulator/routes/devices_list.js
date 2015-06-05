var express = require('express');
var router = express.Router();
var http   = require('http');

router.get('/reset', function(req, res, next) {
	devices.reset();

	var result = {success: 1};
	res.json(result);
});

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

	res.json(devices);
});

module.exports = router;
