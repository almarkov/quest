var express = require('express');
var router = express.Router();
var http   = require('http');

// нажата кнопка, открывающая шкаф
router.get('/pushed', function(req, res, next) {

	// открываем дверь шкафа
	http.get(web_server_url + "/locker_button/pushed", function(res) {
			console.log("Got response: " );
		}).on('error', function(e) {
			console.log("Got error: ");
	});

	var result = {success: 1};
	res.json(result);
});

module.exports = router;