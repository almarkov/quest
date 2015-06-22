var express = require('express');
var router = express.Router();
var http   = require('http');

router.get('/playback_finished/:parameter', function(req, res, next) {

	devices.get('video_player_2').state = 'stopped';

	var result = {success: 1};
	res.json(result);

	// видео перелёта закончилось
	if (gamers.quest_state == 70) {
		gamers.quest_state = 80; // Стыковка

		// включаем звук прибытия на станцию
		var query = devices.build_query('audio_player_1', 'play_channel_2', config.files[6]);
		http.get(query, function(res) {
				console.log("Got response: " );
				res.on('data', function(data){

					devices.get('audio_player_1').state = "ch1_play_ch2_play";
					devices.get('audio_player_1').value = config.files[6];

				});
			}).on('error', function(e) {
				console.log("Got error: ");
		});

		// включаем видео на экране 2
		var query = devices.build_query('video_player_2', 'play', config.files[7]);
		http.get(query, function(res) {
				console.log("Got response: " );
				res.on('data', function(data){

					devices.get('video_player_2').state = "playing";
					devices.get('video_player_2').value = config.files[7];
					
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
		var query = devices.build_query('audio_player_1', 'play_channel_2', config.files[8]);
		http.get(query, function(res) {
				console.log("Got response: " );
				res.on('data', function(data){

					devices.get('audio_player_1').state = "ch1_play_ch2_play";
					devices.get('audio_player_1').value = config.files[8];

				});
			}).on('error', function(e) {
				console.log("Got error: ");
		});
		gamers.quest_state = 90; // стыковка фикт

	 // закончилось видео приглашения на сканирование
	} else if (gamers.quest_state == 100) {

		//открываем дверь 2
		var query = devices.build_query('door_2', 'open', '0');
		devices.get('door_2').mutex = 1;
		http.get(query, function(res) {
				devices.get('door_2').mutex = 0;
				res.on('data', function(data){

					// запускаем таймер
					http.get(devices.build_query('timer', 'activate', devices.default_timer_value), function(res) {
							res.on('data', function(data){
								// пришёл ответ - актуализируем состояние таймера
								var result = JSON.parse(data);
								devices.get('timer').state = result.state.state;
							});
						}).on('error', function(e) {
							console.log("timer activate error: ");
					});
				});
			}).on('error', function(e) {
				devices.get('door_2').mutex = 0;
				console.log("door_2 closing error");
		});
	// закончилось видео 
	} else if (gamers.quest_state == 200) {
		// пробуждаем планшет-координаты
		var query = devices.build_query('terminal_4', "activate") + "/0";
		http.get(query, function(res) {
				console.log("Got response: " );
				res.on('data', function(data){

					devices.get('terminal_4').state = 'active';
					gamers.quest_state == 210;//вводят координаты


			    });
			}).on('error', function(e) {
				console.log("Got error on pad activation  ");
		});

	// закончился обратный перелёт
	} else if (gamers.quest_state == 230) {
		//выключаем вибрацию
		var query = devices.build_query('vibration', 'off', '0');
		http.get(query, function(res) {
				console.log("Got response: " );
				res.on('data', function(data){

					devices.get('vibration').state = "off";
					
				});
			}).on('error', function(e) {
				console.log("Got error: ");
		});
		if (gamers.coordinates == config.coordinates) {
			gamers.quest_state = 240;
		} else {
			// включаем видео на экране 2
			var query = devices.build_query('video_player_2', 'play', config.files[22]);
			http.get(query, function(res) {
					console.log("Got response: " );
					res.on('data', function(data){

						devices.get('video_player_2').state = "playing";
						devices.get('video_player_2').value = config.files[22];
						
					});
				}).on('error', function(e) {
					console.log("Got error: ");
			});

			// пробуждаем планшет-координаты
			var query = devices.build_query('terminal_4', "activate") + "/0";
			http.get(query, function(res) {
					console.log("Got response: " );
					res.on('data', function(data){

						devices.get('terminal_4').state = 'active';
						gamers.quest_state == 210;//вводят координаты


				    });
				}).on('error', function(e) {
					console.log("Got error on pad activation  ");
			});
		}
	}
});

//-----------------------------------------------------------------------------
// эмулятор видеоплеера
//-----------------------------------------------------------------------------
router.get('/play/:parameter', function(req, res, next) {
	var result = {success: 1};
	res.json(result);
});

module.exports = router;