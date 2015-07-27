var express = require('express');
var router = express.Router();
var http   = require('http');

//-----------------------------------------------------------------------------
// события
//-----------------------------------------------------------------------------
router.get('/game_passed/:code', function(req, res, next) {

	if (gamers.game_state == 'gamers_in_hallway') {
		gamers.game_state = 'gamers_in_powerwall_room';
		//  открываем дверь 7
		helpers.send_get('door_7', 'open', '0', DISABLE_TIMER, ENABLE_MUTEX, 
			function(params){
				devices.get('door_7').state = 'opened';
			}, {}
		);
	}

	res.json({success: 1});
});

//-----------------------------------------------------------------------------
// эмулятор планшета
//-----------------------------------------------------------------------------
router.get('/go/:parameter', function(req, res, next) {
	res.json({success: 1});
});

router.get('/black_screen/:parameter', function(req, res, next) {
	res.json({success: 1});
});

module.exports = router;