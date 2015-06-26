var express = require('express');
var router = express.Router();
var http   = require('http');

router.get('/number_of_inserted/:value', function(req, res, next) {

	var device = devices.get('figure');

	device.state = "number_of_inserted";
	device.value = req.params.value;

	var count = 5;
	if (gamers.count < count) {
		count = gamers.count;
	}

	if (count <= parseInt(req.params.value)) {
		// открываем шкаф с картой
		helpers.send_get('locker_2', 'open', '0', DISABLE_TIMER, ENABLE_MUTEX,
			function (params) {
				devices.get('locker_2').state = "opened";
			},{}
		);
	}

	res.json({success: 1});
});

module.exports = router;