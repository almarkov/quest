var express = require('express');
var router = express.Router();
var http   = require('http');

router.get('/entered_code/:code', function(req, res, next) {

	gamers.quest_error = '';

	// сохраняем код
	gamers.codes[gamers.quest_state % 10] = req.params.code;

	// если не предпоследний игрока
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

	var result = {success: 1};
	res.json(result);
	
});

router.get('/code_enter_fail', function(req, res, next) {

	gamers.quest_error = 'Код введён неверно';

	var result = {success: 1};
	res.json(result);
	
});


module.exports = router;