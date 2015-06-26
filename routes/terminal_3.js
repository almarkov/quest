var express = require('express');
var router = express.Router();
var http   = require('http');

router.get('/game_passed/:code', function(req, res, next) {
	//  открываем дверь 7
	helpers.send_get('door_7', 'open', '0', ENABLE_TIMER, ENABLE_MUTEX);

	res.json({success: 1});
});

//-----------------------------------------------------------------------------
// эмулятор планшета
//-----------------------------------------------------------------------------
// активирован планшет
router.get('/activate/0', function(req, res, next) {
	res.json({success: 1});
});

// деактивирован планшет
router.get('/deactivate/0', function(req, res, next) {
	res.json({success: 1});
});


module.exports = router;