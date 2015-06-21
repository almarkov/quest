var express = require('express');
var router = express.Router();
var http   = require('http');

router.get('/code_entered/:code', function(req, res, next) {

	// прислали верный код
	if (req.params.code == gamers.codes[1]) {
		gamers.quest_state += 1;
	}

	// 2 верных кода
	if (gamers.quest_state % 10 == 2) {
		// открываем дверь 7
		http.get(devices._room7_door.url + "/room7_door/open", function(res) {
				console.log("Got response: " );
				res.on('data', function(data){

					// пришёл ответ  - актуализируем состояние двери
					var result = JSON.parse(data);
					devices._room7_door.state = result.state.state;

					gamers.quest_state = 140;//'Квест пройден';

				});
			}).on('error', function(e) {
				console.log("Got error: ");
		});

	}

	var result = {success: 1};
	res.json(result);
	
});

module.exports = router;