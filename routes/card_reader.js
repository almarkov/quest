var express = require('express');
var router = express.Router();
var http   = require('http');

//-----------------------------------------------------------------------------
// события
//-----------------------------------------------------------------------------
router.get('/card_ok/:parameter', function(req, res, next) {

	if (gamers.quest_state == 170) {

		if (devices.get('card_reader').state != "passed") {
			devices.get('card_reader').state = "passed";

			//  открываем дверь 6
			helpers.send_get('door_6', 'open', '0', helpers.get_timeout('T1'), ENABLE_MUTEX);

		}
	}

	res.json({success: 1});
});

//-----------------------------------------------------------------------------
// эмулятор
//-----------------------------------------------------------------------------
router.get('/reset/:parameter', function(req, res, next) {
	res.json({success: 1});
});

module.exports = router;