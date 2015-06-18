var express = require('express');
var router = express.Router();
var http   = require('http');

// нажата кнопка, открывающая шкаф
router.get('/pushed/:parameter', function(req, res, next) {

	devices.get('locker_1_button').state = "pushed";

	// открываем дверь шкафа
	var query = devices.build_query('locker_1', 'open', '0');
	http.get(query, function(res) {
			console.log("Got response: " );
			res.on('data', function(data){

				devices.get('locker_1').state = "opened";
				gamers.quest_state = 50;//'Ожидание, пока игроки активируют многогранник';

			});
		}).on('error', function(e) {
			console.log("Got error: ");
	});

	var result = {success: 1};
	res.json(result);
});

module.exports = router;