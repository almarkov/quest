var express = require('express');
var router = express.Router();
var http   = require('http');

// нажата кнопка спасения
router.get('/pushed', function(req, res, next) {

	// открываем дверь 6
	http.get(devices._room6_door.url + "/room6_door/open", function(res) {
			console.log("Got response: " );
			res.on('data', function(data){

				// пришёд ответ  - актуализируем состояние двери
				var result = JSON.parse(data);
				devices._room6_door.state = result.state.state;

				gamers.quest_state = 130;//'Открывание ячеек с жетонами, открыто 0 из 2';

			});
		}).on('error', function(e) {
			console.log("Got error: ");
	});

	var result = {success: 1};
	res.json(result);
});

module.exports = router;