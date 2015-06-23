var express = require('express');
var router = express.Router();
var http   = require('http');

router.get('/number_of_inserted/:value', function(req, res, next) {

	devices.get('figure').state = "number_of_inserted";
	devices.get('figure').value = req.params.value;

	var count = 5;
	if (gamers.count < count) {
		count = gamers.count;
	}

	if (count == parseInt(req.params.value)) {
		// открываем шкаф с картой
		var query = devices.build_query('locker_2', 'open', '0');
		http.get(query, function(res) {
				console.log("Got response: " );
				res.on('data', function(data){

					devices.get('locker_2').state = "opened";

				});
			}).on('error', function(e) {
				console.log("Got error: ");
		});
	}

	var result = {success: 1};
	res.json(result);
	
});

module.exports = router;