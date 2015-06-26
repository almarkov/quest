var express = require('express');
var router = express.Router();
var http   = require('http');

router.get('/power_ok/:code', function(req, res, next) {
	devices.get('power_wall').state = 'passed';
	//  открываем дверь 8
	helpers.send_get('door_8', 'open', '0', ENABLE_TIMER, ENABLE_MUTEX);

	res.json({result: 1});
});

module.exports = router;