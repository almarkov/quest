var express = require('express');
var http   = require('http');
var router = express.Router();
//var devices = require("./devices.js");

// стартовала игра
router.get('/start/:count', function(req, res, next) {

	// начинаем часовой отсчёт
	start_time = new Date();
	// фиксируем число игроков
	gamers.count = req.params.count;

	gamers.quest_state = 10;//'Начало игры';

	//  открываем дверь 1
	var query = devices.build_query('door_1', 'open', '0');
	http.get(query, function(res) {

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
			console.log("door_1 close error: ");
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
	http.get(query, function(res) {

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
			console.log("door_1 close error: ");
	});

	var result = {success: 1};
	res.json(result);

});

// подготовка устройств
router.get('/get_ready', function(req, res, next) {

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
