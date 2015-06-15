var express = require('express');
var router = express.Router();
var http   = require('http');

// нажата кнопка, открывающая шкаф
router.get('/pushed/:parameter', function(req, res, next) {

	// открываем дверь шкафа
	var query = devices.ext_url_for('locker_door') + "/" +  config.get_command_id('open') + "/0";
	http.get(query, function(res) {
			console.log("Got response: " );
			res.on('data', function(data){

				devices.get('locker_door').state = "opened";
				gamers.quest_state = 50;//'Ожидание, пока игроки активируют многогранник';

			});
		}).on('error', function(e) {
			console.log("Got error: ");
	});

	var result = {success: 1};
	res.json(result);
});

module.exports = router;