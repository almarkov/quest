var express = require('express');
var router = express.Router();
var http   = require('http');

// нажата кнопка спасения
router.get('/enter/:code', function(req, res, next) {

	http.get(web_server_url + "/cell1/enter/" + req.params.code, function(res) {
			console.log("Got response: " );
		}).on('error', function(e) {
			console.log("Got error: ");
	});

	var result = {success: 1};
	res.json(result);
});

module.exports = router;