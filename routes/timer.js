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

	// если ждали открытия двери 3
	// if (gamers.quest_state == 100) {
	// 	devices.get('room3_door').state = "opened";

	// 	gamers.quest_state = 110; //'Требуется действие оператора. Убедитесь, что в комнате сканирования только один человек';

	// 	var result = {success: 1};
	// 	res.json(result);
	// 	return;
	// }

	// если ждали пока закроется дверь 3 
	// if (gamers.quest_state >= 110 && gamers.quest_state < 120) {
	// 	devices.get('room3_door').state = "closed";
	// 	// пробуждаем планшет
	// 	var query = devices.ext_url_for('personal_code_pad') + "/" +  devices.get_command_id('personal_code_pad', "activate") + "/0";
	// 	http.get(query, function(res) {
	// 			console.log("Got response: " );
	// 			res.on('data', function(data){

	// 				devices.get('personal_code_pad').state = 'active';

	// 		        gamers.quest_state += 10;//'Идет сканирование игрока X из Y. 120-129

	// 		    });
	// 		}).on('error', function(e) {
	// 			console.log("Got error on pad activation  ");
	// 	});
	// 	return;
	// }




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