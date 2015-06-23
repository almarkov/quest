var express = require('express');
var router = express.Router();
var http   = require('http');

router.get('/game_passed/:code', function(req, res, next) {

	gamers.last_player_pass = 1;

	// включаем звук  прошёл
	var query = devices.build_query('audio_player_4', 'play_channel_2', config.files[16]);
	http.get(query, function(res) {
			console.log("Got response: " );
			res.on('data', function(data){

				devices.get('audio_player_4').value = config.files[16];
				devices.get('audio_player_4').state = "ch1_play_ch2_play";

			});
		}).on('error', function(e) {
			console.log("Got error: ");
	});

	// зажигаем подсветку
	var query = devices.build_query('inf_mirror_backlight', 'on', 'blue');
	http.get(query, function(res) {
			console.log("Got response: " );
			res.on('data', function(data){

				devices.get('inf_mirror_backlight').value = 'blue';
				devices.get('inf_mirror_backlight').state = "on";

			});
		}).on('error', function(e) {
			console.log("Got error: ");
	});

	if (gamers.quest_state == 140) {
		gamers.quest_state = 141;

		//  открываем дверь 3
		var query = devices.build_query('door_3', 'open', '0');
		devices.get('door_3').mutex = 1;
		http.get(query, function(res) {
				devices.get('door_3').mutex = 0;
				res.on('data', function(data){

				
				});
			}).on('error', function(e) {
				devices.get('door_3').mutex = 0;
				console.log("door_3 close error: ");
		});

		//  открываем дверь 4
		var query = devices.build_query('door_4', 'open', '0');
		devices.get('door_4').mutex = 1;
		http.get(query, function(res) {
				devices.get('door_4').mutex = 0;
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
				devices.get('door_4').mutex = 0;
				console.log("door_4 close error: ");
		});
	}

	var result = {success: 1};
	res.json(result);
	
});

router.get('/game_not_passed/:code', function(req, res, next) {

	// включаем звук не прошёл
	var query = devices.build_query('audio_player_4', 'play_channel_2', config.files[15]);
	http.get(query, function(res) {
			console.log("Got response: " );
			res.on('data', function(data){

				devices.get('audio_player_4').value = config.files[15];
				devices.get('audio_player_4').state = "ch1_play_ch2_play";

			});
		}).on('error', function(e) {
			console.log("Got error: ");
	});


	var result = {success: 1};
	res.json(result);
	
});
//-----------------------------------------------------------------------------
// эмулятор планшета
//-----------------------------------------------------------------------------
// активирован планшет
router.get('/activate/0', function(req, res, next) {

	var result = {success: 1};
	res.json(result);
});

// деактивирован планшет
router.get('/deactivate/0', function(req, res, next) {

	var result = {success: 1};
	res.json(result);
});


module.exports = router;