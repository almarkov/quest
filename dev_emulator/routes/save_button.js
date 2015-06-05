var express = require('express');
var router = express.Router();
var http   = require('http');

// нажата кнопка спасения
router.get('/push', function(req, res, next) {

	http.get(web_server_url + "/save_button/pushed", function(res) {
			console.log("Got response: " );
		}).on('error', function(e) {
			console.log("Got error: ");
	});

	var result = {success: 1};
	res.json(result);
});

module.exports = router;