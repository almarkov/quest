var express = require('express');
var http   = require('http');
var router = express.Router();
var child_process = require('child_process');

// перезагрузка arduino 
router.get('/reload/:name', function(req, res, next) {
	var num = devices.get(req.params.name).arduino_id;
	child_process.exec('sendcom.exe ' + num, function(error, stdout, stderr){
		console.log(stdout);
	});

	
	var result = {success: 1};
	res.json(result);
});

// вернулись в команут2
router.get('/close_power_wall', function(req, res, next) {
	//  закрываем дверь 8
	var query = devices.build_query('door_8', 'close', '0');
	devices.get('door_8').mutex = 1;
	http.get(query, function(res) {
			devices.get('door_8').mutex = 0;
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
			devices.get('door_8').mutex = 0;
			console.log("door_8 close error: ");
	});
});

// стартовала игра
router.get('/start/:count', function(req, res, next) {

	// начинаем часовой отсчёт
	start_time = new Date();
	// фиксируем число игроков
	gamers.count = req.params.count;

	gamers.quest_state = 10;//'Начало игры';

	//  открываем дверь 1
	var query = devices.build_query('door_1', 'open', '0');
	devices.get('door_1').mutex = 1;
	http.get(query, function(res) {
			devices.get('door_1').mutex = 0;
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
			devices.get('door_1').mutex = 0;
			console.log("door_1 open error: ");
	});

	gamers.quest_state = 15; //'Ожидание открытия двери 1';

	var result = {success: 1};
	res.json(result);

});

// все игроки зашли в комнату
router.get('/allin', function(req, res, next) {

	gamers.quest_state = 20; //'Ожидание закрытия двери 1';

	//  закрываем дверь 1
	var query = devices.build_query('door_1', 'close', '0');
	devices.get('door_1').mutex = 1;
	http.get(query, function(res) {
			devices.get('door_1').mutex = 0;
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
			devices.get('door_1').mutex = 0;
			console.log("door_1 close error: ");
	});

	var result = {success: 1};
	res.json(result);

});

