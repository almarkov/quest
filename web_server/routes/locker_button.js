var express = require('express');
var router = express.Router();
var http   = require('http');

// нажата кнопка, открывающая шкаф
router.get('/pushed', function(req, res, next) {

	// открываем дверь шкафа
	http.get(devices._locker_door.url + "/locker_door/open", function(res) {
			console.log("Got response: " );
			res.on('data', function(data){

				// пришёд ответ  - актуализируем состояние двери
				var result = JSON.parse(data);
				devices._locker_door.state = result.state.state;

				// запускаем таймер на 10 секунд
				http.get(devices._timer.url + "/timer/activate/10", function(res) {
						console.log("Got response on timer activation" );
						res.on('data', function(data){

							// пришёл ответ - актуализируем состояние таймера
							var result = JSON.parse(data);
							devices._timer.state = result.state.state;

						});
					}).on('error', function(e) {
						console.log("timer activation error: ");
				});
				gamers.quest_state = 60;//'Подготовка к перелёту';

			});
		}).on('error', function(e) {
			console.log("Got error: ");
	});

	var result = {success: 1};
	res.json(result);
});

module.exports = router;