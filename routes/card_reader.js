var express = require('express');
var router = express.Router();
var http   = require('http');

//-----------------------------------------------------------------------------
// события
//-----------------------------------------------------------------------------
router.get('/card_ok/:parameter', function(req, res, next) {

	if (devices.get('card_reader').state != "passed")
		devices.get('card_reader').state = "passed";

		//  открываем дверь 6
		helpers.send_get('door_6', 'open', '0', ENABLE_TIMER, ENABLE_MUTEX);

		// включаем дым-машину
		helpers.send_get('smoke', 'on', '0', DISABLE_TIMER, ENABLE_MUTEX,
			function(params){
				devices.get('smoke').state = 'on';
			}, {}
		);
		// и выключаем через T4
		setTimeout(function () {
			helpers.send_get('smoke', 'off', '0', DISABLE_TIMER, ENABLE_MUTEX,
				function(params){
					devices.get('smoke').state = 'off';
				}, {}
			);
		}, helpers.get_timeout('T4')*1000);
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