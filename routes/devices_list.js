var express = require('express');
var router = express.Router();
var http   = require('http');
//var devices = require('./devices.js');

// запрос состояния конфига
router.get('/config', function(req, res, next) {
	res.json(config.list);
});

// запрос состояния модели
router.get('/all', function(req, res, next) {

	// проверяем окончание времени
	var now = new Date();
	if (gamers.start_time && gamers.game_state != 'quest_failed') {
		if ((now - gamers.start_time - 60*60*1000) > 0) {
			http.get(web_server_url + "/game/time_ended",
				function(res) {
					simple_log("time_ended ok");
				}).on('error', function(e) {
					simple_log("time_ended error");
			});
		}
	}

	// уменьшаем таймер
	// если таймер активен
	if (devices.timer().state == 'active') {
		var new_current_value = devices.timer().current_value - 1*config.wd_multiplicator;
		// если таймер не досчитал - уменьшаем
		if (new_current_value > 0) {
			devices.timer().current_value = new_current_value;
			// отправляем на сервер текущее значение
			http.get(web_server_url + "/timer/current_value/" + new_current_value.toString(),
					function(res) {
						simple_log("timer current_value: " + new_current_value.toString());
					}).on('error', function(e) {
						simple_log("timer send current_value error");
			});
		// если таймер досчитал - обнуляем, 
		} else {
			devices.timer().state         = 'ready';
			devices.timer().current_value = '';

			// отправляем событие ready
			simple_log('sending timer ready');
			http.get(web_server_url + "/timer/ready", function(res) {
					simple_log('sent timer ready');
				}).on('error', function(e) {
					simple_log('error sending ready');
			});
		}
	}

	// watchdog
	if (config.watchdog_enabled && gamers.wd_on) {

			// devices.list.forEach(function function_name (_device) {
			// 	if (_device.id == 0 && _device.wd_enabled) {
			// 		var query = "http://" + _device.ip + ":" +  _device.port + "/255/0/0";
			// 		var mutex = 0;
			// 		devices.list_by_carrier_id[_device.carrier_id].forEach(function fn(item){
			// 			mutex += item.mutex;
			// 		});
			// 		if (!mutex) {
			// 			http.get(query, function(res) {
			// 				res.on('data', function(data){
			// 					var result = JSON.parse(data);
			// 					if (result.success && result.onboard_devices) {
			// 						//обновить статусы устройств
			// 						for (var j = 0; j < result.onboard_devices.length; j++) {
			// 							var device = devices.get_by_id(result.carrier_id, result.onboard_devices[j].id);
			// 							device.wd_state = 3;
			// 							device.state = device.states[result.onboard_devices[j].state];
			// 						}
			// 					} else {
			// 						// пометить неответившие устройства
			// 						for (var j = 0; j < result.onboard_devices.length; j++) {
			// 							var device = devices.get_by_id(result.carrier_id, result.onboard_devices[j].id);
			// 							device.wd_state -= 1;
			// 							device.state = device.states[result.onboard_devices[j].state];
			// 							// перегружаем если 0
			// 							if (config.enable_reload) {
			// 								if (device.wd_state == 0) {
			// 									http.get(web_server_url + '/sendcom/reload/' + device.name, function(res) {
			// 									}).on('error', function(e) {
			// 										simple_log('error sendcom reload' + device.name);
			// 									});
			// 								}
			// 							}
			// 						}
			// 					}
			// 				});
			// 			}).on('error', function(e) {
			// 				// simple_log("watchdog error");
			// 				// devices.list_by_carrier_id[_device.carrier_id].forEach(function fn(item){
			// 				// 	item.wd_state -= 1;
			// 				// });
			// 			}).setTimeout( config.wd_error_timeout, function( ) {
			// 				simple_log("watchdog error");
			// 				simple_log(_device.ip);
			// 				devices.list_by_carrier_id[_device.carrier_id].forEach(function fn(item){
			// 					item.wd_state -= 1;
			// 				});
			// 			});


			// 		}
			// 	}
			// });
	}

	// проверка работоспосбоности
	// if (gamers.quest_state == 0) {
	// 	var flag = 1;
	// 	for (var i = 0; i < devices.list.length; i++) {
	// 		if (!devices.list[i].wd_state) {
	// 			flag = 0;
	// 		}
	// 	}
	// 	if (flag) {
	// 		gamers.quest_state = 1;
	// 	}
	// }

	// передача модели в GUI
	var result = {};
	for (var i = 0; i < devices.list.length; i++) {
		result[devices.list[i].name] = devices.list[i];
	}

	// переменные статусы
	// var player_number = gamers.quest_state % 10 + 1;
	// var str = " " + gamers.quest_state + gamers.quest_states[gamers.quest_state];
	// if (gamers.quest_state >= 100 && gamers.quest_state < 110) {
	// 	str += ' игрока ' + player_number + '. Осталось просканировать ' + (gamers.count - gamers.quest_state % 10) + ' человек из ' + (gamers.count);
	// }
	// if (gamers.quest_state >= 110 && gamers.quest_state < 120) {
	// 	str += ' ' + (gamers.count - gamers.quest_state % 10) + ' человек из ' + (gamers.count);
	// }
	// if (gamers.quest_state >= 120 && gamers.quest_state < 130) {
	// 	str += ' ' + (gamers.quest_state % 10 + 1) + ' из ' + (gamers.count) + '. В конце сканирования требуется действие оператора – убедитесь, что игрок вышел из комнаты сканирования, после чего нажмите «Закончить сканирование» ' + parseInt(gamers.count);
	// }

	result.quest_state = gamers.get_game_state();

	// result.quest_state_num = gamers.quest_state;

	result.codes = gamers.codes;

	result.quest_error = gamers.quest_error;

	result.last_player_pass = gamers.last_player_pass;

	result.active_button = gamers.active_button;

	result.gamers_count = gamers.count;



	result.dashboard_buttons = [];
	for (var button in gamers.dashboard_buttons) {
		if (gamers.dashboard_buttons[button]) {
			result.dashboard_buttons.push(button);
		}
	}


	res.json(result);

});

module.exports = router;