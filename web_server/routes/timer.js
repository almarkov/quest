var express = require('express');
var router = express.Router();
var http   = require('http');

// сработал таймер
router.get('/ready', function(req, res, next) {
	// обновляем модель
	devices._timer.state = 'ready';
	devices._timer.current_value = '';

	// если ждали открытия двери 2
	if (gamers.quest_state == 30) {
		// открываем дверь в комнату №2
		http.get(devices._room2_door.url + "/room2_door/open", function(res) {
				console.log("Got response on opening room2_door" );
				res.on('data', function(data){

					// пришёл ответ - актуализируем состояние двери
			        var result = JSON.parse(data);
			        devices._room2_door.state = result.state.state;
			    });
			    gamers.quest_state = 50; //'Поиск кнопки, открывающей шкаф с многогранником';
			}).on('error', function(e) {
				console.log("Got error: ");
		});
		
		gamers.quest_state = 40; //'Дверь 2 открывается';
		
		var result = {success: 1};
		res.json(result);
	}

	// если ждали начала перелёта
	if (gamers.quest_state == 60) {
		// выключаем свет
		http.get(devices._light.url + "/light/off", function(res) {
				console.log("Got response on turning light off" );
				res.on('data', function(data){

					// пришёл ответ - актуализируем состояние света
					var result = JSON.parse(data);
					devices._light.state = result.state.state;

					// запускаем таймер на 10 секунд
					http.get(devices._timer.url + "/timer/activate/10", function(res) {
							console.log("Got response on timer activation" );
							res.on('data', function(data){

								// пришёл ответ - актуализируем состояние таймера
								var result = JSON.parse(data);
								devices._timer.state = result.state.state;

							});
							gamers.quest_state = 70; //'Перелёт';

						}).on('error', function(e) {
							console.log("timer activation error: ");
					});
				});
			}).on('error', function(e) {
				console.log("Got on turning light off");
		});

		var result = {success: 1};
		res.json(result);
	}

	// если ждали окончания перелёта
	if (gamers.quest_state == 70) {
		// включаем свет
		http.get(devices._light.url + "/light/on", function(res) {
				console.log("Got response on turning light on" );
				res.on('data', function(data){

					// пришёл ответ - актуализируем состояние света
					var result = JSON.parse(data);
					devices._light.state = result.state.state;

					gamers.quest_state = 80; //'Прилетели, ожидание начала сканирования';
				});
			}).on('error', function(e) {
				console.log("Got on turning light off");
		});

		var result = {success: 1};
		res.json(result);
	}

	// если ждали окончания сканирования не предпоследнего игрока
	if (   ((gamers.quest_state / 10 | 0) == 9)
		&& (gamers.quest_state % 10 != gamers.count-1))
	{
		// открываем дверь №4
		http.get(devices._room4_door.url + "/room4_door/open", function(res) {
				console.log("Got response on opening door 4" );
				res.on('data', function(data){

					// пришёл ответ - актуализируем состояние двери
					var result = JSON.parse(data);
					devices._room4_door.state = result.state.state;

					gamers.quest_state += 10; //'Игрок № прошёл сканирование, ожидание перехода'; 90->100
				});
			}).on('error', function(e) {
				console.log("Got error on opening door 4");
		});

		var result = {success: 1};
		res.json(result);
	}

	// если ждали окончания сканирования предпоследнего игрока
	if (   ((gamers.quest_state / 10 | 0) == 9)
		&& (gamers.quest_state % 10 == gamers.count-1))
	{
		// открываем дверь №5
		http.get(devices._room5_door.url + "/room5_door/open", function(res) {
				console.log("Got response on opening door 5" );
				res.on('data', function(data){

					// пришёл ответ - актуализируем состояние двери
					var result = JSON.parse(data);
					devices._room5_door.state = result.state.state;

					gamers.quest_state += 10; //'Игрок № прошёл сканирование, ожидание перехода'; 90->100
				});
			}).on('error', function(e) {
				console.log("Got error on opening door 5");
		});

		var result = {success: 1};
		res.json(result);
	}




});

// пришло текущее значение таймера
router.get('/current_value/:value', function(req, res, next) {
	// обновляем модель
	devices._timer.current_value = req.params.value;
});

module.exports = router;