var express = require('express');
var router = express.Router();
var http   = require('http');

// сработал таймер
router.get('/ready', function(req, res, next) {
	res.json({success: 1});
	// обновляем модель
	var timer           = devices.get('timer');
	timer.state         = 'ready';
	timer.current_value = '';

	// если устройства выключичлись
	if (gamers.game_state == 'devices_off') {
		//'Устройства включаются'
		gamers.game_state = 'devices_on';

		// включаем устройства
		http.get(web_server_url + '/sendcom/on/all', function(res) {

			}).on('error', function(e) {
				simple_log('error sendcom on all');
		});

	  	http.get(devices.build_query('timer', 'activate', helpers.get_timeout("A")), function(res) {
			res.on('data', function(data){
				var result = JSON.parse(data);
				devices.get('timer').state = result.state.state;
			});
		}).on('error', function(e) {
			simple_log("timer activate error: ");
		});

		return;
	}

	// если устройства включились
	if (gamers.game_state == 'devices_on') {

		gamers.game_state = 'devices_check';

		// начинаем уменьшать через интарвал
		http.get(web_server_url + '/game/setinterval', function(res) {

			}).on('error', function(e) {
				simple_log('error game setinterval');
		});

		// devices.list.forEach(function function_name (_device) {
		// 	if (_device.id == 0 && _device.wd_enabled) {
		// 		var query = "http://" + _device.ip + ":" +  _device.port + "/255/0/0";
		// 		if (!_device.mutex) {
		// 			http.get(query, function(res) {
		// 				res.on('data', function(data){
		// 					var result = JSON.parse(data);
		// 					if (result.success && result.onboard_devices) {
		// 						//обновить статусы устройств
		// 						for (var j = 0; j < result.onboard_devices.length; j++) {
		// 							var device = devices.get_by_id(result.carrier_id, result.onboard_devices[j].id);
		// 							device.wd_state = 1;
		// 							device.state = device.states[result.onboard_devices[j].state];
		// 						}
		// 					} else {
		// 						// пометить неответившие устройства
		// 						for (var j = 0; j < result.onboard_devices.length; j++) {
		// 							var device = devices.get_by_id(result.carrier_id, result.onboard_devices[j].id);
		// 							device.wd_state = 0;
		// 							device.state = device.states[result.onboard_devices[j].state];
		// 						}
		// 					}
		// 				});
		// 			}).on('error', function(e) {
		// 				// simple_log("watchdog error");
		// 				// devices.list_by_carrier_id[_device.carrier_id].forEach(function fn(item){
		// 				// 	item.wd_state = 0;
		// 				// });
		// 			}).setTimeout( config.wd_error_timeout, function( ) {
		// 				simple_log("watchdog error");
		// 				simple_log(_device.ip);
		// 				devices.list_by_carrier_id[_device.carrier_id].forEach(function fn(item){
		// 					item.wd_state = 0;
		// 				});
		// 			});


		// 		}
		// 	}
		// });

		// проверяем через 15с
		setTimeout(function () {
			var errors = '';
			for (var i = 0; i < devices.list.length; i++) {
				if (!devices.list[i].wd_state) {
					errors += devices.list[i].name;
				}
			}
			if (errors) {
				// Сбои в работе устройств
				gamers.set_game_state('devices_error', errors);
			} else {
				// Все устройства работают нормально
				gamers.game_state = 'devices_ok';

				gamers.wd_on = 1;

				gamers.dashboard_buttons.GetReady = 1;
				gamers.dashboard_buttons.ServiceMode = 1;
			}
			
		}, helpers.get_timeout("CHECK_TIME"));

		return;
	}

	// ждали окончания подготовки
	if (gamers.game_state == 'preparation') {

		for (var i = 1; i <= 8; i++) {
			devices.get('door_' + i).state = 'closed';
		}

		for (var i = 1; i <= 5; i++) {
			devices.get('cell_' + i).state = 'closed';
		}
		for (var i = 1; i <= 4; i++) {
			devices.get('terminal_' + i).state = 'sleep';
		}
		devices.get('locker_2').state    = 'closed';

		devices.get('light').state    = 'on';
		devices.get('inf_mirror_backlight').state = 'off';
		devices.get('vibration').state    = 'off';

		// готов к запуску
		gamers.game_state = 'ready_to_go';
		gamers.dashboard_buttons.Start = 1;
		return;
	}

	// если ждали шкафа 2 в режиме обслуживания
	if (gamers.game_state == 'service_mode') {
		//Закрываем шкаф
		helpers.send_get('locker_2', 'close', '0', DISABLE_TIMER, ENABLE_MUTEX);
		devices.get('locker_2').state    = 'closed';

		return;
	}

	// если ждали закрытия двери 1
	if (gamers.game_state == 'closing_door_1') {
		devices.get('door_1').state = "closed";

		gamers.game_state = 'gamers_connecting_polyhedron'; //'Ожидание, пока игроки поставят многогранник на подставку'
		// включаем звук 'легенда'
		helpers.send_get('audio_player_1', 'play_channel_2', config.audio_files[22].value, DISABLE_TIMER, ENABLE_MUTEX,
			function(params){
				var device   = devices.get('audio_player_1');
				device.value = config.audio_files[22].alias;
				device.state = "ch1_play_ch2_stop";
			}, {}
		);
		return;
	}

	// ждали открытия двери 2
	if (gamers.game_state == 'scan_invitation') {

		gamers.dashboard_buttons.StartScan = 1;
		gamers.active_button = 'StartScan';
		return;
	}


	// если ждали пока закроется дверь 2
	if (gamers.game_state == 'scaning_gamer') {
		devices.get('door_2').state = 'closed';
		// пробуждаем планшет
		helpers.send_get('terminal_1', 'go', '0', DISABLE_TIMER, ENABLE_MUTEX,
			function(params){
				devices.get('terminal_1').state = 'active';
			}, {}
		);

		// включаем звук 'введите код'
		helpers.send_get('audio_player_2', 'play_channel_2', config.audio_files[7].value, DISABLE_TIMER, ENABLE_MUTEX,
			function(params){
				var device   = devices.get('audio_player_2');
				device.value = config.audio_files[7].alias;
				device.state = "ch1_play_ch2_stop";
			}, {}
		);

		// бесконечное зеркало переливается
		helpers.send_get('inf_mirror_backlight', 'on', 'diff', DISABLE_TIMER, ENABLE_MUTEX,
			function(params){
				var device   = devices.get('inf_mirror_backlight');
				device.value = 'diff';
				device.state = "on";
			}, {}
		);


		//gamers.quest_state += 10;//'Идет сканирование игрока X из Y. 120-129

		return;
	}

	// завершается сканирование не изгоя
	if (gamers.game_state == 'scaning_not_outlaw_ending') {

		var player_num = parseInt(gamers.game_states['scaning_not_outlaw_ending'].arg);

		if (!gamers.videos_played) {
			gamers.videos_played = 1;
			// включаем видео на экране 2
			helpers.send_get('video_player_2', 'play', config.video_files[7].value, DISABLE_TIMER, ENABLE_MUTEX,
				function (params) {
					var device = devices.get('video_player_2');
					device.value = config.video_files[7].alias;
					device.state = 'playing';
				},{}
			);
		}

		if (player_num < gamers.count) {
			

			gamers.set_game_state('scan_invitation', (player_num + 1).toString()); // Приглашение на сканирование
			// открываем дверь 2
			helpers.send_get('door_2', 'open', '0', helpers.get_timeout('C'), ENABLE_MUTEX); 

			// включаем звук для номера игрока
			var gamer_num = parseInt(gamers.game_states['scan_invitation'].arg) + 2;
			var audio_file = config.audio_files[gamer_num]; 
			helpers.send_get('audio_player_1', 'play_channel_2', audio_file.value, DISABLE_TIMER, ENABLE_MUTEX,
				function(params){
					var device   = devices.get('audio_player_1');
					device.value = audio_file.alias;
					device.state = "ch1_play_ch2_play";
				}, {}
			);
		} else {
			gamers.game_state = 'gamers_gathered_to_save_outlaw';
			if (gamers.last_player_pass) {
				// включаем звук  прошёл
				helpers.send_get('audio_player_3', 'play_channel_2', config.audio_files[16].value, DISABLE_TIMER, ENABLE_MUTEX,
					function (params) {
						var device = devices.get('audio_player_3');
						device.value = config.audio_files[16].alias;
						device.state = 'ch1_play_ch2_play';
					},{}
				);

				// зажигаем подсветку
				helpers.send_get('inf_mirror_backlight', 'on', 'blue', DISABLE_TIMER, ENABLE_MUTEX,
					function (params) {
						var device = devices.get('inf_mirror_backlight');
						device.value = 'blue';
						device.state = 'on';
					},{}
				);

				//  открываем дверь 3
				helpers.send_get('door_3', 'open', '0', DISABLE_TIMER, ENABLE_MUTEX);

				setTimeout(function () {
					//  открываем дверь 4 и включаем таймер
					helpers.send_get('door_4', 'open', '0', helpers.get_timeout('B'), ENABLE_MUTEX);

				}, 2*1000);
				gamers.game_state = 'gamers_saved_outlaw';

			}
		}

		return;
	}

	// завершается сканирование изгоя
	if (gamers.game_state == 'scaning_outlaw_ending') {

		// включаем звук на канале 2 плеера 3 (будете аннигилированы)
		helpers.send_get('audio_player_3', 'play_channel_2', config.audio_files[13].value, DISABLE_TIMER, ENABLE_MUTEX,
			function(params){
				var device   = devices.get('audio_player_3');
				device.value = config.audio_files[13].alias;
				device.state = "ch1_play_ch2_stop";
			}, {}
		);

		// || у других игроков
		var player_num = parseInt(gamers.game_states['scaning_outlaw_ending'].arg) + 1;
		gamers.set_game_state('scan_invitation', player_num.toString()); // Приглашение на сканирование

	
		// открываем дверь 2
		helpers.send_get('door_2', 'open', '0', helpers.get_timeout('C'), ENABLE_MUTEX); 

		// включаем звук для номера игрока
		var gamer_num = parseInt(gamers.game_states['scan_invitation'].arg) + 2;
		var audio_file = config.audio_files[gamer_num]; 
		helpers.send_get('audio_player_1', 'play_channel_2', audio_file.value, DISABLE_TIMER, ENABLE_MUTEX,
			function(params){
				var device   = devices.get('audio_player_1');
				device.value = audio_file.alias;
				device.state = "ch1_play_ch2_play";
			}, {}
		);

		return;
	}

	if (gamers.game_state == 'gamers_saved_outlaw') {
		gamers.game_state = 'gamers_together';
		devices.get('door_4').state = 'opened';
		devices.get('door_3').state = 'opened';
		// открываем дверь 5
		helpers.send_get('door_5', 'open', '0', helpers.get_timeout('C') + helpers.get_timeout('D'), ENABLE_MUTEX);
		return;
	}

	if (gamers.game_state == 'gamers_together') {
		gamers.game_state = 'gamers_in_restroom';

		// включаем видео на экране 3
		helpers.send_get('video_player_3', 'play', config.video_files[8].value, DISABLE_TIMER, ENABLE_MUTEX,
			function (params) {
				var device = devices.get('video_player_3');
				device.value = config.video_files[8].alias;
				device.state = 'playing';
			},{}
		);

		return;
	}

	if (gamers.game_state == 'gamers_entering_coordinates') {
		// пробуждаем планшет после неверного ввода
		helpers.send_get('terminal_4', 'go', "0/right=" + config.coordinates, DISABLE_TIMER, ENABLE_MUTEX,
			function (params) {
				devices.get('terminal_4').state = 'active';
			},{}
		);
		return;
	}
});

//-----------------------------------------------------------------------------
// эмулятор таймера
//-----------------------------------------------------------------------------
// пришло текущее значение таймера
router.get('/current_value/:value', function(req, res, next) {
	// обновляем модель
	devices.get('timer').current_value = req.params.value;

	res.json({success: 1});
});

router.get('/activate/:value', function(req, res, next) {

	var timer = devices.get('timer');
	timer.state = 'active';
	timer.value = req.params.value;
	timer.current_value = req.params.value;

	res.json({success: 1, state: timer});
	
});
//-----------------------------------------------------------------------------

module.exports = router;