// подготовка устройств
router.get('/get_ready', function(req, res, next) {

	// закрываем двери
	var query = devices.build_query('door_7', 'close', '0');
	devices.get('door_7').mutex = 1;
	http.get(query, function(res) {
			devices.get('door_7').mutex = 0;
			res.on('data', function(data){
				devices.get('door_7').state = 'closed';
			});
		}).on('error', function(e) {
			devices.get('door_7').mutex = 0;
			console.log("door_7 closing error");
	});
	var query = devices.build_query('door_8', 'close', '0');
	devices.get('door_8').mutex = 1;
	http.get(query, function(res) {
			devices.get('door_8').mutex = 0;
			res.on('data', function(data){
				devices.get('door_8').state = 'closed';
			});
		}).on('error', function(e) {
			devices.get('door_8').mutex = 0;
			console.log("door_8 closing error");
	});
	var query = devices.build_query('door_1', 'close', '0');
	devices.get('door_1').mutex = 1;
	http.get(query, function(res) {
			devices.get('door_1').mutex = 0;
			res.on('data', function(data){
				devices.get('door_1').state = 'closed';
			});
		}).on('error', function(e) {
			devices.get('door_1').mutex = 0;
			console.log("door_1 closing error");
	});
	var query = devices.build_query('door_2', 'close', '0');
	devices.get('door_2').mutex = 1;
	http.get(query, function(res) {
			devices.get('door_2').mutex = 0;
			res.on('data', function(data){
				devices.get('door_2').state = 'closed';
			});
		}).on('error', function(e) {
			devices.get('door_2').mutex = 0;
			console.log("door_2 closing error");
	});
	var query = devices.build_query('door_3', 'close', '0');
	devices.get('door_3').mutex = 1;
	http.get(query, function(res) {
			devices.get('door_3').mutex = 0;
			res.on('data', function(data){
				devices.get('door_3').state = 'closed';
			});
		}).on('error', function(e) {
			devices.get('door_3').mutex = 0;
			console.log("door_3 closing error");
	});
	var query = devices.build_query('door_4', 'close', '0');
	devices.get('door_4').mutex = 1;
	http.get(query, function(res) {
			devices.get('door_4').mutex = 0;
			res.on('data', function(data){
				devices.get('door_4').state = 'closed';
			});
		}).on('error', function(e) {
			devices.get('door_4').mutex = 0;
			console.log("door_4 closing error");
	});
	var query = devices.build_query('door_5', 'close', '0');
	devices.get('door_5').mutex = 1;
	http.get(query, function(res) {
			devices.get('door_5').mutex = 0;
			res.on('data', function(data){
				devices.get('door_5').state = 'closed';
			});
		}).on('error', function(e) {
			devices.get('door_5').mutex = 0;
			console.log("door_5 closing error");
	});
	var query = devices.build_query('door_6', 'close', '0');
	devices.get('door_6').mutex = 1;
	http.get(query, function(res) {
			devices.get('door_6').mutex = 0;
			res.on('data', function(data){
				devices.get('door_6').state = 'closed';
			});
		}).on('error', function(e) {
			devices.get('door_6').mutex = 0;
			console.log("door_6 closing error");
	});

	// запускаем аудио на первом канале
	var query = devices.build_query('audio_player_1', 'play_channel_1', config.files[0]);
	http.get(query, function(res) {
			res.on('data', function(data){

				devices.get('audio_player_1').value = config.files[0];
				if (devices.get('audio_player_1').state == "ch1_stop_ch2_play") {
					devices.get('audio_player_1').state = "ch1_play_ch2_play";
				} else {
					devices.get('audio_player_1').state = "ch1_play_ch2_stop";	
				}
			});
		}).on('error', function(e) {
			console.log("audio_player_1 play_channel_1 error: ");
	});
	var query = devices.build_query('audio_player_2', 'play_channel_1', config.files[0]);
	http.get(query, function(res) {
			res.on('data', function(data){

				devices.get('audio_player_2').value = config.files[0];
				if (devices.get('audio_player_2').state == "ch1_stop_ch2_play") {
					devices.get('audio_player_2').state = "ch1_play_ch2_play";
				} else {
					devices.get('audio_player_2').state = "ch1_play_ch2_stop";	
				}
			});
		}).on('error', function(e) {
			console.log("audio_player_2 play_channel_1 error: ");
	});
	var query = devices.build_query('audio_player_3', 'play_channel_1', config.files[0]);
	http.get(query, function(res) {
			res.on('data', function(data){

				devices.get('audio_player_3').value = config.files[0];
				if (devices.get('audio_player_3').state == "ch1_stop_ch2_play") {
					devices.get('audio_player_3').state = "ch1_play_ch2_play";
				} else {
					devices.get('audio_player_3').state = "ch1_play_ch2_stop";	
				}
			});
		}).on('error', function(e) {
			console.log("audio_player_3 play_channel_1 error: ");
	});
	var query = devices.build_query('audio_player_4', 'play_channel_1', config.files[0]);
	http.get(query, function(res) {
			res.on('data', function(data){

				devices.get('audio_player_4').value = config.files[0];
				if (devices.get('audio_player_4').state == "ch1_stop_ch2_play") {
					devices.get('audio_player_4').state = "ch1_play_ch2_play";
				} else {
					devices.get('audio_player_4').state = "ch1_play_ch2_stop";	
				}
			});
		}).on('error', function(e) {
			console.log("audio_player_4 play_channel_1 error: ");
	});
	var query = devices.build_query('audio_player_5', 'play_channel_1', config.files[0]);
	http.get(query, function(res) {
			res.on('data', function(data){

				devices.get('audio_player_5').value = config.files[0];
				if (devices.get('audio_player_5').state == "ch1_stop_ch2_play") {
					devices.get('audio_player_5').state = "ch1_play_ch2_play";
				} else {
					devices.get('audio_player_5').state = "ch1_play_ch2_stop";	
				}
			});
		}).on('error', function(e) {
			console.log("audio_player_5 play_channel_1 error: ");
	});

	// выключаем аудио на втором канале
	var query = devices.build_query('audio_player_1', 'stop_channel_2', config.files[0]);
	http.get(query, function(res) {
			res.on('data', function(data){

			});
		}).on('error', function(e) {
			console.log("audio_player_1 stop_channel_2 error: ");
	});
	var query = devices.build_query('audio_player_2', 'stop_channel_2', config.files[0]);
	http.get(query, function(res) {
			res.on('data', function(data){

			});
		}).on('error', function(e) {
			console.log("audio_player_2 stop_channel_2 error: ");
	});
	var query = devices.build_query('audio_player_3', 'stop_channel_2', config.files[0]);
	http.get(query, function(res) {
			res.on('data', function(data){

			});
		}).on('error', function(e) {
			console.log("audio_player_3 stop_channel_2 error: ");
	});
	var query = devices.build_query('audio_player_4', 'stop_channel_2', config.files[0]);
	http.get(query, function(res) {
			res.on('data', function(data){

			});
		}).on('error', function(e) {
			console.log("audio_player_4 stop_channel_2 error: ");
	});
	var query = devices.build_query('audio_player_5', 'stop_channel_2', config.files[0]);
	http.get(query, function(res) {
			res.on('data', function(data){

			});
		}).on('error', function(e) {
			console.log("audio_player_5 stop_channel_2 error: ");
	});

	// клип на экран 3
	var query = devices.build_query('video_player_3', 'play', config.files[3]);
	http.get(query, function(res) {
			res.on('data', function(data){
				devices.get('video_player_3').value = config.files[3];
				devices.get('video_player_3').state = "playing";	
			});
		}).on('error', function(e) {
			console.log("video_player_3 play error: ");
	});

	// выключаем экраны 1,2,4
	var query = devices.build_query('video_player_1', 'stop', '0');
	http.get(query, function(res) {
			res.on('data', function(data){
				devices.get('video_player_1').value = "";
				devices.get('video_player_1').state = "stopped";	
			});
		}).on('error', function(e) {
			console.log("video_player_1 stop error: ");
	});
	var query = devices.build_query('video_player_2', 'stop', '0');
	http.get(query, function(res) {
			res.on('data', function(data){
				devices.get('video_player_2').value = "";
				devices.get('video_player_2').state = "stopped";	
			});
		}).on('error', function(e) {
			console.log("video_player_2 stop error: ");
	});
	var query = devices.build_query('video_player_4', 'stop', '0');
	http.get(query, function(res) {
			res.on('data', function(data){
				devices.get('video_player_4').value = "";
				devices.get('video_player_4').state = "stopped";	
			});
		}).on('error', function(e) {
			console.log("video_player_4 stop error: ");
	});

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

	var result = {success: 1};
	res.json(result);

});

// режим обслуживания
router.get('/service_mode', function(req, res, next) {

	var result = {success: 1};
	res.json(result);

});

// перезапуск игры
router.get('/reset', function(req, res, next) {

	start_time = null;
	devices.reset();
	gamers.reset();

	var result = {success: 1};
	res.json(result);
});

// время начал игры
router.get('/start_time', function(req, res, next) {
	console.log(start_time);
	if (start_time) {
		res.json({date: start_time.toUTCString()});
	} else {
		res.json({date: null});
	}
});

module.exports = router;
