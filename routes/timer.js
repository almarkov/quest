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

		devices.list.forEach(function function_name (_device) {
			if (_device.id == 0 && _device.wd_enabled) {
				var query = "http://" + _device.ip + ":" +  _device.port + "/255/0/0";
				if (!_device.mutex) {
					var request = http.get(query, function(res) {
							res.on('data', function(data){
								var result = JSON.parse(data);
								if (result.success && result.onboard_devices) {
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
							simple_log("watchdog error");
							_device.wd_state = 0;
					});
					request.setTimeout( 3000, function( ) {
						simple_log("watchdog error");
					    simple_log(_device.ip);
					    _device.wd_state = 0;
					});


				}
			}
		});

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

				gamers.dashboard_buttons.GetReady = 1;
				gamers.dashboard_buttons.ServiceMode = 1;
			}
			
		}, 15*1000);

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

	// // если ждали открытия двери 2
	// if (gamers.quest_state >= 100 && gamers.quest_state < 110) {
	// 	devices.get('door_2').state = 'opened';

	// 	// включаем звук для номера игрока
	// 	var audio_file = config.audio_files[gamers.quest_state%10 + 3]; 
	// 	helpers.send_get('audio_player_1', 'play_channel_2', audio_file.value, DISABLE_TIMER, ENABLE_MUTEX,
	// 		function(params){
	// 			var device   = devices.get('audio_player_1');
	// 			device.value = audio_file.alias;
	// 			device.state = "ch1_play_ch2_play";
	// 		}, {}
	// 	);

	// 	gamers.active_button = 'StartScan';
	// 	gamers.quest_state  += 10; //'Требуется действие оператора. Убедитесь, что в комнате сканирования только один человек';

	// 	return;
	// }

	// если ждали пока закроется дверь 2
	if (gamers.game_state == 'scan_invitation') {
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

	if (gamers.game_state == 'scaning_not_outlaw_ending') {
		return;
	}

	if (gamers.game_state == 'scaning_outlaw_ending') {
		return;
	}

	// если ждали пока откроется дверь 3 (предпоследний)
	if (gamers.quest_state >= 120 && gamers.quest_state < 130
		&& gamers.quest_state % 10 == gamers.count-2) {
		devices.get('door_3').state = 'opened';

		gamers.quest_state += 10; //'Игрко X прощёл сканирование игрока X из Y. 130-139
		gamers.active_button = "StopScan";

		return;
	}

	// если ждали пока закроется дверь 3 (предпоследний)
	if (gamers.quest_state >= 130 && gamers.quest_state < 140
		&& gamers.quest_state % 10 == gamers.count-2) {

		devices.get('door_3').state = 'closed';

		// гасим планшет 1
		helpers.send_get('terminal_1', 'black_screen', '0', DISABLE_TIMER, ENABLE_MUTEX,
			function(params){
				var device   = devices.get('terminal_1');
				device.state = "sleep";
			}, {}
		);

		// включаем звук на канале 2 плеера 3 (будете аннигилированы)
		helpers.send_get('audio_player_3', 'play_channel_2', config.audio_files[13].value, DISABLE_TIMER, ENABLE_MUTEX,
			function(params){
				var device   = devices.get('audio_player_3');
				device.value = config.audio_files[13].alias;
				device.state = "ch1_play_ch2_stop";
			}, {}
		);

		// || у других игроков
		gamers.quest_state -= 30;
		gamers.quest_state += 1;

		//открываем дверь 2
		helpers.send_get('door_2', 'open', '0', helpers.get_timeout('T2'), ENABLE_MUTEX);

		return;
	}


	// если ждали пока откроется дверь 4 (не предпоследний)
	if (gamers.quest_state >= 120 && gamers.quest_state < 130
		&& gamers.quest_state % 10 != gamers.count-2) {
		devices.get('door_4').state = 'opened';

		gamers.quest_state += 10; //'Игрко X прощёл сканирование игрока X из Y. 130-139
		gamers.active_button = "StopScan";

		return;
	}


	// если ждали пока закроется дверь 4 (не предпоследний)
	if (gamers.quest_state >= 130 && gamers.quest_state < 140
		&& gamers.quest_state % 10 != gamers.count-2) {
		devices.get('door_4').state = 'closed';

		// тушим подсветку
		helpers.send_get('inf_mirror_backlight', 'off', '0', DISABLE_TIMER, ENABLE_MUTEX,
			function(params){
				var device   = devices.get('inf_mirror_backlight');
				device.value = '';
				device.state = "off";
			}, {}
		);

		// гасим планшет 1
		helpers.send_get('terminal_1', 'black_screen', '0', DISABLE_TIMER, ENABLE_MUTEX,
			function(params){
				var device   = devices.get('terminal_1');
				device.state = "sleep";
			}, {}
		);

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

		// если последний
		if (gamers.quest_state % 10  == gamers.count - 1 ) {

			gamers.quest_state = 140; //Сканирование закончено. Игроки должны спасти коллегу, попавшего в комнату аннигиляции
		
			// включаем видео на экране 2
			// helpers.send_get('video_player_2', 'play', config.video_files[7].value, DISABLE_TIMER, ENABLE_MUTEX,
			// 	function (params) {
			// 		var device = devices.get('video_player_2');
			// 		device.value = config.video_files[7].alias;
			// 		device.state = 'playing';
			// 	},{}
			// );
		
		// если не последний
		} else {
			gamers.quest_state -= 30;
			gamers.quest_state += 1;

			//открываем дверь 2
			helpers.send_get('door_2', 'open', '0', helpers.get_timeout('T2'), ENABLE_MUTEX);

			// включаем звук для номера игрока
			var audio_file = config.audio_files[gamers.quest_state%10 + 3]; 
			helpers.send_get('audio_player_1', 'play_channel_2', audio_file.value, DISABLE_TIMER, ENABLE_MUTEX,
				function(params){
					var device   = devices.get('audio_player_1');
					device.value = audio_file.alias;
					device.state = "ch1_play_ch2_stop";
				}, {}
			);
		}

		return;
	}

	// если ждали пока откроются дверь 4 и 3  - переходим к дворцу благоденсвтия
	if (gamers.quest_state == 141) {
		devices.get('door_4').state = 'opened';
		devices.get('door_3').state = 'opened';

		gamers.quest_state = 142;

		// открываем дверь 5
		helpers.send_get('door_5', 'open', '0', ENABLE_TIMER, ENABLE_MUTEX);

		return;
	}

	// ждали открытия  ядвери 5
	if (gamers.quest_state == 142) {
		devices.get('door_5').state = "opened";

		setTimeout(function () {

			// закрываем дверь 3
			helpers.send_get('door_3', 'close', '0', DISABLE_TIMER, ENABLE_MUTEX);

			gamers.quest_state = 150;

			// включаем видео на экране 3
			helpers.send_get('video_player_3', 'play', config.video_files[8].value, DISABLE_TIMER, ENABLE_MUTEX,
				function (params) {
					var device = devices.get('video_player_3');
					device.value = config.video_files[8].alias;
					device.state = 'playing';
				},{}
			);
		}, helpers.get_timeout('T4')*1000);
		return;
	}

	// ждали открытия  ядвери 6
	if (gamers.quest_state == 170) {
		devices.get('door_6').state = "opened";
		gamers.quest_state = 180;

		// // выключаем дым-машину
		// helpers.send_get('smoke', 'off', '0', DISABLE_TIMER, ENABLE_MUTEX);

		// пробуждаем планшет-светялчок
		if (devices.get('terminal_3').state != 'active') {
			helpers.send_get('terminal_3', 'go', "0\/field=2,540,180;3,240,60;3,120,360;6,660,0;3,660,300;9,720,360;\@2,70,0,140;1,70,140,140;1,215,140,430;2,430,140,200;1,430,70,585;2,585,70,140;1,585,140,730;2,730,0,70;2,215,200,345;1,290,270,800;2,800,470,480", DISABLE_TIMER, ENABLE_MUTEX,
				function(params){
					devices.get('terminal_3').state = 'active';
				}, {}
			);
		}

		return;
	}

	// ждали открытия двери 7
	if (gamers.quest_state == 180) {
		devices.get('door_7').state = "opened";
		gamers.quest_state = 190;

		return;
	}

	// // ждали открытия двери 8
	// if (gamers.quest_state == 190) {
	// 	devices.get('door_8').state = "opened";

	// 	setTimeout(function () {
	// 		gamers.quest_state = 200;

	// 	}, helpers.get_timeout('T4')*1000);

	// 	return;
	// }

	if (gamers.quest_state == 210) {
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