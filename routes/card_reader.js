var express = require('express');
var router = express.Router();
var http   = require('http');

//-----------------------------------------------------------------------------
// события
//-----------------------------------------------------------------------------
router.get('/card_ok/:parameter', function(req, res, next) {

	devices.get('card_reader').state = "passed";

	//  открываем дверь 6
	helpers.send_get('door_6', 'open', '0', ENABLE_TIMER, ENABLE_MUTEX);

	// включаем дым-машину
	helpers.send_get('smoke', 'on', '0', DISABLE_TIMER, ENABLE_MUTEX);

	res.json({success: 1});
});

module.exports = router;