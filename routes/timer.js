var express = require('express');
var router = express.Router();
var http   = require('http');

// сработал таймер
router.get('/ready', function(req, res, next) {

	// обновляем модель
	devices.get('timer').state         = 'ready';
	devices.get('timer').current_value = '';

	// если ждали начала игры
	if (gamers.quest_state == 1) {
		gamers.quest_state = 5;
		var result = {success: 1};
		res.json(result);
		return;
	}

	// если ждали открытия двери 1
	if (gamers.quest_state == 15) {
		devices.get('door_1').state = "opened";
		var result = {success: 1};
		res.json(result);
		return;
	}

	// если ждали закрытия двери 1
	if (gamers.quest_state == 20) {
		devices.get('door_1').state = "closed";

		// запускаем видео
		for (var i = 1; i <= 1; i++) {
			var query = devices.build_query('video_player_1', 'play', config.files[1]);
			http.get(query, function(res) {
					res.on('data', function(data){
						devices.get('video_player_1').value = config.files[1];
						devices.get('video_player_1').state = "playing";	
					});
				}).on('error', function(e) {
					console.log("video_player_1 play_channel_1 error: ");
			});
		}


		gamers.quest_state = 40; //'Поиск кнопки, открывающей шкаф с многогранником'
		var result = {success: 1};
		res.json(result);
		return;
	}

	// если ждали открытия двери 2
	// if (gamers.quest_state == 30) {
	// 	devices.get('room2_door').state = "opened";

	// 	gamers.quest_state = 40; //'Поиск кнопки, открывающей шкаф с многогранником';

	// 	var result = {success: 1};
	// 	res.json(result);
	// }

	// если ждали открытия двери 2
	if (gamers.quest_state == 100) {
		devices.get('door_2').state = 'opened';

		gamers.quest_state = 110; //'Требуется действие оператора. Убедитесь, что в комнате сканирования только один человек';

		var result = {success: 1};
		res.json(result);
		return;
	}

	// если ждали пока закроется дверь 2
	if (gamers.quest_state >= 110 && gamers.quest_state < 120) {
		devices.get('door_2').state = 'closed';
		// пробуждаем планшет
		var query = devices.build_query('terminal_1', "activate", "0");
		console.log(query);
		http.get(query, function(res) {
				console.log("Got response: " );
				res.on('data', function(data){

					devices.get('terminal_1').state = 'active';

			        gamers.quest_state += 10;//'Идет сканирование игрока X из Y. 120-129

			    });
			}).on('error', function(e) {
				console.log("Got error on pad activation  ");
		});
		var result = {success: 1};
		res.json(result);
		return;
	}

	// если ждали пока откроется дверь 4
	if (gamers.quest_state >= 120 && gamers.quest_state < 130
		&& gamers.quest_state % 10 != gamers.count-2) {
		devices.get('door_4').state = 'opened';

		gamers.quest_state += 10; //'Игрко X прощёл сканирование игрока X из Y. 130-139

		var result = {success: 1};
		res.json(result);
		return;
	}

	// если ждали пока откроется дверь 3 (предпоследний)
	if (gamers.quest_state >= 120 && gamers.quest_state < 130
		&& gamers.quest_state % 10 == gamers.count-2) {
		devices.get('door_3').state = 'opened';

		gamers.quest_state += 10; //'Игрко X прощёл сканирование игрока X из Y. 130-139

		var result = {success: 1};
		res.json(result);
		return;
	}

	// если ждали пока закроется дверь 3 (предпоследний)
	if (gamers.quest_state >= 130 && gamers.quest_state < 140
		&& gamers.quest_state % 10 == gamers.count-2) {
		devices.get('door_3').state = 'closed';

		// включаем звук на канале 2 плеера 4
		var query = devices.build_query('audio_player_4', 'play_channel_2', config.files[13]);
		http.get(query, function(res) {
				console.log("Got response: " );
				res.on('data', function(data){

					devices.get('audio_player_4').value = config.files[13];
					devices.get('audio_player_4').state = "ch1_play_ch2_play";

				});
			}).on('error', function(e) {
				console.log("Got error: ");
		});

		var result = {success: 1};
		res.json(result);
		return;
	}


	// если ждали пока откроется дверь 4 (не предпоследний)
	if (gamers.quest_state >= 120 && gamers.quest_state < 130
		&& gamers.quest_state % 10 != gamers.count-2) {
		devices.get('door_4').state = 'opened';

		gamers.quest_state += 10; //'Игрко X прощёл сканирование игрока X из Y. 130-139

		var result = {success: 1};
		res.json(result);
		return;
	}


	// если ждали пока закроется дверь 4
	if (gamers.quest_state >= 130 && gamers.quest_state < 140
		&& gamers.quest_state % 10 != gamers.count-2) {
		devices.get('door_4').state = 'closed';

		// тушим подсветку
		var query = devices.build_query('inf_mirror_backlight', 'off', config.colors[gamers.quest_state % 10]);
		http.get(query, function(res) {
				console.log("Got response: " );
				res.on('data', function(data){

					devices.get('inf_mirror_backlight').value = "";
					devices.get('inf_mirror_backlight').state = "off";

				});
			}).on('error', function(e) {
				console.log("Got error: ");
		});

		// открываем дверь 2 
		var query = devices.build_query('door_2', 'open', '0');
		devices.get('door_2').mutex = 1;
		http.get(query, function(res) {
				devices.get('door_2').mutex = 0;
				res.on('data', function(data){
					devices.get('door_2').state = "closed";
				});
			}).on('error', function(e) {
				devices.get('door_2').mutex = 0;
				console.log("door_2 close error: ");
		});

		// включаем звук на канале 2 плеера 3
		var query = devices.build_query('audio_player_3', 'play_channel_2', config.files[12]);
		http.get(query, function(res) {
				console.log("Got response: " );
				res.on('data', function(data){

					devices.get('audio_player_3').value = config.files[12];
					devices.get('audio_player_3').state = "ch1_play_ch2_play";

				});
			}).on('error', function(e) {
				console.log("Got error: ");
		});

		if (gamers.quest_state % 10  == gamers.count - 1 ) {
			gamers.quest_state = 140;
		} else {
			gamers.quest_state -= 20;
			gamers.quest_state += 1;
		}


		var result = {success: 1};
		res.json(result);
		return;
	}

	// если ждали пока откроются дверь 4 и 3
	if (gamers.quest_state == 141) {
		devices.get('door_4').state = 'opened';
		devices.get('door_3').state = 'opened';
		gamers.quest_state = 110 + gamers.count - 1;
		var result = {success: 1};
		res.json(result);
		return;
	}

	// если ждали пока закроется дверь 4 после окончания сканирования
	if (gamers.quest_state == 140) {
		gamers.quest_state = 145;
		// клип на экран 3
		var query = devices.build_query('video_player_3', 'play', config.files[17]);
		http.get(query, function(res) {
				res.on('data', function(data){
					devices.get('video_player_3').value = config.files[17];
					devices.get('video_player_3').state = "playing";	
				});
			}).on('error', function(e) {
				console.log("video_player_3 play error: ");
		});
	}

	// ждали открытия  ядвери 5
	if (gamers.quest_state == 145) {
		devices.get('door_5').state = "opened";
		gamers.quest_state = 150;
		var result = {success: 1};
		res.json(result);
		return;
	}

	// ждали открытия  ядвери 6
	if (gamers.quest_state == 170) {
		devices.get('door_6').state = "opened";
		gamers.quest_state = 180;

		// пробуждаем планшет-светялчок
		var query = devices.build_query('terminal_3', "activate","0");
		http.get(query, function(res) {
				console.log("Got response: " );
				res.on('data', function(data){

					devices.get('terminal_3').state = 'active';


			    });
			}).on('error', function(e) {
				console.log("Got error on pad activation  ");
		});
		var result = {success: 1};
		res.json(result);
		return;
	}

	// ждали открытия  ядвери 7
	if (gamers.quest_state == 180) {
		devices.get('door_7').state = "opened";
		gamers.quest_state = 190;

		var result = {success: 1};
		res.json(result);
		return;
	}

	// ждали открытия  ядвери 8
	if (gamers.quest_state == 190) {
		devices.get('door_8').state = "opened";
		gamers.quest_state = 200;

		var result = {success: 1};
		res.json(result);
		return;
	}

	// ждали закрытия  ядвери 8
	if (gamers.quest_state == 200) {
		devices.get('door_8').state = "closed";

		// включаем видео на экране 2
		var query = devices.build_query('video_player_2', 'play', config.files[19]);
		http.get(query, function(res) {
				console.log("Got response: " );
				res.on('data', function(data){

					devices.get('video_player_2').state = "playing";
					devices.get('video_player_2').value = config.files[19];
					
				});
			}).on('error', function(e) {
				console.log("Got error: ");
		});


		var result = {success: 1};
		res.json(result);
		return;
	}



	// если ждали начала перелёта
	// if (gamers.quest_state == 60) {
	// 	// выключаем свет
	// 	http.get(devices._light.url + "/light/off", function(res) {
	// 			console.log("Got response on turning light off" );
	// 			res.on('data', function(data){

	// 				// пришёл ответ - актуализируем состояние света
	// 				var result = JSON.parse(data);
	// 				devices._light.state = result.state.state;

	// 				// запускаем таймер на 10 секунд
	// 				http.get(devices.timer().url + "/timer/activate/"  + devices.default_timer_value, function(res) {
	// 						console.log("Got response on timer activation" );
	// 						res.on('data', function(data){

	// 							// пришёл ответ - актуализируем состояние таймера
	// 							var result = JSON.parse(data);
	// 							devices.timer().state = result.state.state;

	// 						});
	// 						gamers.quest_state = 70; //'Перелёт';

	// 					}).on('error', function(e) {
	// 						console.log("timer activation error: ");
	// 				});
	// 			});
	// 		}).on('error', function(e) {
	// 			console.log("Got on turning light off");
	// 	});

	// 	var result = {success: 1};
	// 	res.json(result);
	// }

	// если ждали окончания перелёта
	// if (gamers.quest_state == 70) {
	// 	// включаем свет
	// 	http.get(devices._light.url + "/light/on", function(res) {
	// 			console.log("Got response on turning light on" );
	// 			res.on('data', function(data){

	// 				// пришёл ответ - актуализируем состояние света
	// 				var result = JSON.parse(data);
	// 				devices._light.state = result.state.state;

	// 				gamers.quest_state = 80; //'Прилетели, ожидание начала сканирования';
	// 			});
	// 		}).on('error', function(e) {
	// 			console.log("Got on turning light off");
	// 	});

	// 	var result = {success: 1};
	// 	res.json(result);
	// }

	// // если ждали окончания сканирования не предпоследнего игрока
	// if (   ((gamers.quest_state / 10 | 0) == 9)
	// 	&& (gamers.quest_state % 10 != gamers.count-1))
	// {
	// 	// открываем дверь №4
	// 	http.get(devices._room4_door.url + "/room4_door/open", function(res) {
	// 			console.log("Got response on opening door 4" );
	// 			res.on('data', function(data){

	// 				// пришёл ответ - актуализируем состояние двери
	// 				var result = JSON.parse(data);
	// 				devices._room4_door.state = result.state.state;

	// 				gamers.quest_state += 10; //'Игрок № прошёл сканирование, ожидание перехода'; 90->100
	// 			});
	// 		}).on('error', function(e) {
	// 			console.log("Got error on opening door 4");
	// 	});

	// 	var result = {success: 1};
	// 	res.json(result);
	// }

	// // если ждали окончания сканирования предпоследнего игрока
	// if (   ((gamers.quest_state / 10 | 0) == 9)
	// 	&& (gamers.quest_state % 10 == gamers.count-1))
	// {
	// 	// открываем дверь №5
	// 	http.get(devices._room5_door.url + "/room5_door/open", function(res) {
	// 			console.log("Got response on opening door 5" );
	// 			res.on('data', function(data){

	// 				// пришёл ответ - актуализируем состояние двери
	// 				var result = JSON.parse(data);
	// 				devices._room5_door.state = result.state.state;

	// 				gamers.quest_state += 10; //'Игрок № прошёл сканирование, ожидание перехода'; 90->100
	// 			});
	// 		}).on('error', function(e) {
	// 			console.log("Got error on opening door 5");
	// 	});

	// 	var result = {success: 1};
	// 	res.json(result);
	// }
});

//-----------------------------------------------------------------------------
// эмулятор таймера
//-----------------------------------------------------------------------------
// пришло текущее значение таймера
router.get('/current_value/:value', function(req, res, next) {
	// обновляем модель
	devices.timer().current_value = req.params.value;

	var result = {success: 1};
	res.json(result);
});

router.get('/activate/:value', function(req, res, next) {

	devices.timer().state = 'active';
	devices.timer().value = req.params.value;
	devices.timer().current_value = req.params.value;

	var result = {success: 1, state: devices.timer()};
	res.json(result);
	
});
//-----------------------------------------------------------------------------

module.exports = router;