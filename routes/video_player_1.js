var express = require('express');
var router = express.Router();
var http   = require('http');

// router.get('/stopped/:parameter', function(req, res, next) {

// 	devices.get('screen1').state = 'stop';

// 	var result = {success: 1};
// 	res.json(result);

// 	// закончилось видео приглашения на сканирование
// 	if (gamers.quest_state == 100) {

// 		//открываем дверь 3
// 		var query = devices.ext_url_for('room3_door') + "/" +  devices.get_command_id('room3_door', "open") + "/0";
// 		console.log(query);
// 		http.get(query, function(res) {

// 				console.log("Got response on opening room3_door" );
// 				res.on('data', function(data){

// 					// запускаем таймер
// 					http.get(web_server_url + "/timer/activate/" + devices.default_timer_value, function(res) {
// 							console.log("Got response on timer activation" );
// 							res.on('data', function(data){

// 								// пришёл ответ - актуализируем состояние таймера
// 								var result = JSON.parse(data);
// 								devices.timer().state = result.state.state;

// 							});
// 						}).on('error', function(e) {
// 							console.log("timer activation error: ");
// 					});

// 				});
// 			}).on('error', function(e) {
// 				console.log("room3_door activation error: ");
// 		});

// 	}
// });

router.get('/playback_finished/:parameter', function(req, res, next) {

	devices.get('video_player_1').state = 'stopped';

	// закончилось видео приглашения на сканирование
	if (gamers.quest_state == 90) {

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

		gamers.quest_state = 100; // Приглашение на сканирование

	// закончилось видео 
	} else if (gamers.quest_state == 200) {
		// пробуждаем планшет-координаты
		var query = devices.build_query('terminal_4', "activate", "0");
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
	var result = {success: 1};
	res.json(result);
});

//-----------------------------------------------------------------------------
// эмулятор видеоплеера
//-----------------------------------------------------------------------------
router.get('/play/:parameter', function(req, res, next) {
	var result = {success: 1};
	res.json(result);
});

module.exports = router;