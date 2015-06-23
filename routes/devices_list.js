var express = require('express');
var router = express.Router();
var http   = require('http');
//var devices = require('./devices.js');

// запрос состояния модели
router.get('/all', function(req, res, next) {

	// уменьшаем таймер
	// если таймер активен
	if (devices.timer().state == 'active') {
		var new_current_value = devices.timer().current_value - 0.5;
		// если таймер не досчитал - уменьшаем
		if (new_current_value > 0) {
			devices.timer().current_value = new_current_value;
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
			devices.timer().state         = 'ready';
			devices.timer().current_value = '';

			// отправляем событие ready
			http.get(web_server_url + "/timer/ready", function(res) {
					console.log("Got response: " );
				}).on('error', function(e) {
					console.log("Got error: ");
			});
		}
	}

	// watchdog
	if (config.watchdog_enabled) {
		for (var i = 1; i < devices.list.length; i++) {
			if (devices.list[i].id == 0) {
				var query = "http://" + devices.list[i].ip + ":" +  devices.list[i].port + "/255/0/0";
				if (!devices.list[i].mutex) {
					http.get(query, function(res) {
							res.on('data', function(data){
								//console.log("Got response on wd");
								var result = JSON.parse(data);
								if (result.success) {
									//обновить статусы устройств
									for (var j = 0; j < result.onboard_devices.length; j++) {
										var device = devices.get_by_id(result.carrier_id, result.onboard_devices[j].id);
										device.wd_state = 1;
										device.state = device.states[result.onboard_devices[j].state];
									}
								} else {
									// пометить неответившие устройства
									for (var j = 0; j < result.onboard_devices.length; j++) {
										var device = devices.get_by_id(result.carrier_id, result.onboard_devices[j].id);
										device.wd_state = 0;
										device.state = device.states[result.onboard_devices[j].state];
									}
								}
							});
						}).on('error', function(e) {
							console.log("Got error on wd");
					});
				}
			}
		}
	}

	if (gamers.quest_state == 0) {
		var next = 1;
		for (var i = 0; i < devices.list.length; i++) {
			if (!devices.list[i].wd_state) {
				next = 0;
			}
		}
		if (next) {
			gamers.quest_state = 1;
		}
	}

	// передача модели в GUI
	var result = {};
	for (var i = 0; i < devices.list.length; i++) {
		result[devices.list[i].name] = devices.list[i];
	}

	// переменные статусы
	var str = " " + gamers.quest_state + gamers.quest_states[gamers.quest_state];
	if (gamers.quest_state >= 100 && gamers.quest_state < 110) {
		str += ' Осталось просканировать ' + parseInt(gamers.count - gamers.quest_state % 10) + ' человек из ' + parseInt(gamers.count);
	}
	if (gamers.quest_state >= 110 && gamers.quest_state < 120) {
		str += ' ' + parseInt(gamers.count - gamers.quest_state % 10) + ' человек из ' + parseInt(gamers.count);
	}
	if (gamers.quest_state >= 120 && gamers.quest_state < 130) {
		str += ' ' + parseInt(gamers.quest_state % 10 + 1) + ' из ' + parseInt(gamers.count) + '. В конце сканирования требуется действие оператора – убедитесь, что игрок вышел из комнаты сканирования, после чего нажмите «Закончить сканирование» ' + parseInt(gamers.count);
	}

	result.quest_state = str;

	result.codes = gamers.codes;

	result.quest_error = gamers.quest_error;

	result.last_player_pass = gamers.last_player_pass;

	res.json(result);

});

module.exports = router;