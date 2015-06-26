var express = require('express');
var router = express.Router();
var http   = require('http');

router.get('/card_ok/:parameter', function(req, res, next) {

	devices.get('card_reader').state = "passed";

	//  открываем дверь 6
	helpers.send_get('door_6', 'open', '0', ENABLE_TIMER, ENABLE_MUTEX);

	res.json({success: 1});
});

module.exports = router;