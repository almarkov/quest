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
	var query = devices.ext_url_for('entrance_door') + "/" +  config.get_command_id("close") + "/0";
	console.log(query);
	http.get(query, function(res) {

			console.log("Got response on closing entrance_door" );
			res.on('data', function(data){

				// запускаем таймер
				http.get(web_server_url + "/timer/activate/" + devices.default_timer_value, function(res) {
						console.log("Got response on timer activation" );
						res.on('data', function(data){

							// пришёл ответ - актуализируем состояние таймера
							var result = JSON.parse(data);
							devices.timer().state = result.state.state;

						});
					}).on('error', function(e) {
						console.log("timer activation error: ");
				});

			});
		}).on('error', function(e) {
			console.log("entrance_door activation error: ");
	});
	gamers.quest_state = 20; //'Ожидание закрытия входной двери';

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
