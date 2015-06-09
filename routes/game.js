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

	//  закрываем дверь
	http.get(devices._entrance_door.url + "/entrance_door/close", function(res) {

			console.log("Got response on closing entrance_door" );
			res.on('data', function(data){

				// пришёл ответ - актуализируем состояние двери
				var result = JSON.parse(data);
				devices._entrance_door.state = result.state.state;

				// запускаем таймер
				http.get(web_server_url + "/timer/activate/" + devices.default_timer_value, function(res) {
						console.log("Got response on timer activation" );
						res.on('data', function(data){

							// пришёл ответ - актуализируем состояние таймера
							var result = JSON.parse(data);
							devices._timer.state = result.state.state;

						});
					}).on('error', function(e) {
						console.log("timer activation error: ");
				});
				gamers.quest_state = 30; // 'Игроки ждут открытия двери 2';

			});
		}).on('error', function(e) {
			console.log("entrance_door activation error: ");
	});
	gamers.quest_state = 20; //'Закрытие входной двери';

	var result = {success: 1};
	res.json(result);

});


// стартовала игра
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
